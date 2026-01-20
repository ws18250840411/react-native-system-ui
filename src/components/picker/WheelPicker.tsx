import React from 'react'
import {
  FlatList,
  Platform,
  View,
  StyleSheet,
  PanResponder,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native'

import { clamp } from '../../utils/number'
import { indexToOffset, offsetToIndex, shouldMomentum, momentumTarget } from './core'
import styles from './styles'
import type { PickerOption } from './types'
import { findEnabledIndex } from './utils'

type WheelPickerRender<T> = (item: T | null, index: number) => React.ReactNode

export type WheelPickerProps<T extends PickerOption = PickerOption> = {
  data: T[]
  selectedIndex: number
  onChange: (index: number) => void
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

const WheelPickerInner = <T extends PickerOption,>({
  data,
  selectedIndex,
  onChange,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = Platform.select({ ios: 0.9975, android: 0.989, default: 0.989 }) ?? 'normal',
  scrollEventThrottle = 16,
  swipeDuration = 300,
}: WheelPickerProps<T>) => {
  const isWeb = Platform.OS === 'web'
  const listRef = React.useRef<FlatList<T>>(null)
  const spacerHeight = visibleRest * itemHeight
  const total = data.length
  const maxIndex = Math.max(0, total - 1)
  const minOffset = -maxIndex * itemHeight
  const containerHeight = itemHeight * (visibleRest * 2 + 1)
  const rawSelectedIndex = clamp(selectedIndex, 0, maxIndex)
  const enabledSelectedIndex = findEnabledIndex(data, rawSelectedIndex)
  const safeSelectedIndex = enabledSelectedIndex >= 0 ? enabledSelectedIndex : rawSelectedIndex
  const visibleCount = visibleRest * 2 + 1
  const initialRenderCount = Math.min(total || visibleCount, visibleCount)
  const maxBatchRenderCount = Math.min(
    total || visibleCount * 2,
    Math.max(visibleCount * 2, 10),
  )
  const windowSize = total > visibleCount * 12 ? 7 : 5
  const batchingPeriod = total > visibleCount * 20 ? 32 : 16
  const effectiveScrollThrottle = total > visibleCount * 20 ? 32 : scrollEventThrottle
  const webVirtualEnabled = total > visibleCount * 4
  const Spacer = React.useCallback(() => <View style={{ height: spacerHeight }} />, [spacerHeight])

  const dragEndTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const momentumRef = React.useRef(false)

  const clearDragEndTimer = React.useCallback(() => {
    if (dragEndTimerRef.current) {
      clearTimeout(dragEndTimerRef.current)
      dragEndTimerRef.current = null
    }
  }, [])

  React.useEffect(() => () => clearDragEndTimer(), [clearDragEndTimer])

  const emitIndexFromOffset = React.useCallback(
    (offsetY: number, animated: boolean) => {
      if (readOnly) return
      const { index, snapOffset } = offsetToIndex(-offsetY, itemHeight, total, data)
      const nextOffset = -snapOffset
      if (Math.abs(nextOffset - offsetY) > 0.5) {
        listRef.current?.scrollToOffset({ offset: nextOffset, animated })
      }
      if (index !== safeSelectedIndex) onChange(index)
    },
    [data, itemHeight, onChange, readOnly, safeSelectedIndex, total],
  )

  React.useEffect(() => {
    const offset = safeSelectedIndex * itemHeight
    listRef.current?.scrollToOffset({ offset, animated: false })
  }, [itemHeight, safeSelectedIndex])

  const [webOffset, setWebOffset] = React.useState(() => indexToOffset(safeSelectedIndex, itemHeight))
  const webOffsetRef = React.useRef(webOffset)
  const startOffsetRef = React.useRef(0)
  const startTimeRef = React.useRef(0)
  const [webTransition, setWebTransition] = React.useState(0)
  const [webVelocityBucket, setWebVelocityBucket] = React.useState(0)
  const webVelocityBucketRef = React.useRef(0)
  const lastWheelTimeRef = React.useRef<number | null>(null)
  const wheelDeltaRef = React.useRef(0)
  const wheelRafRef = React.useRef<number | null>(null)
  const pendingIndexRef = React.useRef<number | null>(null)
  const pendingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = React.useRef<number | null>(null)

  const stopRaf = React.useCallback(() => {
    if (rafIdRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (wheelRafRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(wheelRafRef.current)
      wheelRafRef.current = null
    }
  }, [])

  const clearPendingTimer = React.useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
    }
  }, [])

  const setVelocityBucket = React.useCallback((velocity: number) => {
    const next = getVelocityBucket(velocity)
    if (next !== webVelocityBucketRef.current) {
      webVelocityBucketRef.current = next
      setWebVelocityBucket(next)
    }
  }, [])

  const updateWheelVelocity = React.useCallback(
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

  React.useEffect(() => () => clearPendingTimer(), [clearPendingTimer])
  React.useEffect(() => () => stopRaf(), [stopRaf])
  React.useEffect(() => {
    if (!isWeb) return
    clearPendingTimer()
    pendingIndexRef.current = null
    const next = indexToOffset(safeSelectedIndex, itemHeight)
    webOffsetRef.current = next
    setWebOffset(next)
  }, [clearPendingTimer, isWeb, itemHeight, safeSelectedIndex])

  const finalizePendingChange = React.useCallback(() => {
    if (readOnly) return
    const nextIndex = pendingIndexRef.current
    if (nextIndex == null) return
    pendingIndexRef.current = null
    clearPendingTimer()
    if (nextIndex !== safeSelectedIndex) onChange(nextIndex)
  }, [clearPendingTimer, onChange, readOnly, safeSelectedIndex])

  const startWebSnap = React.useCallback(
    (targetIndex: number) => {
      if (readOnly) return
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

  const handleWheel = React.useCallback(
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
        if (nextIndex === safeSelectedIndex) return
        startWebSnap(nextIndex)
      })
    },
    [data, itemHeight, maxIndex, readOnly, safeSelectedIndex, startWebSnap, total, updateWheelVelocity],
  )

  const keyExtractor = React.useCallback(
    (item: T, idx: number) => `${idx}-${String(item.value ?? '')}`,
    [],
  )

  const renderListItem = React.useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const content = renderItem(item, index)
      return (
        <View style={[styles.option, { height: itemHeight }]}>
          {content ?? null}
        </View>
      )
    },
    [itemHeight, renderItem],
  )

  const webIndex = React.useMemo(
    () => clamp(Math.round(-webOffset / itemHeight), 0, maxIndex),
    [itemHeight, maxIndex, webOffset],
  )

  const webRender = React.useMemo(() => {
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
      const content = renderItem(item, index)
      items.push(
        <View key={`${index}-${String(item.value ?? '')}`} style={[styles.option, { height: itemHeight }]}>
          {content ?? null}
        </View>,
      )
    }
    const topHeight = startIndex * itemHeight
    const bottomHeight = (maxIndex - endIndex) * itemHeight
    return {
      items,
      topSpacer: topHeight > 0 ? <View style={{ height: topHeight }} /> : null,
      bottomSpacer: bottomHeight > 0 ? <View style={{ height: bottomHeight }} /> : null,
    }
  }, [data, isWeb, itemHeight, maxIndex, renderItem, total, visibleCount, webIndex, webVirtualEnabled, webVelocityBucket])

  const webTransform = React.useMemo(
    () => ({ transform: [{ translateY: webOffset }] }),
    [webOffset],
  )
  const webTransitionStyle = React.useMemo<ViewStyle | undefined>(
    () =>
      webTransition
        ? ({
          transitionProperty: 'transform',
          transitionDuration: `${webTransition}ms`,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)',
          willChange: 'transform',
        } as unknown as ViewStyle)
        : undefined,
    [webTransition],
  )
  const handleWebTransitionEnd = React.useCallback(
    (event: { nativeEvent?: { propertyName?: string } } & { propertyName?: string }) => {
      const propertyName = event.nativeEvent?.propertyName ?? event.propertyName
      if (propertyName && propertyName !== 'transform' && propertyName !== 'webkitTransform') return
      finalizePendingChange()
    },
    [finalizePendingChange],
  )

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !readOnly,
        onMoveShouldSetPanResponder: () => !readOnly,
        onPanResponderGrant: () => {
          stopRaf()
          pendingIndexRef.current = null
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
          setWebTransition(0)
        },
      }),
    [data, itemHeight, minOffset, readOnly, setVelocityBucket, swipeDuration, total],
  )

  if (isWeb) {
    return (
      <View
        style={[styles.column, { height: containerHeight }, webOnlyStyles.grab]}
        {...({ onWheel: handleWheel } as unknown as React.ComponentProps<typeof View>)}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.indicator,
            { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
          ]}
          pointerEvents="none"
        />
        <View
          style={[
            webTransform,
            isWeb ? webTransitionStyle : undefined,
          ]}
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

  return (
    <View
      style={[styles.column, { height: containerHeight }]}
      collapsable={false}
    >
      <View
        style={[
          styles.indicator,
          { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
        ]}
        pointerEvents="none"
      />
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={keyExtractor}
        initialScrollIndex={total > 0 ? safeSelectedIndex : undefined}
        initialNumToRender={initialRenderCount}
        maxToRenderPerBatch={maxBatchRenderCount}
        windowSize={windowSize}
        updateCellsBatchingPeriod={batchingPeriod}
        renderItem={renderListItem}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: spacerHeight + index * itemHeight,
          index,
        })}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={effectiveScrollThrottle}
        decelerationRate={decelerationRate}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled
        onStartShouldSetResponderCapture={() => shouldCapture}
        onMoveShouldSetResponderCapture={() => shouldCapture}
        removeClippedSubviews={!isWeb}
        collapsable={false}
        ListHeaderComponent={Spacer}
        ListFooterComponent={Spacer}
        onScrollBeginDrag={() => {
          momentumRef.current = false
          clearDragEndTimer()
        }}
        onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (readOnly) return
          const offsetY = e.nativeEvent.contentOffset.y
          clearDragEndTimer()
          dragEndTimerRef.current = setTimeout(() => {
            if (!momentumRef.current) {
              emitIndexFromOffset(offsetY, true)
            }
          }, 80)
        }}
        onMomentumScrollBegin={() => {
          momentumRef.current = true
          clearDragEndTimer()
        }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          momentumRef.current = false
          clearDragEndTimer()
          emitIndexFromOffset(e.nativeEvent.contentOffset.y, false)
        }}
        scrollEnabled={!readOnly}
      />
    </View>
  )
}

const WheelPicker = React.memo(WheelPickerInner) as typeof WheelPickerInner

const webOnlyStyles = StyleSheet.create({
  grab: ({
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'none',
  } as unknown as ViewStyle),
})

export default WheelPicker
