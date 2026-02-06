import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Pressable,
  Text,
  View,
  Platform,
  StyleSheet,
  FlatList,
  ScrollView,
  PanResponder,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native'

import Loading from '../loading'
import { withAlpha } from '../../utils/color'
import { isFiniteNumber, isText } from '../../utils/validate'
import { clamp, isObject, shallowEqualArray } from '../../utils'
import { usePickerTokens } from './tokens'
import type {
  PickerColumn,
  PickerColumnProps,
  PickerColumns,
  PickerOption,
  PickerProps,
  PickerValue,
} from './types'

export interface NormalizedPickerResult {
  columns: PickerOption[][]
  values: PickerValue[]
  options: (PickerOption | undefined)[]
}

export interface PreparedPickerColumns {
  type: 'single' | 'multiple' | 'cascade'
  columnsList: PickerOption[][]
  defaults: (PickerValue | undefined)[]
  cascadeRoot?: PickerOption[]
}

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] => {
  if (Array.isArray(value)) return value.filter(v => v !== undefined && v !== null) as PickerValue[]
  if (value === undefined || value === null) return []
  return [value]
}

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col &&
  isObject(col) &&
  'options' in col &&
  Array.isArray((col as { options?: unknown }).options)

const hasChildren = (option: PickerOption) =>
  !!option && isObject(option) && Array.isArray((option as any).children) && (option as any).children.length > 0

export const findEnabledIndex = (options: PickerOption[], startIndex: number) => {
  if (!options.length) return -1
  const clampIndex = Math.min(Math.max(startIndex, 0), options.length - 1)
  if (!options[clampIndex]?.disabled) return clampIndex
  for (let i = clampIndex + 1; i < options.length; i += 1) {
    if (!options[i]?.disabled) return i
  }
  for (let i = clampIndex - 1; i >= 0; i -= 1) {
    if (!options[i]?.disabled) return i
  }
  return -1
}

const normalizeMultiple = (
  columnsList: PickerOption[][],
  defaults: (PickerValue | undefined)[],
  rawValue: PickerValue[],
): NormalizedPickerResult => {
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []

  columnsList.forEach((opts, index) => {
    const current = rawValue[index]
    const defaultIndex = defaults[index] !== undefined ? opts.findIndex(item => item.value === defaults[index]) : -1
    const currentIndex = opts.findIndex(item => item.value === current)
    const startIndex = currentIndex >= 0 ? currentIndex : defaultIndex >= 0 ? defaultIndex : 0
    const targetIndex = findEnabledIndex(opts, startIndex)
    const target = targetIndex >= 0 ? opts[targetIndex] : undefined
    const valid = currentIndex >= 0 && !opts[currentIndex]?.disabled
    values[index] = (valid ? current : (target?.value ?? defaults[index] ?? opts[0]?.value)) as PickerValue
    options[index] = target
  })

  return { columns: columnsList, values, options }
}

const normalizeCascade = (rootOptions: PickerOption[], rawValue: PickerValue[]): NormalizedPickerResult => {
  const columns: PickerOption[][] = []
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []

  let currentOptions: PickerOption[] | undefined = rootOptions
  let depth = 0
  while (currentOptions && currentOptions.length && depth < 10) {
    columns.push(currentOptions)
    const current = rawValue[depth]
    const startIndex = currentOptions.findIndex(item =>
      item.value === current || String(item.value) === String(current)
    )

    const targetIndex = findEnabledIndex(currentOptions, startIndex >= 0 ? startIndex : 0)
    const target: PickerOption | undefined =
      targetIndex >= 0 ? currentOptions[targetIndex] : currentOptions[0]

    values[depth] = target?.value as PickerValue
    options[depth] = target

    if (target && hasChildren(target)) {
      currentOptions = target.children
      depth += 1
    } else {
      break
    }
  }

  return { columns, values, options }
}

export const prepareColumns = (columnsInput: PickerColumns = []): PreparedPickerColumns => {
  if (!Array.isArray(columnsInput) || columnsInput.length === 0) {
    return { type: 'single', columnsList: [], defaults: [], cascadeRoot: [] }
  }

  const everyPlainOption = columnsInput.every(item =>
    !Array.isArray(item) && !isColumnWithOptions(item as unknown as PickerColumn | PickerOption)
  )
  const cascade = everyPlainOption && columnsInput.some(item => hasChildren(item as PickerOption))

  if (cascade) {
    return {
      type: 'cascade',
      columnsList: [],
      defaults: [],
      cascadeRoot: columnsInput as PickerOption[],
    }
  }

  const asArray = columnsInput as unknown[]
  const columnsList: PickerOption[][] = []
  const defaults: (PickerValue | undefined)[] = []

  const treatAsSingleColumn = everyPlainOption && !cascade
  if (treatAsSingleColumn) {
    columnsList.push(columnsInput as PickerOption[])
    defaults.push(undefined)
  } else {
    asArray.forEach(col => {
      if (Array.isArray(col)) {
        columnsList.push(col as PickerOption[])
        defaults.push(undefined)
      } else if (isColumnWithOptions(col as unknown as PickerColumn | PickerOption)) {
        const c = col as { options?: PickerOption[]; defaultValue?: PickerValue }
        columnsList.push(c.options ?? [])
        defaults.push(c.defaultValue)
      }
    })
  }

  return {
    type: 'multiple',
    columnsList,
    defaults,
  }
}

export const normalizePicker = (
  prepared: PreparedPickerColumns,
  rawValueInput: PickerValue[] = [],
): NormalizedPickerResult => {
  const rawValue = Array.isArray(rawValueInput) ? rawValueInput : []

  if (prepared.type === 'cascade' && prepared.cascadeRoot?.length) {
    return normalizeCascade(prepared.cascadeRoot, rawValue)
  }

  return normalizeMultiple(prepared.columnsList, prepared.defaults, rawValue)
}

const wheelStyles = StyleSheet.create({
  column: { flex: 1 },
  option: { justifyContent: 'center', alignItems: 'center' },
  grab: { cursor: 'pointer', userSelect: 'none', touchAction: 'none' } as unknown as ViewStyle,
})

type WheelPickerRender<T> = (
  item: T,
  index: number,
  meta: { active: boolean; disabled: boolean }
) => React.ReactNode

type WheelPickerItemProps<T> = {
  item: T
  index: number
  itemHeight: number
  active: boolean
  disabled: boolean
  renderItem: WheelPickerRender<T>
}

const WheelPickerItemInner = <T extends PickerOption>({
  item,
  index,
  itemHeight,
  active,
  disabled,
  renderItem,
}: WheelPickerItemProps<T>) => {
  const content = renderItem(item, index, { active, disabled })
  return (
    <View style={[wheelStyles.option, { height: itemHeight }]}>
      {content}
    </View>
  )
}

const WheelPickerItem = React.memo(
  WheelPickerItemInner,
  (prev, next) =>
    prev.item === next.item &&
    prev.index === next.index &&
    prev.itemHeight === next.itemHeight &&
    prev.active === next.active &&
    prev.disabled === next.disabled &&
    prev.renderItem === next.renderItem
) as <T extends PickerOption>(props: WheelPickerItemProps<T>) => React.JSX.Element

type WheelPickerProps<T extends PickerOption = PickerOption> = {
  data: T[]
  selectedIndex: number
  onChange: (index: number) => void
  onInteractStart?: () => void
  onInteractEnd?: () => void
  renderItem: WheelPickerRender<T>
  itemHeight: number
  visibleRest: number
  readOnly?: boolean
  indicatorColor: string
  decelerationRate?: 'normal' | 'fast' | number
  scrollEventThrottle?: number
  swipeDuration?: number
}

const getVelocityBucket = (velocity: number) => {
  const abs = Math.abs(velocity)
  if (abs > 1.2) return 2
  if (abs > 0.6) return 1
  return 0
}

const adjustIndex = (index: number, options: PickerOption[]) => {
  const total = options.length
  if (!total) return 0
  const i = clamp(index, 0, total - 1)
  const next = findEnabledIndex(options, i)
  return next >= 0 ? next : i
}

const indexToOffset = (index: number, itemHeight: number) => -index * itemHeight

const offsetToIndex = (offset: number, itemHeight: number, total: number, options: PickerOption[]) => {
  const minOffset = -Math.max(0, total - 1) * itemHeight
  const off = clamp(offset, minOffset, 0)
  let index = Math.round(-off / itemHeight)
  index = adjustIndex(index, options)
  const snapOffset = indexToOffset(index, itemHeight)
  return { index, snapOffset }
}

const shouldMomentum = (distance: number, duration: number) =>
  duration < 500 && Math.abs(distance) > 8

const momentumTarget = (
  distance: number,
  duration: number,
  currentOffset: number,
  itemHeight: number,
  minOffset: number,
) => {
  const speed = Math.abs(distance / duration)
  const extra = (speed / 0.0025) * (distance < 0 ? -1 : 1)
  const target = clamp(currentOffset + extra, minOffset, 0)
  const snapIndex = Math.round(-target / itemHeight)
  return indexToOffset(snapIndex, itemHeight)
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
  const listRef = useRef<FlatList<T>>(null)
  const scrollRef = useRef<React.ElementRef<typeof ScrollView>>(null)
  const spacerHeight = visibleRest * itemHeight
  const total = data.length
  const maxIndex = Math.max(0, total - 1)
  const minOffset = -maxIndex * itemHeight
  const containerHeight = itemHeight * (visibleRest * 2 + 1)
  const rawSelectedIndex = clamp(selectedIndex, 0, maxIndex)
  const enabledSelectedIndex = findEnabledIndex(data, rawSelectedIndex)
  const safeSelectedIndex = enabledSelectedIndex >= 0 ? enabledSelectedIndex : rawSelectedIndex
  const visibleCount = visibleRest * 2 + 1
  const effectiveScrollThrottle = total > visibleCount * 20 ? 32 : scrollEventThrottle
  const webVirtualEnabled = total > visibleCount * 4
  const Spacer = useCallback(() => <View style={{ height: spacerHeight }} />, [spacerHeight])
  const indicatorStyle = [styles.indicator, { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor }]

  const dragEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const momentumRef = useRef(false)
  const lastOffsetRef = useRef(0)

  const clearDragEndTimer = useCallback(() => {
    if (dragEndTimerRef.current) {
      clearTimeout(dragEndTimerRef.current)
      dragEndTimerRef.current = null
    }
  }, [])

  const emitIndexFromOffset = useCallback(
    (offsetY: number, animated: boolean) => {
      if (readOnly) return
      const { index, snapOffset } = offsetToIndex(-offsetY, itemHeight, total, data)
      const nextOffset = -snapOffset
      if (Math.abs(nextOffset - offsetY) > 0.5) {
        listRef.current?.scrollToOffset({ offset: nextOffset, animated })
      }
      onChange(index)
    },
    [data, itemHeight, onChange, readOnly, total],
  )

  useEffect(() => {
    const offset = safeSelectedIndex * itemHeight
    if (isWeb) return
    scrollRef.current?.scrollTo({ y: offset, animated: false })
  }, [isWeb, itemHeight, safeSelectedIndex])

  const [webOffset, setWebOffset] = useState(() => indexToOffset(safeSelectedIndex, itemHeight))
  const webOffsetRef = useRef(webOffset)
  const startOffsetRef = useRef(0)
  const startTimeRef = useRef(0)
  const [webTransition, setWebTransition] = useState(0)
  const [webVelocityBucket, setWebVelocityBucket] = useState(0)
  const webVelocityBucketRef = useRef(0)
  const lastWheelTimeRef = useRef<number | null>(null)
  const wheelDeltaRef = useRef(0)
  const wheelRafRef = useRef<number | null>(null)
  const pendingIndexRef = useRef<number | null>(null)
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const isInteractingRef = useRef(false)
  const notifyInteractStart = useCallback(() => {
    if (readOnly) return
    if (isInteractingRef.current) return
    isInteractingRef.current = true
    onInteractStart?.()
  }, [onInteractStart, readOnly])

  const notifyInteractEnd = useCallback(() => {
    if (!isInteractingRef.current) return
    isInteractingRef.current = false
    onInteractEnd?.()
  }, [onInteractEnd])

  const stopRaf = useCallback(() => {
    if (rafIdRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (wheelRafRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(wheelRafRef.current)
      wheelRafRef.current = null
    }
  }, [])

  const clearPendingTimer = useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearDragEndTimer()
      clearPendingTimer()
      stopRaf()
    }
  }, [clearDragEndTimer, clearPendingTimer, stopRaf])

  const setVelocityBucket = useCallback((velocity: number) => {
    const next = getVelocityBucket(velocity)
    if (next !== webVelocityBucketRef.current) {
      webVelocityBucketRef.current = next
      setWebVelocityBucket(next)
    }
  }, [])

  const updateWheelVelocity = useCallback(
    (delta: number) => {
      const now = Date.now()
      const last = lastWheelTimeRef.current
      if (last != null) {
        const dt = Math.max(1, now - last)
        setVelocityBucket(delta / dt)
      }
      lastWheelTimeRef.current = now
    },
    [setVelocityBucket],
  )

  useEffect(() => {
    if (!isWeb) return
    clearPendingTimer()
    pendingIndexRef.current = null
    setWebTransition(0)
    const next = indexToOffset(safeSelectedIndex, itemHeight)
    webOffsetRef.current = next
    setWebOffset(next)
  }, [clearPendingTimer, isWeb, itemHeight, safeSelectedIndex, setWebTransition])

  const finalizePendingChange = useCallback(() => {
    if (readOnly) return
    const nextIndex = pendingIndexRef.current
    if (nextIndex == null) return
    pendingIndexRef.current = null
    clearPendingTimer()
    setWebTransition(0)
    notifyInteractEnd()
    onChange(nextIndex)
  }, [clearPendingTimer, onChange, readOnly, setWebTransition])

  const startWebSnap = useCallback(
    (targetIndex: number) => {
      if (readOnly) return
      notifyInteractStart()
      const clampedIndex = clamp(targetIndex, 0, maxIndex)
      const targetOffset = indexToOffset(clampedIndex, itemHeight)
      clearPendingTimer()
      pendingIndexRef.current = clampedIndex
      webOffsetRef.current = targetOffset
      setWebTransition(swipeDuration)
      setWebOffset(targetOffset)
      if (swipeDuration <= 0) {
        finalizePendingChange()
      } else {
        pendingTimerRef.current = setTimeout(finalizePendingChange, swipeDuration + 80)
      }
    },
    [clearPendingTimer, finalizePendingChange, itemHeight, maxIndex, readOnly, swipeDuration],
  )

  const handleWheel = useCallback(
    (event: { nativeEvent?: { deltaY?: number } }) => {
      if (readOnly) return
      const delta = event.nativeEvent?.deltaY ?? 0
      if (!delta) return
      wheelDeltaRef.current += delta
      if (wheelRafRef.current != null || typeof requestAnimationFrame === 'undefined') {
        return
      }
      wheelRafRef.current = requestAnimationFrame(() => {
        wheelRafRef.current = null
        const queued = wheelDeltaRef.current
        wheelDeltaRef.current = 0
        if (!queued) return
        updateWheelVelocity(queued)
        const direction = queued > 0 ? 1 : -1
        const { index } = offsetToIndex(webOffsetRef.current, itemHeight, total, data)
        const nextIndex = clamp(index + direction, 0, maxIndex)
        startWebSnap(nextIndex)
      })
    },
    [data, itemHeight, maxIndex, readOnly, startWebSnap, total, updateWheelVelocity],
  )

  const webIndex = clamp(Math.round(-webOffset / itemHeight), 0, maxIndex)

  const webRender = useMemo(() => {
    if (!isWeb || total <= 0) {
      return { items: null as React.ReactNode, topSpacer: null as React.ReactNode, bottomSpacer: null as React.ReactNode }
    }
    let startIndex = 0
    let endIndex = maxIndex
    if (webVirtualEnabled) {
      const baseBuffer = Math.max(visibleCount * 2, 8)
      const velocityBoost = webVelocityBucket === 2 ? visibleCount * 4 : webVelocityBucket === 1 ? visibleCount * 2 : 0
      const buffer = Math.min(baseBuffer + velocityBoost, Math.max(visibleCount * 6, 24))
      startIndex = clamp(webIndex - buffer, 0, maxIndex)
      endIndex = clamp(webIndex + buffer, 0, maxIndex)
    }
    const items: React.ReactNode[] = []
    for (let index = startIndex; index <= endIndex; index += 1) {
      const item = data[index]
      if (!item) continue
      items.push(
        <WheelPickerItem
          key={`${index}-${String(item.value ?? '')}`}
          item={item}
          index={index}
          itemHeight={itemHeight}
          active={index === safeSelectedIndex}
          disabled={!!item.disabled}
          renderItem={renderItem}
        />,
      )
    }
    const topHeight = startIndex * itemHeight
    const bottomHeight = (maxIndex - endIndex) * itemHeight
    return {
      items,
      topSpacer: topHeight > 0 && <View style={{ height: topHeight }} />,
      bottomSpacer: bottomHeight > 0 && <View style={{ height: bottomHeight }} />,
    }
  }, [
    data,
    isWeb,
    itemHeight,
    maxIndex,
    renderItem,
    safeSelectedIndex,
    total,
    visibleCount,
    webIndex,
    webVelocityBucket,
    webVirtualEnabled,
  ])

  const webTransform = { transform: [{ translateY: webOffset }] }
  const webTransitionStyle: ViewStyle | undefined = webTransition
    ? ({
      transitionProperty: 'transform',
      transitionDuration: `${webTransition}ms`,
      transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)',
      willChange: 'transform',
    } as unknown as ViewStyle)
    : undefined
  const handleWebTransitionEnd = useCallback(
    (event: { nativeEvent?: { propertyName?: string } } & { propertyName?: string }) => {
      const propertyName = event.nativeEvent?.propertyName ?? event.propertyName
      if (propertyName && propertyName !== 'transform' && propertyName !== 'webkitTransform') return
      finalizePendingChange()
    },
    [finalizePendingChange],
  )

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !readOnly,
    onMoveShouldSetPanResponder: () => !readOnly,
    onPanResponderGrant: () => {
      stopRaf()
      pendingIndexRef.current = null
      notifyInteractStart()
      setWebTransition(0)
      startOffsetRef.current = webOffsetRef.current
      startTimeRef.current = Date.now()
    },
    onPanResponderMove: (_, gesture) => {
      if (readOnly) return
      setVelocityBucket(gesture.vy)
      const next = clamp(
        startOffsetRef.current + gesture.dy,
        minOffset,
        0,
      )
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
      let target = clamp(startOffsetRef.current + distance, minOffset, 0)
      if (shouldMomentum(distance, duration)) {
        target = momentumTarget(distance, duration, startOffsetRef.current, itemHeight, minOffset)
      }
      const { index } = offsetToIndex(target, itemHeight, total, data)
      startWebSnap(index)
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderTerminate: () => {
      notifyInteractEnd()
      setWebTransition(0)
    },
  }), [
    data,
    itemHeight,
    minOffset,
    notifyInteractEnd,
    notifyInteractStart,
    readOnly,
    setVelocityBucket,
    startWebSnap,
    stopRaf,
    total,
  ])

  if (isWeb) {
    return (
      <View
        style={[wheelStyles.column, { height: containerHeight }, wheelStyles.grab]}
        {...({ onWheel: handleWheel } as unknown as React.ComponentProps<typeof View>)}
        {...panResponder.panHandlers}
      >
        <View style={indicatorStyle} pointerEvents="none" />
        <View
          style={[webTransform, webTransitionStyle]}
          {...({ onTransitionEnd: handleWebTransitionEnd } as unknown as React.ComponentProps<typeof View>)}
        >
          <Spacer />
          {webRender.topSpacer}
          {webRender.items}
          {webRender.bottomSpacer}
          <Spacer />
        </View>
      </View>
    )
  }

  const shouldCapture = !readOnly

  const contentContainerStyle = { paddingVertical: spacerHeight }

  return (
    <View
      style={[wheelStyles.column, { height: containerHeight }]}
      collapsable={false}
    >
      <View style={indicatorStyle} pointerEvents="none" />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={effectiveScrollThrottle}
        decelerationRate={decelerationRate}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled
        contentContainerStyle={contentContainerStyle}
        onStartShouldSetResponderCapture={() => shouldCapture}
        onMoveShouldSetResponderCapture={() => shouldCapture}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          lastOffsetRef.current = e.nativeEvent.contentOffset.y
        }}
        onScrollBeginDrag={() => {
          momentumRef.current = false
          clearDragEndTimer()
          notifyInteractStart()
        }}
        onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (readOnly) return
          const y = e.nativeEvent.contentOffset.y
          lastOffsetRef.current = y
          clearDragEndTimer()
          dragEndTimerRef.current = setTimeout(() => {
            if (!momentumRef.current) {
              emitIndexFromOffset(lastOffsetRef.current, true)
              notifyInteractEnd()
            }
          }, 80)
        }}
        onMomentumScrollBegin={() => {
          momentumRef.current = true
          clearDragEndTimer()
          notifyInteractStart()
        }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          momentumRef.current = false
          clearDragEndTimer()
          const y = e.nativeEvent.contentOffset.y
          lastOffsetRef.current = y
          emitIndexFromOffset(y, false)
          notifyInteractEnd()
        }}
        scrollEnabled={!readOnly}
      >
        {data.map((item, index) => (
          <WheelPickerItem
            key={`${index}-${String(item.value ?? '')}`}
            item={item}
            index={index}
            itemHeight={itemHeight}
            active={index === safeSelectedIndex}
            disabled={!!item.disabled}
            renderItem={renderItem}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const WheelPicker = React.memo(WheelPickerInner) as typeof WheelPickerInner


export function usePickerValue({
  columns,
  valueProp,
  defaultValue,
  emitConfirmOnAutoSelect = true,
  onChange,
  onConfirm,
}: {
  columns?: PickerColumns
  valueProp?: PickerProps['value']
  defaultValue?: PickerProps['defaultValue']
  emitConfirmOnAutoSelect?: boolean
  onChange?: PickerProps['onChange']
  onConfirm?: PickerProps['onConfirm']
}) {
  const preparedColumns = useMemo(() => prepareColumns(columns), [columns])
  const isControlled = valueProp !== undefined

  const [innerValue, setInnerValue] = useState<PickerValue[]>(() => {
    const initial = toArrayValue(valueProp ?? defaultValue)
    return normalizePicker(preparedColumns, initial).values
  })
  const innerValueRef = useRef(innerValue)

  const commitValue = useCallback((next: PickerValue[]) => {
    innerValueRef.current = next
    setInnerValue(next)
  }, [])

  useEffect(() => {
    if (!isControlled) return
    const next = toArrayValue(valueProp)
    if (!shallowEqualArray(innerValueRef.current, next)) {
      commitValue(next)
    }
  }, [commitValue, isControlled, valueProp])

  const normalized = useMemo(
    () => normalizePicker(preparedColumns, innerValue),
    [preparedColumns, innerValue]
  )

  useEffect(() => {
    if (isControlled) return
    if (!shallowEqualArray(innerValue, normalized.values)) {
      commitValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [
    commitValue,
    emitConfirmOnAutoSelect,
    innerValue,
    isControlled,
    normalized,
    onChange,
    onConfirm,
  ])

  const handleSelect = useCallback(
    (option: PickerOption, columnIndex: number) => {
      const next = [...innerValueRef.current]
      next[columnIndex] = option.value

      if (preparedColumns.type === 'cascade') {
        next.length = columnIndex + 1
      }

      const final = normalizePicker(preparedColumns, next)
      if (shallowEqualArray(innerValueRef.current, final.values)) return
      commitValue(final.values)
      onChange?.(final.values, final.options)
    },
    [commitValue, onChange, preparedColumns],
  )

  const handleConfirm = useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized, onConfirm])

  return {
    preparedColumns,
    normalized,
    handleSelect,
    handleConfirm,
  }
}

const getVisibleCount = (count: number) => {
  const normalized = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.95, 0.75, 0.55, 0.35]
const GRADIENT_STEPS_REVERSED = [0.35, 0.55, 0.75, 0.95]

const GradientMask: React.FC<{
  height: number
  color: string
  position: 'top' | 'bottom'
  maskType: NonNullable<PickerProps['maskType']>
}> = ({ height, color, position, maskType }) => {
  const isWeb = Platform.OS === 'web'
  const baseStyle = [
    styles.gradientMask,
    { height },
    position === 'top' ? { top: 0 } : { bottom: 0 },
  ]

  const overlayColor = withAlpha(color, GRADIENT_OVERLAY_ALPHA)

  if (maskType === 'solid') {
    return <View pointerEvents="none" style={[...baseStyle, { backgroundColor: withAlpha(color, 0.9) }]} />
  }

  if (isWeb) {
    const angle = position === 'top' ? '180deg' : '0deg'
    const gradientStart = withAlpha(color, 0.98)
    const gradientEnd = withAlpha(color, 0.4)
    return (
      <View
        pointerEvents="none"
        style={[
          ...baseStyle,
          ({
            backgroundColor: overlayColor,
            backgroundImage: `linear-gradient(${angle}, ${gradientStart}, ${gradientEnd})`,
          } as unknown as ViewStyle),
        ]}
      />
    )
  }

  const steps = position === 'top' ? GRADIENT_STEPS : GRADIENT_STEPS_REVERSED

  return (
    <View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>
      {steps.map((opacity, idx) => (
        <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />
      ))}
    </View>
  )
}

const PickerColumn: React.FC<
  PickerColumnProps & {
    tokens: ReturnType<typeof usePickerTokens>
  }
> = React.memo(
  props => {
    const {
      columnIndex,
      options,
      value,
      itemHeight,
      visibleItemCount,
      optionRender,
      getOptionTestID,
      getOptionA11yLabel,
      onSelect,
      tokens,
      readOnly,
      decelerationRate,
      scrollEventThrottle,
      swipeDuration,
    } = props
    const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2))

    const valueIndexMap = useMemo(
      () => new Map(options.map((option, idx) => [option.value, idx] as const)),
      [options]
    )
    const selectedIndex = useMemo(() => {
      if (!options.length) return 0
      const idx = valueIndexMap.get(value as PickerValue)
      const startIndex = typeof idx === 'number' && idx >= 0 ? idx : 0
      return findEnabledIndex(options, startIndex)
    }, [options, value, valueIndexMap])

    const handleChange = useCallback((index: number) => {
      const target = findEnabledIndex(options, index)
      const option = options[target]
      if (!option || option.disabled) return
      onSelect(option, columnIndex, target)
    }, [columnIndex, onSelect, options])

    return (
      <View style={[wheelStyles.column, { height: itemHeight * visibleItemCount }]}>
        <WheelPicker
          data={options}
          itemHeight={itemHeight}
          visibleRest={restVisible}
          selectedIndex={Math.max(0, selectedIndex)}
          onChange={handleChange}
          readOnly={readOnly}
          indicatorColor={tokens.colors.indicator}
          decelerationRate={decelerationRate}
          scrollEventThrottle={scrollEventThrottle}
          swipeDuration={swipeDuration}
          renderItem={(item: PickerOption, _index: number, meta: { active: boolean; disabled: boolean }) => {
            const active = meta?.active ?? false
            const disabled = meta?.disabled ?? false
            const textColor = disabled ? tokens.colors.textDisabled : (active ? tokens.colors.text : tokens.colors.textMuted)
            const content = optionRender ? optionRender(item, { columnIndex, active }) : item.label ?? item.value
            const testID = getOptionTestID?.(item, { columnIndex, active })
            const a11yLabel = getOptionA11yLabel?.(item, { columnIndex, active })
            return (
              <View style={[wheelStyles.option, { opacity: disabled ? 0.5 : 1, minHeight: itemHeight }]} testID={testID} accessible={!!a11yLabel} accessibilityLabel={a11yLabel}>
                {isText(content) ? (
                  <Text numberOfLines={1} style={[styles.optionText, {
                    color: textColor,
                    fontSize: tokens.typography.optionSize,
                    fontFamily: tokens.typography.fontFamily,
                    fontWeight: tokens.typography.optionWeight,
                  }]}>{content}</Text>
                ) : content}
              </View>
            )
          }}
        />
      </View>
    )
  }
)

const PickerImpl: React.FC<PickerProps> = props => {
  const { tokensOverride } = props
  const tokens = usePickerTokens(tokensOverride)
  const {
    columns = [],
    value: valueProp,
    defaultValue,
    title,
    showToolbar = tokens.defaults.showToolbar,
    toolbarPosition = tokens.defaults.toolbarPosition,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    itemHeight = tokens.defaults.itemHeight,
    visibleItemCount: visibleItemCountProp = tokens.defaults.visibleItemCount,
    loading = false,
    readOnly = false,
    decelerationRate = Platform.select({ ios: 0.999, android: 0.997, default: 0.989 }) ?? 'normal',
    swipeDuration = tokens.defaults.swipeDuration,
    scrollEventThrottle = 16,
    columnsTop,
    columnsBottom,
    optionRender,
    getOptionTestID,
    getOptionA11yLabel,
    emitConfirmOnAutoSelect = true,
    maskColor,
    maskType = tokens.defaults.maskType,
    onChange,
    onConfirm,
    onCancel,
    style,
    testID,
    ...rest
  } = props

  const visibleItemCount = getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount)

  const { normalized, handleSelect, handleConfirm, preparedColumns } = usePickerValue({
    columns,
    valueProp,
    defaultValue,
    emitConfirmOnAutoSelect,
    onChange,
    onConfirm,
  })
  const isCascade = preparedColumns.type === 'cascade'

  const renderActionContent = (content: React.ReactNode, color: string) => {
    if (React.isValidElement(content)) return <View style={{ minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>{content}</View>
    if (isText(content)) return <Text numberOfLines={1} style={[styles.actionText, {
      color,
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.toolbarWeight,
    }]}>{content}</Text>
    return <View style={{ minWidth: 44 }} />
  }

  const renderTitleContent = (content: React.ReactNode) => {
    if (content == null) return <View />
    if (React.isValidElement(content)) return <View style={[styles.title, { alignItems: 'center', justifyContent: 'center' }]}>{content}</View>
    return <Text style={[styles.title, {
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      color: tokens.colors.text,
      fontWeight: tokens.typography.toolbarWeight,
    }]} numberOfLines={1}>{content}</Text>
  }

  const toolbar = showToolbar ? (
    <View style={[styles.toolbar, {
      height: tokens.spacing.toolbarHeight,
      borderColor: tokens.colors.indicator,
      paddingHorizontal: tokens.spacing.actionPadding,
    }]}>
      <Pressable onPress={onCancel} accessibilityRole="button">
        {renderActionContent(cancelButtonText, tokens.colors.cancel)}
      </Pressable>
      {renderTitleContent(title)}
      <Pressable onPress={handleConfirm} accessibilityRole="button">
        {renderActionContent(confirmButtonText, tokens.colors.confirm)}
      </Pressable>
    </View>
  ) : null

  const wrapperHeight = itemHeight * visibleItemCount
  const maskVisibleCount = Math.max(1, Math.floor((visibleItemCount - 1) / 2))
  const indicatorOffset = itemHeight * maskVisibleCount
  const maskHeight = indicatorOffset
  const hasColumns = normalized.columns.length > 0
  const effectiveMaskColor = maskColor ?? tokens.colors.mask
  const columnsContent = hasColumns
    ? normalized.columns.map((column, columnIndex) => {
      const key = isCascade ? `${columnIndex}-${normalized.values.slice(0, columnIndex).map(String).join('|')}` : String(columnIndex)
      return (
        <PickerColumn
          key={key}
          columnIndex={columnIndex}
          options={column}
          value={normalized.values[columnIndex]}
          itemHeight={itemHeight}
          visibleItemCount={visibleItemCount}
          decelerationRate={decelerationRate}
          scrollEventThrottle={scrollEventThrottle}
          optionRender={optionRender}
          getOptionTestID={getOptionTestID}
          getOptionA11yLabel={getOptionA11yLabel}
          readOnly={readOnly}
          swipeDuration={swipeDuration}
          onSelect={handleSelect}
          tokens={tokens}
        />
      )
    })
    : null

  return (
    <View
      {...rest}
      style={[
        { backgroundColor: tokens.colors.background, borderRadius: tokens.radius.container },
        style,
      ]}
      testID={testID}
    >
      {toolbarPosition === 'top' && toolbar}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {columnsTop}
          {columnsContent}
          {columnsBottom}
          {hasColumns && (
            <>
              <View pointerEvents="none" style={[styles.indicator, {
                top: indicatorOffset,
                height: itemHeight,
                borderColor: tokens.colors.indicator,
              }]} />
              <GradientMask position="top" height={maskHeight} color={effectiveMaskColor} maskType={maskType} />
              <GradientMask position="bottom" height={maskHeight} color={effectiveMaskColor} maskType={maskType} />
            </>
          )}
        </View>
        {loading && (
          <View style={[styles.loading, { backgroundColor: tokens.colors.loadingMask }]}>
            <Loading />
          </View>
        )}
      </View>
      {toolbarPosition === 'bottom' && toolbar}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    position: 'relative',
    overflow: 'hidden',
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  optionText: {
    includeFontPadding: false,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 3,
  },
  gradientMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  actionText: {
    minWidth: 44,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Picker = React.memo(PickerImpl)
Picker.displayName = 'Picker'

export default Picker
