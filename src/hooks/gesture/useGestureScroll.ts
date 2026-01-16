import * as React from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { Animated } from 'react-native'

export type ScrollAxis = 'x' | 'y'
export type ScrollDirection = 'forward' | 'backward' | null

export interface UseGestureScrollOptions {
  axis?: ScrollAxis
  scrollEventThrottle?: number
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export interface UseGestureScrollResult {
  scrollValue: Animated.Value
  scrollProps: {
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    scrollEventThrottle: number
    onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  }
  direction: ScrollDirection
  isDragging: boolean
  isMomentum: boolean
  getVelocity: () => number
  getCurrentOffset: () => number
  resetOffset: (value?: number) => void
}

const DEFAULT_THROTTLE = 16
const VELOCITY_NORMALIZER = 1000 // convert delta/ms to px per second

export const useGestureScroll = (
  options: UseGestureScrollOptions = {}
): UseGestureScrollResult => {
  const {
    axis = 'y',
    scrollEventThrottle = DEFAULT_THROTTLE,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
  } = options

  const scrollValue = React.useRef(new Animated.Value(0)).current
  const lastOffsetRef = React.useRef(0)
  const lastTimestampRef = React.useRef<number | null>(null)
  const velocityRef = React.useRef(0)
  const directionRef = React.useRef<ScrollDirection>(null)

  const [direction, setDirection] = React.useState<ScrollDirection>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isMomentum, setIsMomentum] = React.useState(false)

  const updateDirection = React.useCallback((next: ScrollDirection) => {
    if (directionRef.current !== next) {
      directionRef.current = next
      setDirection(next)
    }
  }, [])

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll?.(event)
      const contentOffset = event.nativeEvent.contentOffset
      const current = axis === 'x' ? contentOffset.x ?? 0 : contentOffset.y ?? 0
      const delta = current - lastOffsetRef.current
      const timestamp = event.timeStamp ?? Date.now()

      if (delta > 0) {
        updateDirection('forward')
      } else if (delta < 0) {
        updateDirection('backward')
      }

      if (lastTimestampRef.current != null) {
        const elapsed = Math.max(timestamp - lastTimestampRef.current, 1)
        velocityRef.current = (delta / elapsed) * VELOCITY_NORMALIZER
      }

      lastTimestampRef.current = timestamp
      lastOffsetRef.current = current
    },
    [axis, onScroll, updateDirection]
  )

  const animatedScrollHandler = React.useMemo(() => {
    const mapping =
      axis === 'x'
        ? [{ nativeEvent: { contentOffset: { x: scrollValue } } }]
        : [{ nativeEvent: { contentOffset: { y: scrollValue } } }]

    return Animated.event(mapping as unknown as Parameters<typeof Animated.event>[0], {
      useNativeDriver: false,
      listener: handleScroll,
    })
  }, [axis, handleScroll, scrollValue])

  const handleScrollBeginDrag = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsDragging(true)
      onScrollBeginDrag?.(event)
    },
    [onScrollBeginDrag]
  )

  const handleScrollEndDrag = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsDragging(false)
      onScrollEndDrag?.(event)
    },
    [onScrollEndDrag]
  )

  const handleMomentumBegin = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsMomentum(true)
      onMomentumScrollBegin?.(event)
    },
    [onMomentumScrollBegin]
  )

  const handleMomentumEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsMomentum(false)
      onMomentumScrollEnd?.(event)
    },
    [onMomentumScrollEnd]
  )

  const resetOffset = React.useCallback(
    (value = 0) => {
      scrollValue.stopAnimation()
      scrollValue.setValue(value)
      lastOffsetRef.current = value
      lastTimestampRef.current = null
      velocityRef.current = 0
      updateDirection(null)
    },
    [scrollValue, updateDirection]
  )

  const getVelocity = React.useCallback(() => velocityRef.current, [])
  const getCurrentOffset = React.useCallback(() => lastOffsetRef.current, [])

  const scrollProps = React.useMemo(
    () => ({
      onScroll: animatedScrollHandler,
      scrollEventThrottle,
      onScrollBeginDrag: handleScrollBeginDrag,
      onScrollEndDrag: handleScrollEndDrag,
      onMomentumScrollBegin: handleMomentumBegin,
      onMomentumScrollEnd: handleMomentumEnd,
    }),
    [
      animatedScrollHandler,
      handleMomentumBegin,
      handleMomentumEnd,
      handleScrollBeginDrag,
      handleScrollEndDrag,
      scrollEventThrottle,
    ]
  )

  return {
    scrollValue,
    scrollProps,
    direction,
    isDragging,
    isMomentum,
    getVelocity,
    getCurrentOffset,
    resetOffset,
  }
}

export default useGestureScroll
