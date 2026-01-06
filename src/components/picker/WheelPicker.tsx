import React from 'react'
import {
  FlatList,
  Platform,
  View,
  StyleSheet,
  PanResponder,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { clamp } from '../../utils/number'
import { indexToOffset, offsetToIndex, shouldMomentum, momentumTarget } from './core'
import styles from './styles'

type WheelPickerRender<T> = (item: T | null, index: number) => React.ReactNode

export type WheelPickerProps<T> = {
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

const WheelPickerInner = <T,>({
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
      const { index } = offsetToIndex(-offsetY, itemHeight, total, data as any)
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
  React.useEffect(() => {
    if (!isWeb) return
    const next = indexToOffset(selectedIndex, itemHeight)
    webOffsetRef.current = next
    setWebOffset(next)
  }, [isWeb, itemHeight, selectedIndex])

  const handleWheel = React.useCallback(
    (event: unknown) => {
      if (!isWeb || readOnly) return
      const delta = (event as any)?.nativeEvent?.deltaY ?? 0
      if (!delta) return
      const direction = delta > 0 ? 1 : -1
      const { index } = offsetToIndex(webOffsetRef.current, itemHeight, total, data as any)
      const nextIndex = clamp(index + direction, 0, total - 1)
      if (nextIndex === selectedIndex) return
      const nextOffset = indexToOffset(nextIndex, itemHeight)
      webOffsetRef.current = nextOffset
      setWebTransition(swipeDuration)
      setWebOffset(nextOffset)
      onChange(nextIndex)
    },
    [data, isWeb, itemHeight, onChange, readOnly, selectedIndex, swipeDuration, total],
  )

  const webTransform = { transform: [{ translateY: webOffset }] }

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => isWeb && !readOnly,
        onMoveShouldSetPanResponder: () => isWeb && !readOnly,
        onPanResponderGrant: () => {
          if (!isWeb) return
          setWebTransition(0)
          startOffsetRef.current = webOffsetRef.current
          startTimeRef.current = Date.now()
        },
        onPanResponderMove: (_, gesture) => {
          if (!isWeb || readOnly) return
          const next = clamp(startOffsetRef.current + gesture.dy, -Math.max(0, total - 1) * itemHeight, 0)
          webOffsetRef.current = next
          setWebOffset(next)
        },
        onPanResponderRelease: (_, gesture) => {
          if (!isWeb || readOnly) return
          const duration = Date.now() - startTimeRef.current
          const distance = gesture.dy
          let target = clamp(startOffsetRef.current + distance, -Math.max(0, total - 1) * itemHeight, 0)
          if (shouldMomentum(distance, duration)) {
            target = momentumTarget(distance, duration, startOffsetRef.current, itemHeight, -Math.max(0, total - 1) * itemHeight)
          }
          const { index, snapOffset } = offsetToIndex(target, itemHeight, total, data as any)
          setWebTransition(swipeDuration)
          webOffsetRef.current = snapOffset
          setWebOffset(snapOffset)
          if (index !== selectedIndex) onChange(index)
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
          style={webTransform}
          {...(isWeb
            ? {
              transitionProperty: webTransition ? 'transform' : 'none',
              transitionDuration: `${webTransition}ms`,
              transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.68, 1)',
            }
            : null) as any}
        >
          <View style={{ height: spacerHeight }} />
          {data.map((item, index) => {
            const content = renderItem(item, index)
            return (
              <View key={(item as any)?.value ?? index} style={[styles.option, { height: itemHeight }]}>
                {content ?? null}
              </View>
            )
          })}
          <View style={{ height: spacerHeight }} />
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.column, { height: containerHeight }]} collapsable={false}>
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
        keyExtractor={(item, idx) => String((item as any)?.value ?? idx)}
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
        decelerationRate={decelerationRate as any}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        nestedScrollEnabled={true}
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
  } as any),
})

export default WheelPicker
