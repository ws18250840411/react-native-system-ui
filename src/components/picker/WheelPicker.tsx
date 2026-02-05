import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FlatList,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  PanResponder,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native'

import { clamp } from '../../utils'
import type { PickerOption } from './types'
import { findEnabledIndex } from './utils'

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

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 3,
  },
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
    <View style={[styles.option, { height: itemHeight }]}>
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

export type WheelPickerProps<T extends PickerOption = PickerOption> = {
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
  const indicatorStyle = useMemo(
    () => [styles.indicator, { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor }],
    [itemHeight, visibleRest, indicatorColor]
  )

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

  const webTransform = useMemo(() => ({ transform: [{ translateY: webOffset }] }), [webOffset])
  const webTransitionStyle: ViewStyle | undefined = useMemo(
    () =>
      webTransition
        ? ({
          transitionProperty: 'transform',
          transitionDuration: `${webTransition}ms`,
          transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)',
          willChange: 'transform',
        } as unknown as ViewStyle)
        : undefined,
    [webTransition]
  )
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
        style={[styles.column, { height: containerHeight }, webOnlyStyles.grab]}
        {...({ onWheel: handleWheel } as unknown as React.ComponentProps<typeof View>)}
        {...panResponder.panHandlers}
      >
        <View style={indicatorStyle} pointerEvents="none" />
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

  const contentContainerStyle = useMemo(
    () => ({
      paddingVertical: spacerHeight,
    }),
    [spacerHeight]
  )

  return (
    <View
      style={[styles.column, { height: containerHeight }]}
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

const webOnlyStyles = StyleSheet.create({
  grab: ({
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'none',
  } as unknown as ViewStyle),
})

export default WheelPicker
