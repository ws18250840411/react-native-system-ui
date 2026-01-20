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

const WheelPickerInner = <T extends PickerOption,>({
  data,
  selectedIndex,
  onChange,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = 'fast',
  scrollEventThrottle = 16,
  swipeDuration = 300,
}: WheelPickerProps<T>) => {
  const isWeb = Platform.OS === 'web'
  const listRef = React.useRef<FlatList<T>>(null)
  const spacerHeight = visibleRest * itemHeight
  const total = data.length
  const containerHeight = itemHeight * (visibleRest * 2 + 1)

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
    (offsetY: number) => {
      if (readOnly) return
      const { index } = offsetToIndex(-offsetY, itemHeight, total, data)
      if (index !== selectedIndex) onChange(index)
    },
    [data, itemHeight, onChange, readOnly, selectedIndex, total],
  )

  React.useEffect(() => {
    const offset = Math.max(selectedIndex, 0) * itemHeight
    listRef.current?.scrollToOffset({ offset, animated: false })
  }, [itemHeight, selectedIndex])

  const [webOffset, setWebOffset] = React.useState(() => indexToOffset(selectedIndex, itemHeight))
  const webOffsetRef = React.useRef(webOffset)
  const startOffsetRef = React.useRef(0)
  const startTimeRef = React.useRef(0)
  const [webTransition, setWebTransition] = React.useState(0)
  const pendingIndexRef = React.useRef<number | null>(null)
  const pendingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = React.useRef<number | null>(null)

  const stopRaf = React.useCallback(() => {
    if (rafIdRef.current != null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const clearPendingTimer = React.useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
    }
  }, [])

  React.useEffect(() => () => clearPendingTimer(), [clearPendingTimer])
  React.useEffect(() => () => stopRaf(), [stopRaf])
  React.useEffect(() => {
    if (!isWeb) return
    clearPendingTimer()
    pendingIndexRef.current = null
    const next = indexToOffset(selectedIndex, itemHeight)
    webOffsetRef.current = next
    setWebOffset(next)
  }, [clearPendingTimer, isWeb, itemHeight, selectedIndex])

  const finalizePendingChange = React.useCallback(() => {
    if (readOnly) return
    const nextIndex = pendingIndexRef.current
    if (nextIndex == null) return
    pendingIndexRef.current = null
    clearPendingTimer()
    if (nextIndex !== selectedIndex) onChange(nextIndex)
  }, [clearPendingTimer, onChange, readOnly, selectedIndex])

  const startWebSnap = React.useCallback(
    (targetIndex: number) => {
      if (readOnly) return
      const clampedIndex = clamp(targetIndex, 0, Math.max(0, total - 1))
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
    [clearPendingTimer, finalizePendingChange, itemHeight, readOnly, swipeDuration, total],
  )

  const handleWheel = React.useCallback(
    (event: { nativeEvent?: { deltaY?: number } }) => {
      if (!isWeb || readOnly) return
      const delta = event.nativeEvent?.deltaY ?? 0
      if (!delta) return
      const direction = delta > 0 ? 1 : -1
      const { index } = offsetToIndex(webOffsetRef.current, itemHeight, total, data)
      const nextIndex = clamp(index + direction, 0, total - 1)
      if (nextIndex === selectedIndex) return
      startWebSnap(nextIndex)
    },
    [data, isWeb, itemHeight, readOnly, selectedIndex, startWebSnap, total],
  )

  const webTransform = { transform: [{ translateY: webOffset }] }
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
        onStartShouldSetPanResponder: () => isWeb && !readOnly,
        onMoveShouldSetPanResponder: () => isWeb && !readOnly,
        onPanResponderGrant: () => {
          if (!isWeb) return
          stopRaf()
          pendingIndexRef.current = null
          setWebTransition(0)
          startOffsetRef.current = webOffsetRef.current
          startTimeRef.current = Date.now()
        },
        onPanResponderMove: (_, gesture) => {
          if (!isWeb || readOnly) return
          const next = clamp(
            startOffsetRef.current + gesture.dy,
            -Math.max(0, total - 1) * itemHeight,
            0,
          )
          webOffsetRef.current = next
          if (typeof requestAnimationFrame !== 'undefined') {
            if (rafIdRef.current != null) {
              cancelAnimationFrame(rafIdRef.current)
              rafIdRef.current = null
            }
            rafIdRef.current = requestAnimationFrame(() => {
              rafIdRef.current = null
              setWebOffset(webOffsetRef.current)
            })
          } else {
            setWebOffset(next)
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (!isWeb || readOnly) return
          const duration = Date.now() - startTimeRef.current
          const distance = gesture.dy
          let target = clamp(startOffsetRef.current + distance, -Math.max(0, total - 1) * itemHeight, 0)
          if (shouldMomentum(distance, duration)) {
            target = momentumTarget(distance, duration, startOffsetRef.current, itemHeight, -Math.max(0, total - 1) * itemHeight)
          }
          const { index } = offsetToIndex(target, itemHeight, total, data)
          startWebSnap(index)
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderTerminate: () => {
          if (!isWeb) return
          setWebTransition(0)
        },
      }),
    [data, isWeb, itemHeight, onChange, readOnly, selectedIndex, swipeDuration, total],
  )

  if (isWeb) {
    return (
      <View
        style={[styles.column, { height: containerHeight }, webOnlyStyles.grab]}
        // @ts-expect-error web only
        onWheel={handleWheel}
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
            isWeb
              ? ({
                transitionProperty: webTransition ? 'transform' : 'none',
                transitionDuration: `${webTransition}ms`,
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)',
                willChange: 'transform',
              } as unknown as ViewStyle)
              : undefined,
          ]}
          {...({ onTransitionEnd: handleWebTransitionEnd } as unknown as React.ComponentProps<typeof View>)}
        >
          <View style={{ height: spacerHeight }} />
          {data.map((item, index) => {
            const content = renderItem(item, index)
            return (
              <View key={`${index}-${String(item.value ?? '')}`} style={[styles.option, { height: itemHeight }]}>
                {content ?? null}
              </View>
            )
          })}
          <View style={{ height: spacerHeight }} />
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
        keyExtractor={(item, idx) => `${idx}-${String(item.value ?? '')}`}
        renderItem={({ item, index }) => {
          const content = renderItem(item, index)
          return (
            <View style={[styles.option, { height: itemHeight }]}>
              {content ?? null}
            </View>
          )
        }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: spacerHeight + index * itemHeight,
          index,
        })}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={scrollEventThrottle}
        decelerationRate={decelerationRate}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        nestedScrollEnabled={false}
        onStartShouldSetResponderCapture={() => shouldCapture}
        onMoveShouldSetResponderCapture={() => shouldCapture}
        removeClippedSubviews={!isWeb}
        collapsable={false}
        ListHeaderComponent={<View style={{ height: spacerHeight }} />}
        ListFooterComponent={<View style={{ height: spacerHeight }} />}
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
              emitIndexFromOffset(offsetY)
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
          emitIndexFromOffset(e.nativeEvent.contentOffset.y)
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
