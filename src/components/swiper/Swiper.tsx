import React, { useRef, useState, useCallback, useEffect, useImperativeHandle, forwardRef, memo, useMemo, Children, isValidElement, type ReactElement, type RefAttributes, type Ref } from 'react'
import { FlatList, View, StyleSheet, Platform, type NativeScrollEvent, type NativeSyntheticEvent, type LayoutChangeEvent } from 'react-native'
import { clamp } from '../../utils/number'
import type { SwiperProps, SwiperInstance, SwiperItemProps } from './types'
import SwiperPagIndicator from './SwiperPagIndicator'
import { useSwiperTokens } from './tokens'

type SwiperComponent = (<T>(props: SwiperProps<T> & RefAttributes<SwiperInstance>) => ReactElement | null) & { displayName?: string }

const SwiperItemImpl = (props: SwiperItemProps, ref: React.ForwardedRef<View>) => <View ref={ref} style={[S.item, props.style]} testID={props.testID}>{props.children}</View>
const SwiperItemFR = forwardRef<View, SwiperItemProps>(SwiperItemImpl)
SwiperItemFR.displayName = 'SwiperItem'
export const SwiperItem = memo(SwiperItemFR)

const LOOP_THRESHOLD = 10

const SwiperImpl = <T extends unknown>(props: SwiperProps<T>, ref: Ref<SwiperInstance>) => {
  const { data, renderItem, children, initialSwipe = 0, touchable = true, loop = true, autoplay = false, vertical = false, onChange, indicator = true, indicatorProps, style, testID } = props
  const tokens = useSwiperTokens()
  const listRef = useRef<FlatList>(null)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const interRef = useRef(false)
  const animRef = useRef(false)
  const queueRef = useRef<number | null>(null)
  const momRef = useRef(false)
  const dragRef = useRef<number | null>(null)
  const isWeb = Platform.OS === 'web'
  const [layout, setLayout] = useState({ width: 0, height: 0 })

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout
    setLayout(p => (p.width === w && p.height === h ? p : { width: w, height: h }))
  }, [])

  const items = useMemo(() => !children ? [] : Children.toArray(children).filter((c): c is ReactElement => isValidElement(c)), [children])
  const usingData = Array.isArray(data)
  const base = usingData ? data! : items
  const count = base.length
  const shouldLoop = loop && count > 1

  const display = useMemo(() => shouldLoop ? [base[count - 1], ...base, base[0]] : base, [base, shouldLoop, count])
  const dCount = display.length
  const loopAll = shouldLoop && dCount <= LOOP_THRESHOLD

  const realIdx = useCallback((di: number) => !shouldLoop ? clamp(di, 0, count - 1) : di === 0 ? count - 1 : di === dCount - 1 ? 0 : di - 1, [shouldLoop, count, dCount])
  const dispIdx = useCallback((ri: number) => shouldLoop ? clamp(ri, 0, count - 1) + 1 : clamp(ri, 0, count - 1), [shouldLoop, count])

  const initReal = clamp(initialSwipe, 0, Math.max(0, count - 1))
  const initDisp = dispIdx(initReal)
  const curRef = useRef(initReal)
  const [curIdx, setCurIdx] = useState(initReal)
  const ready = layout.width > 0 && layout.height > 0
  const mainSz = vertical ? layout.height : layout.width
  const crossSz = vertical ? layout.width : layout.height
  const itemSz = useMemo(() => ({ width: vertical ? crossSz : mainSz, height: vertical ? mainSz : crossSz }), [vertical, mainSz, crossSz])

  const clearAuto = useCallback(() => { if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null } }, [])
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const update = useCallback((n: number) => {
    const c = clamp(n, 0, Math.max(0, count - 1))
    if (curRef.current === c) return
    curRef.current = c; setCurIdx(c); onChangeRef.current?.(c)
  }, [count])

  const scrollTo = useCallback((i: number, anim: boolean) => { try { listRef.current?.scrollToIndex({ index: i, animated: anim }) } catch {} }, [])

  const swipeTo = useCallback((index: number, animated = true) => {
    if (count === 0) return
    if (animated && animRef.current) { queueRef.current = index; return }
    const tReal = clamp(index, 0, count - 1)
    let tDisp = dispIdx(tReal)
    if (shouldLoop && animated) {
      const cDisp = dispIdx(curRef.current)
      if (cDisp === count && tReal === 0) tDisp = dCount - 1
      else if (cDisp === 1 && tReal === count - 1) tDisp = 0
    }
    const cReal = curRef.current, cDisp = dispIdx(cReal)
    if (tReal === cReal && tDisp === cDisp) { if (queueRef.current != null) { const q = queueRef.current; queueRef.current = null; swipeTo(q, true) }; return }
    if (animated) animRef.current = true
    scrollTo(tDisp, animated)
    if (!animated) { update(tReal); if (queueRef.current != null) { const q = queueRef.current; queueRef.current = null; swipeTo(q, true) } }
  }, [count, dispIdx, scrollTo, shouldLoop, dCount, update])

  const schedule = useCallback(() => {
    const iv = typeof autoplay === 'number' ? Math.max(0, autoplay) : autoplay ? tokens.defaults.autoplayInterval : 0
    if (!iv || count <= 1) return
    if (interRef.current && !isWeb) return
    clearAuto()
    autoRef.current = setTimeout(() => {
      if (interRef.current && !isWeb) return
      swipeTo(shouldLoop ? (curRef.current + 1) % count : clamp(curRef.current + 1, 0, count - 1), true)
    }, iv)
  }, [autoplay, count, clearAuto, shouldLoop, swipeTo, isWeb, tokens.defaults.autoplayInterval])

  const next = useCallback(() => { if (count === 0) return; swipeTo(shouldLoop ? (curRef.current + 1) % count : clamp(curRef.current + 1, 0, count - 1), true) }, [count, shouldLoop, swipeTo])
  const prev = useCallback(() => { if (count === 0) return; swipeTo(shouldLoop ? (curRef.current - 1 + count) % count : clamp(curRef.current - 1, 0, count - 1), true) }, [count, shouldLoop, swipeTo])

  const flush = () => { if (queueRef.current == null) return; const q = queueRef.current; queueRef.current = null; swipeTo(q, true) }

  useImperativeHandle(ref, () => ({ swipeTo, swipeNext: next, swipePrev: prev, getCurrentIndex: () => curRef.current }), [swipeTo, next, prev])

  useEffect(() => { if (!ready || count === 0) return; scrollTo(initDisp, false) }, [ready, count, initDisp, scrollTo])
  useEffect(() => { schedule(); return clearAuto }, [schedule, clearAuto, curIdx])

  const reset = useCallback(() => { animRef.current = false; interRef.current = false; momRef.current = false; schedule(); flush() }, [schedule])

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (count <= 1) return
    const off = vertical ? e.nativeEvent.contentOffset.y : e.nativeEvent.contentOffset.x
    const di = Math.round(off / mainSz)
    const cdi = shouldLoop ? clamp(di, 0, dCount - 1) : clamp(di, 0, count - 1)
    update(realIdx(cdi))
    if (isWeb) {
      const aligned = di * mainSz
      if (Math.abs(off - aligned) < 0.5) {
        if (shouldLoop && (di <= 0 || di >= dCount - 1)) scrollTo(di <= 0 ? count : 1, false)
        reset()
      }
    }
  }, [count, vertical, mainSz, shouldLoop, dCount, update, realIdx, scrollTo, reset, isWeb])

  const onEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isWeb || count === 0) return
    const off = vertical ? e.nativeEvent.contentOffset.y : e.nativeEvent.contentOffset.x
    const di = Math.round(off / mainSz)
    let ndi = di
    if (shouldLoop) { if (di === 0) ndi = count; if (di === dCount - 1) ndi = 1 }
    if (ndi !== di) scrollTo(ndi, false)
    update(realIdx(ndi)); reset()
  }, [vertical, count, mainSz, shouldLoop, dCount, scrollTo, update, realIdx, reset, isWeb])

  const onDragBegin = useCallback(() => { interRef.current = true; clearAuto() }, [clearAuto])
  const onDragEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { if (!momRef.current) onEnd(e) }, [onEnd])
  const onMomBegin = useCallback(() => { momRef.current = true }, [])
  const onFail = useCallback((info: { index: number }) => { scrollTo(info.index, false); update(realIdx(info.index)); reset() }, [scrollTo, update, realIdx, reset])

  const renderItemRef = useRef(renderItem)
  renderItemRef.current = renderItem

  const renderSlide = useCallback((info: { item: T | ReactElement }) => {
    const c = usingData ? renderItemRef.current?.(info as Parameters<NonNullable<typeof renderItem>>[0]) ?? null : (info.item as ReactElement)
    return c ? <View style={[S.slide, itemSz]}>{c}</View> : null
  }, [usingData, itemSz])

  const getLayout = useCallback((_: unknown, i: number) => ({ length: mainSz, offset: mainSz * i, index: i }), [mainSz])
  const keyEx = useCallback((_: unknown, i: number) => `s-${i}`, [])

  if (count === 0) return null
  const indNode = indicator === false || count <= 1 ? null : typeof indicator === 'function' ? indicator(count, curIdx) : <SwiperPagIndicator {...indicatorProps} total={count} current={curIdx} vertical={vertical} />

  const webMouse = isWeb && touchable && count > 1 ? ({
    onPointerDown: (e: any) => { if (e.nativeEvent.pointerType !== 'mouse' || e.nativeEvent.button !== 0) return; dragRef.current = vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX; interRef.current = true; clearAuto() },
    onPointerUp: (e: any) => { const s = dragRef.current; dragRef.current = null; if (s == null || e.nativeEvent.pointerType !== 'mouse') return; const d = (vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX) - s; if (Math.abs(d) >= mainSz * 0.15) { d < 0 ? next() : prev() }; interRef.current = false; schedule() },
    onPointerLeave: () => { if (dragRef.current != null) { dragRef.current = null; interRef.current = false; schedule() } },
  } as Record<string, any>) : undefined

  if (!ready) {
    return <View style={[S.ctr, style]} onLayout={onLayout} testID={testID} />
  }

  return (
    <View accessibilityRole="adjustable" accessibilityLabel={`swiper, ${curIdx + 1} of ${count}`} accessibilityValue={{ min: 0, max: count - 1, now: curIdx }} style={[S.ctr, webMouse && S.web, style]} onLayout={onLayout} testID={testID} {...webMouse}>
      <FlatList ref={listRef} data={display} renderItem={renderSlide as any} keyExtractor={keyEx} horizontal={!vertical} getItemLayout={getLayout} initialScrollIndex={initDisp} scrollEnabled={touchable && count > 1} removeClippedSubviews={!shouldLoop || !loopAll} disableVirtualization={shouldLoop && loopAll} initialNumToRender={shouldLoop ? (loopAll ? dCount : 3) : 3} maxToRenderPerBatch={shouldLoop ? (loopAll ? dCount : 3) : 3} windowSize={shouldLoop ? (loopAll ? dCount : 7) : 5} pagingEnabled snapToInterval={mainSz} decelerationRate="fast" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} onScrollBeginDrag={onDragBegin} onScroll={onScroll} scrollEventThrottle={tokens.defaults.scrollEventThrottle} onScrollEndDrag={onDragEnd} onMomentumScrollBegin={onMomBegin} onMomentumScrollEnd={onEnd} onScrollToIndexFailed={onFail} />
      <View pointerEvents="none" style={[S.ind, { zIndex: tokens.layer.zIndex, elevation: tokens.layer.elevation }]}>{indNode}</View>
    </View>
  )
}

const SwiperFR = forwardRef(SwiperImpl) as unknown as SwiperComponent
const Swiper = memo(SwiperFR) as unknown as SwiperComponent
const S = StyleSheet.create({ ctr: { position: 'relative', overflow: 'hidden' }, web: { cursor: 'grab', userSelect: 'none' } as any, slide: { flex: 1 }, item: { flex: 1 }, ind: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } })
export default Swiper
