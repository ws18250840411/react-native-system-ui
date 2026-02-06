import { useCallback, useMemo, useRef, useState } from 'react'
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
const VELOCITY_NORMALIZER = 1000 

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

  const onScrollRef = useRef(onScroll)
  onScrollRef.current = onScroll
  const onScrollBeginDragRef = useRef(onScrollBeginDrag)
  onScrollBeginDragRef.current = onScrollBeginDrag
  const onScrollEndDragRef = useRef(onScrollEndDrag)
  onScrollEndDragRef.current = onScrollEndDrag
  const onMomentumScrollBeginRef = useRef(onMomentumScrollBegin)
  onMomentumScrollBeginRef.current = onMomentumScrollBegin
  const onMomentumScrollEndRef = useRef(onMomentumScrollEnd)
  onMomentumScrollEndRef.current = onMomentumScrollEnd

  const scrollValue = useRef(new Animated.Value(0)).current
  const lastOffsetRef = useRef(0)
  const lastTimestampRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const directionRef = useRef<ScrollDirection>(null)

  const [direction, setDirection] = useState<ScrollDirection>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMomentum, setIsMomentum] = useState(false)

  const updateDirection = useCallback((next: ScrollDirection) => {
    if (directionRef.current !== next) {
      directionRef.current = next
      setDirection(next)
    }
  }, [])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScrollRef.current?.(event)
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
    [axis, updateDirection]
  )

  const animatedScrollHandler = useMemo(() => {
    const mapping =
      axis === 'x'
        ? [{ nativeEvent: { contentOffset: { x: scrollValue } } }]
        : [{ nativeEvent: { contentOffset: { y: scrollValue } } }]

    return Animated.event(mapping as unknown as Parameters<typeof Animated.event>[0], {
      useNativeDriver: false,
      listener: handleScroll,
    })
  }, [axis, handleScroll, scrollValue])

  const handleScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsDragging(true)
      onScrollBeginDragRef.current?.(event)
    },
    []
  )

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsDragging(false)
      onScrollEndDragRef.current?.(event)
    },
    []
  )

  const handleMomentumBegin = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsMomentum(true)
      onMomentumScrollBeginRef.current?.(event)
    },
    []
  )

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsMomentum(false)
      onMomentumScrollEndRef.current?.(event)
    },
    []
  )

  const resetOffset = useCallback(
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

  const getVelocity = useCallback(() => velocityRef.current, [])
  const getCurrentOffset = useCallback(() => lastOffsetRef.current, [])

  const scrollProps = useMemo(
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
