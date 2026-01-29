import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
  cloneElement,
  Children,
  isValidElement,
  type ReactElement,
  type RefAttributes,
  type Ref,
} from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native'
import { clamp } from '../../utils/number'
import { isFiniteNumber } from '../../utils/validate'
import type { SwiperProps, SwiperInstance } from './types'
import SwiperItem from './SwiperItem'
import SwiperPagIndicator from './SwiperPagIndicator'
import {
  FALLBACK_WIDTH,
  FALLBACK_HEIGHT,
  runAfterFrames,
  getInitialSwipeValue,
  getDurationMs,
  getSlideSizePct,
  getTrackOffsetPct,
} from './utils'
import { useSwiperWeb } from './useSwiperWeb'

type SwiperComponent = (<T>(
  props: SwiperProps<T> & RefAttributes<SwiperInstance>
) => ReactElement | null) & { displayName?: string }

const SwiperImpl = <T,>(props: SwiperProps<T>, ref: Ref<SwiperInstance>) => {
  const {
    initialSwipe = 0,
    touchable = true,
    autoplay = false,
    loop = true,
    vertical = false,
    duration = 300,
    enabled = true,
    rubberband = true,
    onChange,
    indicator,
    indicatorProps,
    slideSize = 100,
    trackOffset = 0,
    autoHeight = false,
    stuckAtBoundary = false,
    preventScroll = true,
    style,
    children,
    data,
    renderItem,
    testID,
  } = props

  const initialSwipeValue = getInitialSwipeValue(initialSwipe)
  const durationMs = getDurationMs(duration)
  const slideSizePct = getSlideSizePct(slideSize)
  const trackOffsetPct = getTrackOffsetPct(trackOffset)

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const viewportWidth = windowWidth || FALLBACK_WIDTH
  const viewportHeight = windowHeight || FALLBACK_HEIGHT
  const [containerLayout, setContainerLayout] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  const flatListRef = useRef<FlatList>(null)
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isDraggingRef = useRef(false)
  const isScrollingRef = useRef(false)
  const nativeMomentumRef = useRef(false)
  const prevIndexRef = useRef<number>(initialSwipeValue)
  const currentDisplayIndexRef = useRef<number>(initialSwipeValue)
  const desiredIndexRef = useRef<number>(initialSwipeValue)
  const isWeb = Platform.OS === 'web'
  const nativeQueuedScrollRef = useRef<{ index: number; animated: boolean } | null>(null)
  const nativeScrollSeqRef = useRef(0)
  const nativeScrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToIndexSafe = useCallback((index: number, animated: boolean) => {
    try {
      flatListRef.current?.scrollToIndex({ index, animated })
    } catch {
    }
  }, [])

  const clearNativeScrollEndTimer = useCallback(() => {
    if (nativeScrollEndTimerRef.current) {
      clearTimeout(nativeScrollEndTimerRef.current)
      nativeScrollEndTimerRef.current = null
    }
  }, [])

  const validChildren = useMemo(() => {
    if (children) {
      return Children.toArray(children).filter(
        (child): child is ReactElement => {
          if (!isValidElement(child)) return false
          if (child.type === SwiperItem) return true
          const type = child.type as unknown as { displayName?: string }
          return type.displayName === 'SwiperItem'
        }
      )
    }
    return []
  }, [children])

  const itemsData = useMemo(() => {
    if (data) {
      return data
    }
    if (validChildren.length > 0) {
      return validChildren.map((_, idx) => ({ type: 'child', index: idx }))
    }
    return []
  }, [data, validChildren])

  const count = itemsData.length
  const slideRatio = slideSizePct / 100
  const offsetRatio = trackOffsetPct / 100

  const shouldLoop = loop && count > 1 && slideRatio * (count - 1) >= 1

  const loopData = useMemo(() => {
    if (!shouldLoop || count <= 1) {
      return itemsData
    }
    return [
      ...itemsData.slice(-1),
      ...itemsData,
      ...itemsData.slice(0, 1),
    ]
  }, [shouldLoop, itemsData, count])

  const displayData = shouldLoop ? loopData : itemsData
  const displayCount = displayData.length

  const getDisplayIndex = useCallback(
    (index: number): number => {
      if (!shouldLoop) return index
      if (index === 0) return count - 1
      if (index === displayCount - 1) return 0
      return index - 1
    },
    [shouldLoop, count, displayCount]
  )

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setContainerLayout((prev) => prev.width === width && prev.height === height ? prev : { width, height })
  }, [])

  const containerWidth = containerLayout.width || viewportWidth
  const containerHeight = containerLayout.height || viewportHeight

  const crossAxisMeasured = vertical ? containerLayout.width : containerLayout.height
  const crossAxisSize = crossAxisMeasured > 0 ? crossAxisMeasured : undefined
  const slideSizeValue = (vertical ? containerHeight : containerWidth) * slideRatio
  const itemSizeStyle = useMemo(() => {
    const style: Record<string, number> = { [vertical ? 'height' : 'width']: slideSizeValue }
    if (crossAxisSize != null && !(autoHeight && !vertical)) {
      style[vertical ? 'width' : 'height'] = crossAxisSize
    }
    return style
  }, [vertical, slideSizeValue, crossAxisSize, autoHeight])
  const mainAxisMeasured = vertical ? containerLayout.height : containerLayout.width
  const trackOffsetPx = mainAxisMeasured > 0 ? mainAxisMeasured * offsetRatio : 0

  const nativeTrackContentPaddingStyle = !trackOffsetPx
    ? undefined
    : vertical
      ? { paddingTop: trackOffsetPx, paddingBottom: trackOffsetPx }
      : { paddingLeft: trackOffsetPx, paddingRight: trackOffsetPx }

  const stuckAtBoundaryEnabled = !!stuckAtBoundary && !shouldLoop && count > 1 && slideRatio < 1
  const mainAxisSize = vertical ? containerHeight : containerWidth
  const nonLoopMinOffset = stuckAtBoundaryEnabled ? trackOffsetPx : 0
  const nonLoopMaxOffset = stuckAtBoundaryEnabled
    ? Math.max(nonLoopMinOffset, trackOffsetPx + count * slideSizeValue - mainAxisSize, 0)
    : Math.max(0, (count - 1) * slideSizeValue)
  const nonLoopSnapOffsets = useMemo(() => {
    if (!stuckAtBoundaryEnabled || count <= 1) return null
    const offsets = new Array<number>(count)
    for (let i = 0; i < count; i += 1) offsets[i] = i === 0 ? nonLoopMinOffset : i === count - 1 ? nonLoopMaxOffset : slideSizeValue * i
    return offsets
  }, [count, nonLoopMaxOffset, nonLoopMinOffset, slideSizeValue, stuckAtBoundaryEnabled])

  const getInitialIndex = useCallback(() => {
    const initial = clamp(initialSwipeValue, 0, count - 1)
    return shouldLoop ? initial + 1 : initial
  }, [initialSwipeValue, count, shouldLoop])

  const [current, setCurrent] = useState(() => getInitialIndex())
  const [indicatorIndex, setIndicatorIndex] = useState(() => getDisplayIndex(getInitialIndex()))
  const setCurrentSafe = useCallback((next: number) => {
    setCurrent((prev) => (prev === next ? prev : next))
  }, [])
  const [enabledState, setEnabledState] = useState(enabled)
  const autoHeightEnabled = autoHeight && !vertical
  const [autoHeightValue, setAutoHeightValue] = useState<number | undefined>(undefined)
  const measuredHeightsRef = useRef<Record<number, number>>({})

  const swipeToRef = useRef<(index: number, animated?: boolean) => void>(() => { })

  const onDragStartRef = useRef<() => void>(() => { })
  const onDragEndRef = useRef<() => void>(() => { })

  const {
    webOffsetRef,
    webTranslateXAnim,
    webTranslateYAnim,
    webTrackTransform,
    panResponder,
    stopWebSnapAnim,
    cancelWebRaf,
    webSnapAnimRef,
  } = useSwiperWeb({
    isWeb,
    enabledState,
    touchable,
    vertical,
    count,
    shouldLoop,
    displayCount,
    slideSizeValue,
    nonLoopMinOffset,
    nonLoopMaxOffset,
    durationMs,
    preventScroll,
    trackOffsetPx,
    swipeToRef,
    onDragStart: () => onDragStartRef.current(),
    onDragEnd: () => onDragEndRef.current(),
  })

  useEffect(() => {
    return () => {
      cancelWebRaf()
      stopWebSnapAnim()
      clearNativeScrollEndTimer()
    }
  }, [cancelWebRaf, stopWebSnapAnim, clearNativeScrollEndTimer])

  const finishNativeScroll = useCallback(() => {
    clearNativeScrollEndTimer()
    isScrollingRef.current = false
    nativeMomentumRef.current = false
    const queued = nativeQueuedScrollRef.current
    if (queued && flatListRef.current) {
      nativeQueuedScrollRef.current = null
      const nextRealIndex = getDisplayIndex(queued.index)
      runAfterFrames(1, () => {
        swipeToRef.current(nextRealIndex, queued.animated)
      })
    }
  }, [clearNativeScrollEndTimer, getDisplayIndex])

  const scheduleNativeScrollFallback = useCallback(() => {
    clearNativeScrollEndTimer()
    const seq = nativeScrollSeqRef.current + 1
    nativeScrollSeqRef.current = seq
    const timeout = Math.max(700, durationMs + 500)
    nativeScrollEndTimerRef.current = setTimeout(() => {
      if (nativeScrollSeqRef.current !== seq) return
      if (isDraggingRef.current) return
      if (!isScrollingRef.current) return
      finishNativeScroll()
    }, timeout)
  }, [clearNativeScrollEndTimer, durationMs, finishNativeScroll])


  useEffect(() => {
    setEnabledState(enabled)
  }, [enabled])

  const currentRef = useRef(current)
  useEffect(() => {
    currentRef.current = current
    desiredIndexRef.current = getDisplayIndex(current)
  }, [current, getDisplayIndex])

  const handleItemLayout = useCallback(
    (displayIndex: number, e: LayoutChangeEvent) => {
      if (!autoHeightEnabled) return
      const height = e.nativeEvent.layout.height
      if (!height) return

      const realIndex = getDisplayIndex(displayIndex)
      const prevHeight = measuredHeightsRef.current[realIndex]
      if (prevHeight != null && Math.abs(prevHeight - height) < 0.5) return

      measuredHeightsRef.current[realIndex] = height
      const activeRealIndex = getDisplayIndex(currentRef.current)
      if (realIndex === activeRealIndex) {
        setAutoHeightValue(height)
      }
    },
    [autoHeightEnabled, getDisplayIndex]
  )

  useEffect(() => {
    if (!autoHeightEnabled) return
    measuredHeightsRef.current = {}
    setAutoHeightValue(undefined)
  }, [autoHeightEnabled, slideSizeValue, count])

  useEffect(() => {
    if (!autoHeightEnabled) return
    const activeRealIndex = getDisplayIndex(current)
    const height = measuredHeightsRef.current[activeRealIndex]
    if (height == null) return
    setAutoHeightValue(height)
  }, [autoHeightEnabled, current, getDisplayIndex])

  const containerAutoHeightStyle = autoHeightEnabled && autoHeightValue != null ? { height: autoHeightValue } : undefined

  const nativeLastAlignedMainAxisRef = useRef(0)
  useEffect(() => {
    if (isWeb) return
    if (count === 0) return
    if (!flatListRef.current) return
    if (isDraggingRef.current || isScrollingRef.current) return

    const mainAxisMeasured = vertical ? containerLayout.height : containerLayout.width
    if (mainAxisMeasured <= 0) return

    const lastAligned = nativeLastAlignedMainAxisRef.current
    if (lastAligned > 0 && Math.abs(mainAxisMeasured - lastAligned) < 0.5) return

    nativeLastAlignedMainAxisRef.current = mainAxisMeasured
    runAfterFrames(2, () => {
      scrollToIndexSafe(currentRef.current, false)
    })
  }, [isWeb, count, vertical, containerLayout.height, containerLayout.width])

  const swipeTo = useCallback(
    (index: number, animated = true) => {
      if (count === 0) return

      const targetRealIndex = clamp(index, 0, count - 1)
      const fromRealIndex = desiredIndexRef.current
      desiredIndexRef.current = targetRealIndex
      const currentIndex = currentRef.current

      let targetIndex: number
      let needsJump = false
      let jumpOffset: number | null = null
      let jumpDisplayIndex: number | null = null

      if (shouldLoop) {
        if (fromRealIndex === count - 1 && targetRealIndex === 0) {
          targetIndex = displayCount - 1
          needsJump = true
          jumpOffset = -1 * slideSizeValue
          jumpDisplayIndex = 1
        } else if (fromRealIndex === 0 && targetRealIndex === count - 1) {
          targetIndex = 0
          needsJump = true
          jumpOffset = -count * slideSizeValue
          jumpDisplayIndex = count
        } else {
          targetIndex = targetRealIndex + 1
        }
      } else {
        targetIndex = targetRealIndex
      }

      if (isWeb) {
        if (!needsJump && targetIndex === currentIndex) {
          if (autoplay && enabledState) startAutoplay()
          return
        }
        stopWebSnapAnim()
        const offset = shouldLoop
          ? -targetIndex * slideSizeValue
          : -1 * (nonLoopSnapOffsets?.[targetIndex] ?? slideSizeValue * targetIndex)
        webOffsetRef.current = offset

        if (needsJump) {
          if (animated) {
            const animValue = vertical ? webTranslateYAnim : webTranslateXAnim
            const anim = Animated.timing(animValue, {
              toValue: offset,
              duration: durationMs,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            })
            webSnapAnimRef.current = anim
            anim.start(({ finished }) => {
              webSnapAnimRef.current = null
              if (autoplay && enabledState) startAutoplay()
              if (!finished || jumpOffset === null || jumpDisplayIndex === null) return

              webOffsetRef.current = jumpOffset
              if (vertical) {
                webTranslateYAnim.setValue(jumpOffset)
              } else {
                webTranslateXAnim.setValue(jumpOffset)
              }
              setCurrentSafe(jumpDisplayIndex)
            })
            setCurrentSafe(targetIndex)
          } else {
            if (vertical) {
              webTranslateYAnim.setValue(jumpOffset!)
            } else {
              webTranslateXAnim.setValue(jumpOffset!)
            }
            webOffsetRef.current = jumpOffset!
            setCurrentSafe(jumpDisplayIndex!)
            if (autoplay && enabledState) startAutoplay()
          }
        } else {
          const animValue = vertical ? webTranslateYAnim : webTranslateXAnim
          if (animated) {
            const anim = Animated.timing(animValue, {
              toValue: offset,
              duration: durationMs,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            })
            webSnapAnimRef.current = anim
            anim.start(() => {
              webSnapAnimRef.current = null
              if (autoplay && enabledState) startAutoplay()
            })
          } else {
            animValue.setValue(offset)
            if (autoplay && enabledState) startAutoplay()
          }
          setCurrentSafe(targetIndex)
        }
      } else if (flatListRef.current) {
        if (!needsJump && targetIndex === currentIndex) {
          finishNativeScroll()
          if (autoplay && enabledState) startAutoplay()
          return
        }
        if (isDraggingRef.current && animated) {
          nativeQueuedScrollRef.current = { index: targetIndex, animated }
          return
        }
        if (isScrollingRef.current && animated) {
          nativeQueuedScrollRef.current = { index: targetIndex, animated }
          scheduleNativeScrollFallback()
          scrollToIndexSafe(targetIndex, true)
          return
        }
        isScrollingRef.current = true
        if (animated) {
          scheduleNativeScrollFallback()
        } else {
          clearNativeScrollEndTimer()
        }
        scrollToIndexSafe(targetIndex, animated)
        if (!animated) {
          setCurrentSafe(targetIndex)
          if (autoplay && enabledState) startAutoplay()
        }
        if (needsJump && jumpDisplayIndex != null && !animated) {
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: jumpDisplayIndex!, animated: false })
            setCurrentSafe(jumpDisplayIndex!)
          })
        }

        if (!animated) {
          runAfterFrames(1, () => {
            finishNativeScroll()
          })
        }
      }
    },
    [
      count,
      shouldLoop,
      isWeb,
      slideSizeValue,
      vertical,
      webTranslateXAnim,
      webTranslateYAnim,
      nonLoopSnapOffsets,
      displayCount,
      stopWebSnapAnim,
      setCurrentSafe,
      durationMs,
      clearNativeScrollEndTimer,
      finishNativeScroll,
      scheduleNativeScrollFallback,
    ]
  )

  useEffect(() => {
    swipeToRef.current = swipeTo
  }, [swipeTo])

  const swipeNext = useCallback(() => {
    if (count === 0) return
    const baseIndex = desiredIndexRef.current
    swipeTo(baseIndex === count - 1 ? 0 : baseIndex + 1)
  }, [count, swipeTo])
  const swipePrev = useCallback(() => {
    if (count === 0) return
    const baseIndex = desiredIndexRef.current
    swipeTo(baseIndex === 0 ? count - 1 : baseIndex - 1)
  }, [count, swipeTo])

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  const startAutoplay = useCallback((delay?: number) => {
    if (!autoplay || count <= 1 || !enabledState) return
    if (isDraggingRef.current || isScrollingRef.current) return
    stopAutoplay()
    const interval = (isFiniteNumber(autoplay) && Math.max(0, autoplay)) || 5000
    autoplayTimerRef.current = setTimeout(() => {
      if (isDraggingRef.current || isScrollingRef.current) return
      swipeNext()
      startAutoplay()
    }, delay ?? interval)
  }, [autoplay, count, enabledState, swipeNext, stopAutoplay])

  const handleNativeScrollEndByOffset = useCallback(
    (offset: number) => {
      if (count === 0) return

      clearNativeScrollEndTimer()
      isScrollingRef.current = false
      nativeMomentumRef.current = false

      if (!slideSizeValue) return

      let index = Math.round(offset / slideSizeValue)

      if (shouldLoop) {
        if (index === 0) {
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: count, animated: false })
          })
          index = count
        } else if (index === displayCount - 1) {
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: 1, animated: false })
          })
          index = 1
        }
      } else {
        index = clamp(index, 0, count - 1)
      }

      setCurrentSafe(index)
      desiredIndexRef.current = getDisplayIndex(index)

      const queued = nativeQueuedScrollRef.current
      if (queued && flatListRef.current) {
        nativeQueuedScrollRef.current = null
        const nextDisplayIndex = getDisplayIndex(queued.index)
        runAfterFrames(1, () => {
          swipeTo(nextDisplayIndex, queued.animated)
        })
      } else if (autoplay && enabledState) {
        startAutoplay()
      }
    },
    [clearNativeScrollEndTimer, count, displayCount, getDisplayIndex, setCurrentSafe, shouldLoop, slideSizeValue, swipeTo, autoplay, enabledState, startAutoplay]
  )

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (count === 0) return
      const { contentOffset } = event.nativeEvent
      handleNativeScrollEndByOffset(vertical ? contentOffset.y : contentOffset.x)
    },
    [count, handleNativeScrollEndByOffset, vertical]
  )

  const handleScrollBeginDrag = () => {
    isDraggingRef.current = true
    isScrollingRef.current = true
    stopAutoplay()
  }
  const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDraggingRef.current = false
    const { contentOffset } = event.nativeEvent
    runAfterFrames(1, () => {
      if (nativeMomentumRef.current) return
      handleNativeScrollEndByOffset(vertical ? contentOffset.y : contentOffset.x)
    })
  }
  const handleMomentumScrollBegin = () => {
    nativeMomentumRef.current = true
    isScrollingRef.current = true
  }

  const indicatorRafIdRef = useRef<number | null>(null)
  const indicatorPendingRef = useRef<number | null>(null)
  const canUseRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'

  const flushIndicator = () => {
    const next = indicatorPendingRef.current
    if (next == null) return
    indicatorPendingRef.current = null
    setIndicatorIndex((prev) => (prev === next ? prev : next))
  }

  const scheduleIndicator = (next: number) => {
    indicatorPendingRef.current = next
    if (indicatorRafIdRef.current != null) return
    if (canUseRaf) {
      indicatorRafIdRef.current = requestAnimationFrame(() => {
        indicatorRafIdRef.current = null
        flushIndicator()
      })
      return
    }
    indicatorRafIdRef.current = setTimeout(() => {
      indicatorRafIdRef.current = null
      flushIndicator()
    }, 16) as unknown as number
  }

  useEffect(() => {
    setIndicatorIndex((prev) => {
      const next = getDisplayIndex(current)
      return prev === next ? prev : next
    })
  }, [current, getDisplayIndex])

  useEffect(() => {
    return () => {
      if (indicatorRafIdRef.current != null) {
        if (canUseRaf) {
          cancelAnimationFrame(indicatorRafIdRef.current)
        } else {
          clearTimeout(indicatorRafIdRef.current)
        }
        indicatorRafIdRef.current = null
      }
      indicatorPendingRef.current = null
    }
  }, [])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isWeb || count <= 1 || !slideSizeValue) return
      const { contentOffset } = event.nativeEvent
      const offset = vertical ? contentOffset.y : contentOffset.x
      const displayIndex = shouldLoop
        ? clamp(Math.round(offset / slideSizeValue), 0, displayCount - 1)
        : clamp(Math.round(offset / slideSizeValue), 0, count - 1)
      scheduleIndicator(getDisplayIndex(displayIndex))
    },
    [count, displayCount, getDisplayIndex, isWeb, scheduleIndicator, shouldLoop, slideSizeValue, vertical]
  )

  useEffect(() => {
    onDragStartRef.current = () => {
      isDraggingRef.current = true
      stopAutoplay()
    }
    onDragEndRef.current = () => {
      isDraggingRef.current = false
    }
  }, [stopAutoplay])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  useImperativeHandle(
    ref,
    () => ({
      activeIndex: getDisplayIndex(current),
      swipeTo: (index: number, animated = true) => {
        swipeTo(index, animated)
      },
      swipeNext,
      swipePrev,
      enable: () => {
        setEnabledState(true)
      },
      disable: () => {
        setEnabledState(false)
      },
      getCurrentIndex: () => getDisplayIndex(current),
      getPrevIndex: () => prevIndexRef.current,
      goToFirstIndex: () => {
        swipeTo(0)
      },
      goToLastIndex: () => {
        swipeTo(count - 1)
      },
    }),
    [current, count, getDisplayIndex, swipeTo, swipeNext, swipePrev]
  )

  const renderIndicator = () => {
    if (indicator === false || count <= 1) return null
    if (typeof indicator === 'function') return indicator(count, indicatorIndex)
    return <SwiperPagIndicator {...indicatorProps} total={count} current={indicatorIndex} vertical={vertical} />
  }

  useEffect(() => {
    if (!onChange || count <= 0) return
    const nextDisplay = getDisplayIndex(current)
    if (nextDisplay === currentDisplayIndexRef.current) return
    prevIndexRef.current = currentDisplayIndexRef.current
    currentDisplayIndexRef.current = nextDisplay
    onChange(nextDisplay)
  }, [current, onChange, count, getDisplayIndex])

  const renderChildItem = useCallback(({ item, index }: { item: unknown; index: number }) => {
    const marker = item as { type?: unknown; index?: unknown }
    if (marker.type !== 'child') return null
    const childIndex = typeof marker.index === 'number' ? marker.index : -1
    const child = validChildren[childIndex]
    if (!child) return null
    if (!autoHeightEnabled) {
      const element = child as ReactElement<{ style?: unknown }>
      return cloneElement(element, { style: [element.props.style, itemSizeStyle] })
    }
    const element = child as ReactElement<{ style?: unknown }>
    return (
      <View style={itemSizeStyle} onLayout={(e) => handleItemLayout(index, e)} collapsable={false}>
        {cloneElement(element, { style: [element.props.style, styles.autoHeightChild] })}
      </View>
    )
  }, [validChildren, itemSizeStyle, autoHeightEnabled, handleItemLayout])

  const renderDataItem = useCallback((info: unknown) => {
    if (!renderItem) return null
    const item = renderItem(info as Parameters<NonNullable<typeof renderItem>>[0])
    if (!item) return null
    const itemIndex = (info as { index: number }).index
    return (
      <View style={itemSizeStyle} onLayout={autoHeightEnabled ? (e) => handleItemLayout(itemIndex, e) : undefined} collapsable={false}>
        {item}
      </View>
    )
  }, [renderItem, itemSizeStyle, autoHeightEnabled, handleItemLayout])

  const getItemKey = useCallback((_item: unknown, index: number) => {
    if (shouldLoop && count > 1) {
      if (index === 0) return `loop-last-${count - 1}`
      if (index === displayCount - 1) return `loop-first-0`
      return `item-${index - 1}`
    }
    return `item-${index}`
  }, [shouldLoop, count, displayCount])

  const getItemLayout = useCallback((_: unknown, index: number) => {
    const offset = !shouldLoop && nonLoopSnapOffsets ? nonLoopSnapOffsets[index] ?? slideSizeValue * index : slideSizeValue * index
    return { length: slideSizeValue, offset, index }
  }, [nonLoopSnapOffsets, shouldLoop, slideSizeValue])

  const snapToOffsets = useMemo(() => {
    if (slideSizePct === 100 && trackOffsetPct === 0) return undefined
    if (!shouldLoop && nonLoopSnapOffsets) return nonLoopSnapOffsets
    return displayData.map((_, index) => slideSizeValue * index)
  }, [displayData, nonLoopSnapOffsets, shouldLoop, slideSizePct, slideSizeValue, trackOffsetPct])

  useEffect(() => {
    if (!isWeb) return
    const initialIndex = getInitialIndex()
    const initialOffset = shouldLoop ? -initialIndex * slideSizeValue : -1 * (nonLoopSnapOffsets?.[initialIndex] ?? slideSizeValue * initialIndex)
    webOffsetRef.current = initialOffset
    if (vertical) webTranslateYAnim.setValue(initialOffset)
    else webTranslateXAnim.setValue(initialOffset)
  }, [isWeb, getInitialIndex, nonLoopSnapOffsets, shouldLoop, slideSizeValue, vertical, webTranslateXAnim, webTranslateYAnim])

  useEffect(() => {
    if (!isWeb || count === 0) return
    const offset = shouldLoop ? -currentRef.current * slideSizeValue : -1 * (nonLoopSnapOffsets?.[currentRef.current] ?? slideSizeValue * currentRef.current)
    webOffsetRef.current = offset
    if (vertical) webTranslateYAnim.setValue(offset)
    else webTranslateXAnim.setValue(offset)
  }, [isWeb, count, nonLoopSnapOffsets, shouldLoop, slideSizeValue, vertical, webTranslateXAnim, webTranslateYAnim])

  if (count === 0) {
    return null
  }

  if (isWeb) {
    return (
      <View
        style={[styles.container, webContainerStyle, containerAutoHeightStyle, style]}
        testID={testID}
        onLayout={handleContainerLayout}
      >
        <View style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
          <Animated.View
            {...(panResponder?.panHandlers || {})}
            style={[
              {
                flexDirection: vertical ? 'column' : 'row',
                width: vertical ? '100%' : displayCount * slideSizeValue,
                height: vertical ? displayCount * slideSizeValue : '100%',
                transform: webTrackTransform,
              },
            ]}
          >
            {displayData.map((item, index) => (
              <View key={getItemKey(item, index)} style={[itemSizeStyle, styles.webSlideWrapper]}>
                {data && renderDataItem({ item, index }) || renderChildItem({ item, index })}
              </View>
            ))}
          </Animated.View>
        </View>
        <View pointerEvents="none" style={styles.indicatorOverlay}>
          {renderIndicator()}
        </View>
      </View>
    )
  }

  return (
    <View
      style={[styles.container, containerAutoHeightStyle, style]}
      testID={testID}
      onLayout={handleContainerLayout}
      collapsable={false}
    >
      <FlatList
        ref={flatListRef}
        data={displayData}
        keyExtractor={getItemKey}
        renderItem={data ? renderDataItem : renderChildItem}
        getItemLayout={getItemLayout}
        horizontal={!vertical}
        removeClippedSubviews={!isWeb}
        initialNumToRender={Math.min(displayCount, 3)}
        maxToRenderPerBatch={3}
        windowSize={5}
        updateCellsBatchingPeriod={16}
        snapToInterval={slideSizePct === 100 && trackOffsetPct === 0 && slideSizeValue || undefined}
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEnabled={enabledState && touchable && count > 1}
        pagingEnabled={false}
        nestedScrollEnabled={preventScroll === false}
        directionalLockEnabled={preventScroll !== false}
        collapsable={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={rubberband && !shouldLoop}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={handleScroll}
        initialScrollIndex={getInitialIndex()}
        onScrollToIndexFailed={(info) => {
          nativeMomentumRef.current = false
          isScrollingRef.current = false
          runAfterFrames(2, () => {
            try {
              isScrollingRef.current = true
              scrollToIndexSafe(info.index, false)
              setCurrentSafe(info.index)
            } finally {
              isScrollingRef.current = false
              const queued = nativeQueuedScrollRef.current
              if (queued && flatListRef.current) {
                nativeQueuedScrollRef.current = null
                const nextDisplayIndex = getDisplayIndex(queued.index)
                runAfterFrames(1, () => {
                  swipeTo(nextDisplayIndex, queued.animated)
                })
              }
            }
          })
        }}
        style={isWeb && ({ cursor: 'grab' } as unknown as ViewStyle) || undefined}
        contentContainerStyle={[
          isWeb && ({ userSelect: 'none' } as unknown as ViewStyle) || undefined,
          !isWeb && nativeTrackContentPaddingStyle || undefined,
        ]}
        testID={`${testID}-flatlist`}
      />
      <View pointerEvents="none" style={styles.indicatorOverlay}>
        {renderIndicator()}
      </View>
    </View>
  )
}

const Swiper = forwardRef(SwiperImpl) as unknown as SwiperComponent

Swiper.displayName = 'Swiper'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  autoHeightChild: {
    flex: 0,
    width: '100%',
  },
  webSlideWrapper: {
    flexShrink: 0,
    flexGrow: 0,
  },
  indicatorOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
  },
})

const webContainerStyle = Platform.OS === 'web'
  ? ({
    cursor: 'grab',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  } as unknown as ViewStyle)
  : undefined

export default Swiper
