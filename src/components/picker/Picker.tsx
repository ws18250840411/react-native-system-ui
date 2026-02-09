import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Text, View, Platform, StyleSheet, FlatList, ScrollView, PanResponder, type NativeScrollEvent, type NativeSyntheticEvent, type ViewStyle } from 'react-native'
import Loading from '../loading'
import { useLocale } from '../config-provider/useLocale'
import { withAlpha } from '../../utils/color'
import { isFiniteNumber, isText } from '../../utils/validate'
import { clamp, isObject, shallowEqualArray } from '../../utils'
import { usePickerTokens } from './tokens'
import { createHairlineView } from '../../utils/hairline'
import type { PickerColumn, PickerColumnProps, PickerColumns, PickerOption, PickerProps, PickerValue } from './types'

export interface NormalizedPickerResult { columns: PickerOption[][]; values: PickerValue[]; options: (PickerOption | undefined)[] }
export interface PreparedPickerColumns { type: 'single' | 'multiple' | 'cascade'; columnsList: PickerOption[][]; defaults: (PickerValue | undefined)[]; cascadeRoot?: PickerOption[] }

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] =>
  Array.isArray(value) ? value.filter(v => v !== undefined && v !== null) as PickerValue[] : value == null ? [] : [value]

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col && isObject(col) && 'options' in col && Array.isArray((col as { options?: unknown }).options)

const hasChildren = (option: PickerOption) =>
  !!option && isObject(option) && Array.isArray((option as any).children) && (option as any).children.length > 0

export const findEnabledIndex = (options: PickerOption[], startIdx: number) => {
  if (!options.length) return -1
  const clampIdx = Math.min(Math.max(startIdx, 0), options.length - 1)
  if (!options[clampIdx]?.disabled) return clampIdx
  for (let i = clampIdx + 1; i < options.length; i += 1) {
    if (!options[i]?.disabled) return i
  }
  for (let i = clampIdx - 1; i >= 0; i -= 1) {
    if (!options[i]?.disabled) return i
  }
  return -1
}

const normalizeMultiple = (cols: PickerOption[][], defs: (PickerValue | undefined)[], raw: PickerValue[]): NormalizedPickerResult => {
  const vals: PickerValue[] = [], opts: (PickerOption | undefined)[] = []
  cols.forEach((colOpts, idx) => {
    const curr = raw[idx]
    const defIdx = defs[idx] !== undefined ? colOpts.findIndex(item => item.value === defs[idx]) : -1
    const currIdx = colOpts.findIndex(item => item.value === curr)
    const startIdx = currIdx >= 0 ? currIdx : defIdx >= 0 ? defIdx : 0
    const tgtIdx = findEnabledIndex(colOpts, startIdx)
    const tgt = tgtIdx >= 0 ? colOpts[tgtIdx] : undefined
    const valid = currIdx >= 0 && !colOpts[currIdx]?.disabled
    vals[idx] = (valid ? curr : (tgt?.value ?? defs[idx] ?? colOpts[0]?.value)) as PickerValue
    opts[idx] = tgt
  })
  return { columns: cols, values: vals, options: opts }
}

const normalizeCascade = (root: PickerOption[], raw: PickerValue[]): NormalizedPickerResult => {
  const cols: PickerOption[][] = [], vals: PickerValue[] = [], opts: (PickerOption | undefined)[] = []
  let curr: PickerOption[] | undefined = root
  let d = 0
  while (curr && curr.length && d < 10) {
    cols.push(curr)
    const c = raw[d]
    const startIdx = curr.findIndex(item => item.value === c || String(item.value) === String(c))
    const tgtIdx = findEnabledIndex(curr, startIdx >= 0 ? startIdx : 0)
    const tgt: PickerOption | undefined = tgtIdx >= 0 ? curr[tgtIdx] : curr[0]
    vals[d] = tgt?.value as PickerValue
    opts[d] = tgt
    if (tgt && hasChildren(tgt)) { curr = tgt.children; d += 1 } else break
  }
  return { columns: cols, values: vals, options: opts }
}

export const prepareColumns = (input: PickerColumns = []): PreparedPickerColumns => {
  if (!Array.isArray(input) || input.length === 0) return { type: 'single', columnsList: [], defaults: [], cascadeRoot: [] }
  const everyPlain = input.every(item => !Array.isArray(item) && !isColumnWithOptions(item as unknown as PickerColumn | PickerOption))
  const cascade = everyPlain && input.some(item => hasChildren(item as PickerOption))
  if (cascade) return { type: 'cascade', columnsList: [], defaults: [], cascadeRoot: input as PickerOption[] }
  const asArray = input as unknown[]
  const cols: PickerOption[][] = [], defs: (PickerValue | undefined)[] = []
  const treatAsSingle = everyPlain && !cascade
  if (treatAsSingle) { cols.push(input as PickerOption[]); defs.push(undefined) }
  else asArray.forEach(col => {
    if (Array.isArray(col)) { cols.push(col as PickerOption[]); defs.push(undefined) }
    else if (isColumnWithOptions(col as unknown as PickerColumn | PickerOption)) { const c = col as { options?: PickerOption[]; defaultValue?: PickerValue }; cols.push(c.options ?? []); defs.push(c.defaultValue) }
  })
  return { type: 'multiple', columnsList: cols, defaults: defs }
}

export const normalizePicker = (prep: PreparedPickerColumns, raw: PickerValue[] = []): NormalizedPickerResult => {
  const rawVal = Array.isArray(raw) ? raw : []
  return prep.type === 'cascade' && prep.cascadeRoot?.length ? normalizeCascade(prep.cascadeRoot, rawVal) : normalizeMultiple(prep.columnsList, prep.defaults, rawVal)
}

const W = StyleSheet.create({
  column: { flex: 1 },
  option: { justifyContent: 'center', alignItems: 'center' },
  grab: { cursor: 'pointer', userSelect: 'none', touchAction: 'none' } as unknown as ViewStyle,
})

type WheelPickerRender<T> = (item: T, index: number, meta: { active: boolean; disabled: boolean }) => React.ReactNode
type WheelPickerItemProps<T> = { item: T; index: number; itemHeight: number; active: boolean; disabled: boolean; renderItem: WheelPickerRender<T> }

const WheelPickerItemInner = <T extends PickerOption>({ item, index, itemHeight, active, disabled, renderItem }: WheelPickerItemProps<T>) => {
  const content = renderItem(item, index, { active, disabled })
  return <View style={[W.option, { height: itemHeight }]}>{content}</View>
}

const WheelPickerItem = React.memo(WheelPickerItemInner) as <T extends PickerOption>(props: WheelPickerItemProps<T>) => React.JSX.Element

type WheelPickerProps<T extends PickerOption = PickerOption> = { data: T[]; selectedIndex: number; onChange: (index: number) => void; onInteractStart?: () => void; onInteractEnd?: () => void; renderItem: WheelPickerRender<T>; itemHeight: number; visibleRest: number; readOnly?: boolean; indicatorColor: string; decelerationRate?: 'normal' | 'fast' | number; scrollEventThrottle?: number; swipeDuration?: number }

const getVelocityBucket = (v: number) => {
  const abs = Math.abs(v)
  if (abs > 1.2) return 2
  if (abs > 0.6) return 1
  return 0
}

const adjustIndex = (idx: number, opts: PickerOption[]) => {
  const total = opts.length
  if (!total) return 0
  const i = clamp(idx, 0, total - 1)
  const next = findEnabledIndex(opts, i)
  return next >= 0 ? next : i
}

const indexToOffset = (idx: number, h: number) => -idx * h

const offsetToIndex = (off: number, h: number, total: number, opts: PickerOption[]) => {
  const minOff = -Math.max(0, total - 1) * h
  const offClamped = clamp(off, minOff, 0)
  let idx = Math.round(-offClamped / h)
  idx = adjustIndex(idx, opts)
  const snapOff = indexToOffset(idx, h)
  return { index: idx, snapOffset: snapOff }
}

const shouldMomentum = (dist: number, dur: number) => dur < 500 && Math.abs(dist) > 8

const momentumTarget = (dist: number, dur: number, currOff: number, h: number, minOff: number) => {
  const speed = Math.abs(dist / dur)
  const extra = (speed / 0.0025) * (dist < 0 ? -1 : 1)
  const tgt = clamp(currOff + extra, minOff, 0)
  const snapIdx = Math.round(-tgt / h)
  return indexToOffset(snapIdx, h)
}

const WheelPickerInner = <T extends PickerOption,>({
  data,
  selectedIndex,
  onChange,
  onInteractStart,
  onInteractEnd,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = Platform.select({ ios: 0.9985, android: 0.995, default: 0.995 }) ?? 'normal',
  scrollEventThrottle = 16,
  swipeDuration = 300,
}: WheelPickerProps<T>) => {
  const isWeb = Platform.OS === 'web'
  const listRef = useRef<FlatList<T>>(null), scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null)
  const spacerHeight = visibleRest * itemHeight
  const total = data.length
  const maxIdx = Math.max(0, total - 1)
  const minOff = -maxIdx * itemHeight
  const containerHeight = itemHeight * (visibleRest * 2 + 1)
  const rawSelIdx = clamp(selectedIndex, 0, maxIdx)
  const enabledSelIdx = findEnabledIndex(data, rawSelIdx)
  const safeSelIdx = enabledSelIdx >= 0 ? enabledSelIdx : rawSelIdx
  const visibleCnt = visibleRest * 2 + 1
  const effectiveScrollThrottle = total > visibleCnt * 20 ? 32 : scrollEventThrottle
  const webVirtualEnabled = total > visibleCnt * 4
  const Spacer = useCallback(() => <View style={{ height: spacerHeight }} />, [spacerHeight])
  const indicatorStyle = useMemo(() => [S.indicator, { height: itemHeight, top: itemHeight * visibleRest }], [itemHeight, visibleRest])
  const dragEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null), momentumRef = useRef(false), lastOffsetRef = useRef(0)
  const clearDragEndTimer = useCallback(() => { if (dragEndTimerRef.current) { clearTimeout(dragEndTimerRef.current); dragEndTimerRef.current = null } }, [])
  const emitIdx = useCallback((offsetY: number, animated: boolean) => {
    if (readOnly) return
    const { index, snapOffset } = offsetToIndex(-offsetY, itemHeight, total, data)
    const nextOff = -snapOffset
    if (Math.abs(nextOff - offsetY) > 0.5) {
      listRef.current?.scrollToOffset({ offset: nextOff, animated })
    }
    onChange(index)
  }, [data, itemHeight, onChange, readOnly, total])
  useEffect(() => {
    const offset = safeSelIdx * itemHeight
    if (isWeb) return
    scrollRef.current?.scrollTo({ y: offset, animated: false })
  }, [isWeb, itemHeight, safeSelIdx])
  const [webOffset, setWebOffset] = useState(() => indexToOffset(safeSelIdx, itemHeight))
  const webOffsetRef = useRef(webOffset), startOffsetRef = useRef(0), startTimeRef = useRef(0)
  const [webTransition, setWebTransition] = useState(0)
  const [webVelocityBucket, setWebVelocityBucket] = useState(0)
  const webVelocityBucketRef = useRef(0), lastWheelTimeRef = useRef<number | null>(null), wheelDeltaRef = useRef(0), wheelRafRef = useRef<number | null>(null), pendingIndexRef = useRef<number | null>(null), pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null), rafIdRef = useRef<number | null>(null), isInteractingRef = useRef(false)
  const onInteractStartRef = useRef(onInteractStart)
  onInteractStartRef.current = onInteractStart
  const onInteractEndRef = useRef(onInteractEnd)
  onInteractEndRef.current = onInteractEnd
  const notifyStart = useCallback(() => { if (readOnly) return; if (isInteractingRef.current) return; isInteractingRef.current = true; onInteractStartRef.current?.() }, [readOnly])
  const notifyEnd = useCallback(() => { if (!isInteractingRef.current) return; isInteractingRef.current = false; onInteractEndRef.current?.() }, [])
  const stopRaf = useCallback(() => {
    if (rafIdRef.current != null && typeof cancelAnimationFrame !== 'undefined') { cancelAnimationFrame(rafIdRef.current); rafIdRef.current = null }
    if (wheelRafRef.current != null && typeof cancelAnimationFrame !== 'undefined') { cancelAnimationFrame(wheelRafRef.current); wheelRafRef.current = null }
  }, [])
  const clearPendingTimer = useCallback(() => { if (pendingTimerRef.current) { clearTimeout(pendingTimerRef.current); pendingTimerRef.current = null } }, [])
  useEffect(() => { return () => { clearDragEndTimer(); clearPendingTimer(); stopRaf() } }, [clearDragEndTimer, clearPendingTimer, stopRaf])
  const setVelocityBucket = useCallback((velocity: number) => {
    const next = getVelocityBucket(velocity)
    if (next !== webVelocityBucketRef.current) { webVelocityBucketRef.current = next; setWebVelocityBucket(next) }
  }, [])
  const updateWheelVelocity = useCallback((delta: number) => {
    const now = Date.now()
    const last = lastWheelTimeRef.current
    if (last != null) {
      const dt = Math.max(1, now - last)
      setVelocityBucket(delta / dt)
    }
    lastWheelTimeRef.current = now
  }, [setVelocityBucket])
  useEffect(() => {
    if (!isWeb) return
    clearPendingTimer()
    pendingIndexRef.current = null
    setWebTransition(0)
    const next = indexToOffset(safeSelIdx, itemHeight)
    webOffsetRef.current = next
    setWebOffset(next)
  }, [clearPendingTimer, isWeb, itemHeight, safeSelIdx, setWebTransition])
  const finalizePendingChange = useCallback(() => {
    if (readOnly) return
    const nextIdx = pendingIndexRef.current
    if (nextIdx == null) return
    pendingIndexRef.current = null
    clearPendingTimer()
    setWebTransition(0)
    notifyEnd()
    onChange(nextIdx)
  }, [clearPendingTimer, onChange, readOnly, setWebTransition])
  const startWebSnap = useCallback((targetIdx: number) => {
    if (readOnly) return
    notifyStart()
    const clampedIdx = clamp(targetIdx, 0, maxIdx)
    const targetOff = indexToOffset(clampedIdx, itemHeight)
    clearPendingTimer()
    pendingIndexRef.current = clampedIdx
    webOffsetRef.current = targetOff
    setWebTransition(swipeDuration)
    setWebOffset(targetOff)
    if (swipeDuration <= 0) {
      finalizePendingChange()
    } else {
      pendingTimerRef.current = setTimeout(finalizePendingChange, swipeDuration + 80)
    }
  }, [clearPendingTimer, finalizePendingChange, itemHeight, maxIdx, readOnly, swipeDuration])
  const handleWheel = useCallback((event: { nativeEvent?: { deltaY?: number } }) => {
    if (readOnly) return
    const delta = event.nativeEvent?.deltaY ?? 0
    if (!delta) return
    wheelDeltaRef.current += delta
    if (wheelRafRef.current != null || typeof requestAnimationFrame === 'undefined') return
    wheelRafRef.current = requestAnimationFrame(() => {
      wheelRafRef.current = null
      const queued = wheelDeltaRef.current
      wheelDeltaRef.current = 0
      if (!queued) return
      updateWheelVelocity(queued)
      const direction = queued > 0 ? 1 : -1
      const { index } = offsetToIndex(webOffsetRef.current, itemHeight, total, data)
      const nextIdx = clamp(index + direction, 0, maxIdx)
      startWebSnap(nextIdx)
    })
  }, [data, itemHeight, maxIdx, readOnly, startWebSnap, total, updateWheelVelocity])
  const webIdx = clamp(Math.round(-webOffset / itemHeight), 0, maxIdx)
  const webRender = useMemo(() => {
    if (!isWeb || total <= 0) {
      return { items: null as React.ReactNode, topSpacer: null as React.ReactNode, bottomSpacer: null as React.ReactNode }
    }
    let startIdx = 0
    let endIdx = maxIdx
    if (webVirtualEnabled) {
      const baseBuffer = Math.max(visibleCnt * 2, 8)
      const velocityBoost = webVelocityBucket === 2 ? visibleCnt * 4 : webVelocityBucket === 1 ? visibleCnt * 2 : 0
      const buffer = Math.min(baseBuffer + velocityBoost, Math.max(visibleCnt * 6, 24))
      startIdx = clamp(webIdx - buffer, 0, maxIdx)
      endIdx = clamp(webIdx + buffer, 0, maxIdx)
    }
    const items: React.ReactNode[] = []
    for (let index = startIdx; index <= endIdx; index += 1) {
      const item = data[index]
      if (!item) continue
      items.push(<WheelPickerItem key={`${index}-${String(item.value ?? '')}`} item={item} index={index} itemHeight={itemHeight} active={index === safeSelIdx} disabled={!!item.disabled} renderItem={renderItem} />)
    }
    const topH = startIdx * itemHeight
    const bottomH = (maxIdx - endIdx) * itemHeight
    return { items, topSpacer: topH > 0 && <View style={{ height: topH }} />, bottomSpacer: bottomH > 0 && <View style={{ height: bottomH }} /> }
  }, [data, isWeb, itemHeight, maxIdx, renderItem, safeSelIdx, total, visibleCnt, webIdx, webVelocityBucket, webVirtualEnabled])
  const webTransform = useMemo(() => ({ transform: [{ translateY: webOffset }] }), [webOffset])
  const webTransitionStyle = useMemo<ViewStyle | undefined>(() => webTransition ? ({ transitionProperty: 'transform', transitionDuration: webTransition + 'ms', transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)', willChange: 'transform' } as unknown as ViewStyle) : undefined, [webTransition])
  const handleWebTransitionEnd = useCallback((event: { nativeEvent?: { propertyName?: string } } & { propertyName?: string }) => {
    const propertyName = event.nativeEvent?.propertyName ?? event.propertyName
    if (propertyName && propertyName !== 'transform' && propertyName !== 'webkitTransform') return
    finalizePendingChange()
  }, [finalizePendingChange])
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !readOnly,
    onMoveShouldSetPanResponder: () => !readOnly,
    onPanResponderGrant: () => {
      stopRaf()
      pendingIndexRef.current = null
      notifyStart()
      setWebTransition(0)
      startOffsetRef.current = webOffsetRef.current
      startTimeRef.current = Date.now()
    },
    onPanResponderMove: (_, gesture) => {
      if (readOnly) return
      setVelocityBucket(gesture.vy)
      const next = clamp(startOffsetRef.current + gesture.dy, minOff, 0)
      webOffsetRef.current = next
      if (typeof requestAnimationFrame === 'undefined') {
        setWebOffset(next)
        return
      }
      if (rafIdRef.current != null) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        setWebOffset(webOffsetRef.current)
      })
    },
    onPanResponderRelease: (_, gesture) => {
      if (readOnly) return
      setVelocityBucket(0)
      const duration = Date.now() - startTimeRef.current
      const distance = gesture.dy
      let target = clamp(startOffsetRef.current + distance, minOff, 0)
      if (shouldMomentum(distance, duration)) {
        target = momentumTarget(distance, duration, startOffsetRef.current, itemHeight, minOff)
      }
      const { index } = offsetToIndex(target, itemHeight, total, data)
      startWebSnap(index)
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderTerminate: () => {
      notifyEnd()
      setWebTransition(0)
    },
  }), [data, itemHeight, minOff, notifyEnd, notifyStart, readOnly, setVelocityBucket, startWebSnap, stopRaf, total])
  const shouldCapture = !readOnly
  const handleResponderCapture = useCallback(() => shouldCapture, [shouldCapture])
  const nativeContainerStyle = useMemo(() => ({ paddingVertical: spacerHeight }), [spacerHeight])
  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { lastOffsetRef.current = e.nativeEvent.contentOffset.y }, [])
  const onDragStart = useCallback(() => { momentumRef.current = false; clearDragEndTimer(); notifyStart() }, [clearDragEndTimer, notifyStart])
  const handleScrollEndDrag = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (readOnly) return
    const y = e.nativeEvent.contentOffset.y
    lastOffsetRef.current = y
    clearDragEndTimer()
    dragEndTimerRef.current = setTimeout(() => {
      if (!momentumRef.current) {
        emitIdx(lastOffsetRef.current, true)
        notifyEnd()
      }
    }, 80)
  }, [clearDragEndTimer, emitIdx, notifyEnd, readOnly])
  const handleMomentumScrollBegin = useCallback(() => { momentumRef.current = true; clearDragEndTimer(); notifyStart() }, [clearDragEndTimer, notifyStart])
  const onMomEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    momentumRef.current = false
    clearDragEndTimer()
    const y = e.nativeEvent.contentOffset.y
    lastOffsetRef.current = y
    emitIdx(y, false)
    notifyEnd()
  }, [clearDragEndTimer, emitIdx, notifyEnd])
  if (isWeb) {
    return (
      <View style={[W.column, { height: containerHeight }, W.grab]} {...({ onWheel: handleWheel } as unknown as React.ComponentProps<typeof View>)} {...panResponder.panHandlers}>
        <View style={indicatorStyle} pointerEvents="none"><View style={createHairlineView({ position: 'top', color: indicatorColor, left: 0, right: 0 })} /><View style={createHairlineView({ position: 'bottom', color: indicatorColor, left: 0, right: 0 })} /></View>
        <View style={[webTransform, webTransitionStyle]} {...({ onTransitionEnd: handleWebTransitionEnd } as unknown as React.ComponentProps<typeof View>)}>
          <Spacer />
          {webRender.topSpacer}
          {webRender.items}
          {webRender.bottomSpacer}
          <Spacer />
        </View>
      </View>
    )
  }
  return (
    <View style={[W.column, { height: containerHeight }]} collapsable={false}>
      <View style={indicatorStyle} pointerEvents="none"><View style={createHairlineView({ position: 'top', color: indicatorColor, left: 0, right: 0 })} /><View style={createHairlineView({ position: 'bottom', color: indicatorColor, left: 0, right: 0 })} /></View>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} scrollEventThrottle={effectiveScrollThrottle} decelerationRate={decelerationRate} snapToInterval={itemHeight} snapToAlignment="start" bounces={false} overScrollMode="never" nestedScrollEnabled contentContainerStyle={nativeContainerStyle} onStartShouldSetResponderCapture={handleResponderCapture} onMoveShouldSetResponderCapture={handleResponderCapture} onScroll={handleScroll} onScrollBeginDrag={onDragStart} onScrollEndDrag={handleScrollEndDrag} onMomentumScrollBegin={handleMomentumScrollBegin} onMomentumScrollEnd={onMomEnd} scrollEnabled={!readOnly}>
        {data.map((item, index) => (
          <WheelPickerItem key={`${index}-${String(item.value ?? '')}`} item={item} index={index} itemHeight={itemHeight} active={index === safeSelIdx} disabled={!!item.disabled} renderItem={renderItem} />
        ))}
      </ScrollView>
    </View>
  )
}

const WheelPicker = React.memo(WheelPickerInner) as typeof WheelPickerInner

export function usePickerValue({ columns, valueProp, defaultValue, emitConfirmOnAutoSelect = true, onChange, onConfirm }: { columns?: PickerColumns; valueProp?: PickerProps['value']; defaultValue?: PickerProps['defaultValue']; emitConfirmOnAutoSelect?: boolean; onChange?: PickerProps['onChange']; onConfirm?: PickerProps['onConfirm'] }) {
  const prep = useMemo(() => prepareColumns(columns), [columns]); const isControlled = valueProp !== undefined; const onChangeRef = useRef(onChange); const onConfirmRef = useRef(onConfirm); onChangeRef.current = onChange; onConfirmRef.current = onConfirm; const [innerValue, setInnerValue] = useState(() => normalizePicker(prep, toArrayValue(valueProp ?? defaultValue)).values); const innerValueRef = useRef(innerValue); innerValueRef.current = innerValue; const commitValue = useCallback((next: PickerValue[]) => { innerValueRef.current = next; setInnerValue(next) }, []); useEffect(() => { if (!isControlled) return; const next = toArrayValue(valueProp); if (!shallowEqualArray(innerValueRef.current, next)) commitValue(next) }, [commitValue, isControlled, valueProp]); const norm = useMemo(() => normalizePicker(prep, innerValue), [prep, innerValue]); useEffect(() => { if (isControlled) return; if (!shallowEqualArray(innerValue, norm.values)) { commitValue(norm.values); onChangeRef.current?.(norm.values, norm.options); if (emitConfirmOnAutoSelect) onConfirmRef.current?.(norm.values, norm.options) } }, [commitValue, emitConfirmOnAutoSelect, innerValue, isControlled, norm]); const handleSelect = useCallback((option: PickerOption, colIdx: number) => { const next = [...innerValueRef.current]; next[colIdx] = option.value; if (prep.type === 'cascade') next.length = colIdx + 1; const final = normalizePicker(prep, next); if (shallowEqualArray(innerValueRef.current, final.values)) return; commitValue(final.values); onChangeRef.current?.(final.values, final.options) }, [commitValue, prep]); const handleConfirm = useCallback(() => { onConfirmRef.current?.(norm.values, norm.options) }, [norm]); return { preparedColumns: prep, normalized: norm, handleSelect, handleConfirm }
}

const getVisibleCount = (count: number) => { const n = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5; return n % 2 === 0 ? n + 1 : n }

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.95, 0.75, 0.55, 0.35]
const GRADIENT_STEPS_REVERSED = [0.35, 0.55, 0.75, 0.95]

const GradientMask: React.FC<{ height: number; color: string; position: 'top' | 'bottom'; maskType: NonNullable<PickerProps['maskType']> }> = ({ height, color, position, maskType }) => {
  const baseStyle = [S.gMask, { height }, position === 'top' ? { top: 0 } : { bottom: 0 }]
  const overlayColor = withAlpha(color, GRADIENT_OVERLAY_ALPHA)
  if (maskType === 'solid') return <View pointerEvents="none" style={[...baseStyle, { backgroundColor: withAlpha(color, 0.9) }]} />
  if (Platform.OS === 'web') {
    const angle = position === 'top' ? '180deg' : '0deg'
    return <View pointerEvents="none" style={[...baseStyle, ({ backgroundColor: overlayColor, backgroundImage: `linear-gradient(${angle}, ${withAlpha(color, 0.98)}, ${withAlpha(color, 0.4)})` } as unknown as ViewStyle)]} />
  }
  return (
    <View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>
      {(position === 'top' ? GRADIENT_STEPS : GRADIENT_STEPS_REVERSED).map((opacity, idx) => <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />)}
    </View>
  )
}

const PickerColumn: React.FC<PickerColumnProps & { tokens: ReturnType<typeof usePickerTokens> }> = React.memo(props => {
  const { columnIndex, options, value, itemHeight, visibleItemCount, optionRender, getOptionTestID, getOptionA11yLabel, onSelect, tokens, readOnly, decelerationRate, scrollEventThrottle, swipeDuration } = props; const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2)); const valueIndexMap = useMemo(() => new Map(options.map((opt, idx) => [opt.value, idx] as const)), [options]); const selIdx = useMemo(() => { if (!options.length) return 0; const idx = valueIndexMap.get(value as PickerValue); const startIdx = typeof idx === 'number' && idx >= 0 ? idx : 0; return findEnabledIndex(options, startIdx) }, [options, value, valueIndexMap]); const handleChange = useCallback((index: number) => { const tgt = findEnabledIndex(options, index); const opt = options[tgt]; if (!opt || opt.disabled) return; onSelect(opt, columnIndex, tgt) }, [columnIndex, onSelect, options]); const { text: cText, textDisabled: cDisabled, textMuted: cMuted } = tokens.colors; const optFont = { fontSize: tokens.typography.optionSize, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.optionWeight }; const renderItemStable = useCallback((item: PickerOption, _index: number, meta: { active: boolean; disabled: boolean }) => { const { active = false, disabled = false } = meta ?? {}; const clr = disabled ? cDisabled : active ? cText : cMuted; const cnt = optionRender ? optionRender(item, { columnIndex, active }) : item.label ?? item.value; const testID = getOptionTestID?.(item, { columnIndex, active }); const a11y = getOptionA11yLabel?.(item, { columnIndex, active }); return <View style={[W.option, { opacity: disabled ? 0.5 : 1, minHeight: itemHeight }]} testID={testID} accessible={!!a11y} accessibilityLabel={a11y}>{isText(cnt) ? <Text numberOfLines={1} style={[S.optTxt, optFont, { color: clr }]}>{cnt}</Text> : cnt}</View> }, [cText, cDisabled, cMuted, columnIndex, getOptionA11yLabel, getOptionTestID, itemHeight, optFont, optionRender]); return <View style={[W.column, { height: itemHeight * visibleItemCount }]}><WheelPicker data={options} itemHeight={itemHeight} visibleRest={restVisible} selectedIndex={Math.max(0, selIdx)} onChange={handleChange} readOnly={readOnly} indicatorColor={tokens.colors.indicator} decelerationRate={decelerationRate} scrollEventThrottle={scrollEventThrottle} swipeDuration={swipeDuration} renderItem={renderItemStable} /></View>
})

const PickerImpl: React.FC<PickerProps> = props => {
  const { tokensOverride } = props; const locale = useLocale(); const tokens = usePickerTokens(tokensOverride); const { columns = [], value: valueProp, defaultValue, title, showToolbar = tokens.defaults.showToolbar, toolbarPosition = tokens.defaults.toolbarPosition, confirmButtonText = locale?.confirm ?? 'Confirm', cancelButtonText = locale?.cancel ?? 'Cancel', itemHeight = tokens.defaults.itemHeight, visibleItemCount: visibleItemCountProp = tokens.defaults.visibleItemCount, loading = false, readOnly = false, decelerationRate = Platform.select({ ios: 0.999, android: 0.997, default: 0.989 }) ?? 'normal', swipeDuration = tokens.defaults.swipeDuration, scrollEventThrottle = 16, columnsTop, columnsBottom, optionRender, getOptionTestID, getOptionA11yLabel, emitConfirmOnAutoSelect = true, maskColor, maskType = tokens.defaults.maskType, onChange, onConfirm, onCancel, style, testID, ...rest } = props; const visCnt = getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount); const { normalized: norm, handleSelect, handleConfirm, preparedColumns: prep } = usePickerValue({ columns, valueProp, defaultValue, emitConfirmOnAutoSelect, onChange, onConfirm }); const isCascade = prep.type === 'cascade'; const toolbarFont = { fontSize: tokens.typography.toolbarSize, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.toolbarWeight }; const renderActionContent = (content: React.ReactNode, color: string) => React.isValidElement(content) ? <View style={S.actW}>{content}</View> : isText(content) ? <Text numberOfLines={1} style={[S.actTxt, toolbarFont, { color }]}>{content}</Text> : <View style={S.actW} />; const renderTitleContent = (content: React.ReactNode) => content == null ? <View /> : React.isValidElement(content) ? <View style={S.ttlW}>{content}</View> : <Text style={[S.title, toolbarFont, { color: tokens.colors.text }]} numberOfLines={1}>{content}</Text>
  const toolbar = showToolbar ? (
    <View style={[S.toolbar, { height: tokens.spacing.toolbarHeight, paddingHorizontal: tokens.spacing.actionPadding }]}>
      <Pressable onPress={onCancel} accessibilityRole="button">{renderActionContent(cancelButtonText, tokens.colors.cancel)}</Pressable>
      {renderTitleContent(title)}
      <Pressable onPress={handleConfirm} accessibilityRole="button">{renderActionContent(confirmButtonText, tokens.colors.confirm)}</Pressable>
      <View style={createHairlineView({ position: 'bottom', color: tokens.colors.indicator, left: 0, right: 0 })} />
    </View>
  ) : null
  const wrapperH = itemHeight * visCnt; const maskVisCnt = Math.max(1, Math.floor((visCnt - 1) / 2)); const indicatorOff = itemHeight * maskVisCnt; const maskH = indicatorOff; const hasCols = norm.columns.length > 0; const effMaskColor = maskColor ?? tokens.colors.mask
  const columnsContent = hasCols ? norm.columns.map((column, colIdx) => { const key = isCascade ? `${colIdx}-${norm.values.slice(0, colIdx).map(String).join('|')}` : String(colIdx); return <PickerColumn key={key} columnIndex={colIdx} options={column} value={norm.values[colIdx]} itemHeight={itemHeight} visibleItemCount={visCnt} decelerationRate={decelerationRate} scrollEventThrottle={scrollEventThrottle} optionRender={optionRender} getOptionTestID={getOptionTestID} getOptionA11yLabel={getOptionA11yLabel} readOnly={readOnly} swipeDuration={swipeDuration} onSelect={handleSelect} tokens={tokens} /> }) : null
  return <View {...rest} style={[{ backgroundColor: tokens.colors.background, borderRadius: tokens.radius.container }, style]} testID={testID}>{toolbarPosition === 'top' && toolbar}<View style={[S.body, { height: wrapperH }]}><View style={S.columns} pointerEvents={loading ? 'none' : 'auto'}>{columnsTop}{columnsContent}{columnsBottom}{hasCols && <><View pointerEvents="none" style={[S.indicator, { top: indicatorOff, height: itemHeight }]}><View style={createHairlineView({ position: 'top', color: tokens.colors.indicator, left: 0, right: 0 })} /><View style={createHairlineView({ position: 'bottom', color: tokens.colors.indicator, left: 0, right: 0 })} /></View><GradientMask position="top" height={maskH} color={effMaskColor} maskType={maskType} /><GradientMask position="bottom" height={maskH} color={effMaskColor} maskType={maskType} /></>}</View>{loading && <View style={[S.loading, { backgroundColor: tokens.colors.loadingMask }]}><Loading /></View>}</View>{toolbarPosition === 'bottom' && toolbar}</View>
}

const S = StyleSheet.create({
  body: { position: 'relative', overflow: 'hidden' },
  columns: { flex: 1, flexDirection: 'row' },
  optTxt: { includeFontPadding: false },
  indicator: { position: 'absolute', left: 0, right: 0, zIndex: 3 },
  gMask: { position: 'absolute', left: 0, right: 0, zIndex: 2 },
  toolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { flex: 1, textAlign: 'center' },
  ttlW: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  actTxt: { minWidth: 44, textAlign: 'center' },
  actW: { minWidth: 44, alignItems: 'center', justifyContent: 'center' },
  loading: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
})

const Picker = React.memo(PickerImpl)
export default Picker
