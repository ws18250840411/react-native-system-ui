import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
} from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  PanResponder,
  Animated,
  Easing,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type LayoutChangeEvent,
} from 'react-native'
import { clamp } from '../../utils/number'
import { isNumber } from '../../utils/validate'
import type { SwiperProps, SwiperInstance } from './types'
import SwiperItem from './SwiperItem'
import SwiperPagIndicator from './SwiperPagIndicator'

const FALLBACK_WIDTH = 375
const FALLBACK_HEIGHT = 667

const runAfterFrames = (frames: number, fn: () => void) => {
  let left = Math.max(1, frames)
  const step = () => {
    left -= 1
    if (left <= 0) {
      fn()
      return
    }
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const Swiper = React.forwardRef<SwiperInstance, SwiperProps<any>>((props, ref) => {
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
    style,
    children,
    data,
    renderItem,
    testID,
  } = props

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
  const prevIndexRef = useRef<number>(initialSwipe)
  const currentDisplayIndexRef = useRef<number>(initialSwipe)
  const isWeb = Platform.OS === 'web'
  const nativeQueuedScrollRef = useRef<{ index: number; animated: boolean } | null>(null)

  const validChildren = useMemo(() => {
    if (children) {
      return React.Children.toArray(children).filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && child.type === SwiperItem
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
  const slideRatio = slideSize / 100
  const offsetRatio = trackOffset / 100

  const shouldLoop = loop && count > 1 && slideRatio * (count - 1) >= 1

  const loopData = useMemo(() => {
    if (!shouldLoop || count <= 1) {
      return itemsData
    }
    return [
      ...itemsData.slice(-1), // 末尾的复制
      ...itemsData, // 原始数据
      ...itemsData.slice(0, 1), // 开头的复制
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

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setContainerLayout((prev) => {
      if (prev.width === width && prev.height === height) return prev
      return { width, height }
    })
  }

  const containerWidth = containerLayout.width || viewportWidth
  const containerHeight = containerLayout.height || viewportHeight

  const crossAxisMeasured = vertical ? containerLayout.width : containerLayout.height
  const crossAxisSize = crossAxisMeasured > 0 ? crossAxisMeasured : undefined

  const slideSizeValue = (vertical ? containerHeight : containerWidth) * slideRatio

  const itemSizeStyle = useMemo(() => {
    const style: any = { [vertical ? 'height' : 'width']: slideSizeValue }
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

  const getInitialIndex = useCallback(() => {
    const initial = clamp(initialSwipe, 0, count - 1)
    return shouldLoop ? initial + 1 : initial // +1 因为循环模式下第一个是复制的末尾
  }, [initialSwipe, count, shouldLoop])

  const [current, setCurrent] = useState(() => getInitialIndex())
  const [indicatorIndex, setIndicatorIndex] = useState(() => getDisplayIndex(getInitialIndex()))
  const setCurrentSafe = (next: number) => {
    setCurrent((prev) => (prev === next ? prev : next))
  }
  const [enabledState, setEnabledState] = useState(enabled)
  const autoHeightEnabled = autoHeight && !vertical
  const [autoHeightValue, setAutoHeightValue] = useState<number | undefined>(undefined)
  const measuredHeightsRef = useRef<Record<number, number>>({})

  const webOffsetRef = useRef(0)
  const startOffsetRef = useRef(0)
  const panLockRef = useRef(false)
  const webTranslateXAnim = useRef(new Animated.Value(0)).current
  const webTranslateYAnim = useRef(new Animated.Value(0)).current

  const panLatestRef = useRef({
    enabledState,
    touchable,
    vertical,
    count,
    shouldLoop,
    displayCount,
    slideSizeValue,
    maxOffsetNonLoop: Math.max(0, count - 1) * slideSizeValue,
    maxOffsetLoop: Math.max(0, displayCount - 1) * slideSizeValue,
    duration,
    onChange,
  })
  panLatestRef.current = {
    enabledState,
    touchable,
    vertical,
    count,
    shouldLoop,
    displayCount,
    slideSizeValue,
    maxOffsetNonLoop: Math.max(0, count - 1) * slideSizeValue,
    maxOffsetLoop: Math.max(0, displayCount - 1) * slideSizeValue,
    duration,
    onChange,
  }

  const webRafIdRef = useRef<number | null>(null)
  const webPendingOffsetRef = useRef<number | null>(null)

  const flushWebTranslate = () => {
    const pending = webPendingOffsetRef.current
    if (pending == null) return
    webPendingOffsetRef.current = null
    const latest = panLatestRef.current
      ; (latest.vertical ? webTranslateYAnim : webTranslateXAnim).setValue(pending)
  }

  const scheduleWebTranslate = (next: number) => {
    webPendingOffsetRef.current = next
    if (webRafIdRef.current != null) return
    webRafIdRef.current = requestAnimationFrame(() => {
      webRafIdRef.current = null
      flushWebTranslate()
    })
  }

  const cancelWebRaf = () => {
    if (webRafIdRef.current != null) {
      cancelAnimationFrame(webRafIdRef.current)
      webRafIdRef.current = null
    }
    webPendingOffsetRef.current = null
  }

  const webSnapAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const stopWebSnapAnim = () => {
    const anim = webSnapAnimRef.current
    if (anim) {
      anim.stop()
      webSnapAnimRef.current = null
    }
    webTranslateXAnim.stopAnimation()
    webTranslateYAnim.stopAnimation()
  }

  useEffect(() => {
    return () => {
      cancelWebRaf()
      stopWebSnapAnim()
    }
  }, [])

  const webTrackTransform = useMemo(() => {
    if (vertical) {
      return trackOffsetPx
        ? [{ translateY: trackOffsetPx }, { translateY: webTranslateYAnim }]
        : [{ translateY: webTranslateYAnim }]
    }
    return trackOffsetPx
      ? [{ translateX: trackOffsetPx }, { translateX: webTranslateXAnim }]
      : [{ translateX: webTranslateXAnim }]
  }, [trackOffsetPx, vertical, webTranslateXAnim, webTranslateYAnim])

  useEffect(() => {
    setEnabledState(enabled)
  }, [enabled])

  const currentRef = useRef(current)
  useEffect(() => {
    currentRef.current = current
  }, [current])

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

  const containerAutoHeightStyle =
    autoHeightEnabled && autoHeightValue != null
      ? { height: autoHeightValue }
      : undefined

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
      try {
        flatListRef.current?.scrollToIndex({ index: currentRef.current, animated: false })
      } catch {
      }
    })
  }, [isWeb, count, vertical, containerLayout.height, containerLayout.width])

  const swipeTo = useCallback(
    (index: number, animated = true) => {
      if (count === 0) return

      const clampedIndex = clamp(index, 0, count - 1)
      const currentIndex = currentRef.current
      const displayIndex = getDisplayIndex(currentIndex)

      let targetIndex: number
      let needsJump = false
      let jumpOffset: number | null = null
      let jumpDisplayIndex: number | null = null

      if (shouldLoop) {
        if (displayIndex === count - 1 && clampedIndex === 0) {
          targetIndex = displayCount - 1
          needsJump = true
          jumpOffset = -1 * slideSizeValue
          jumpDisplayIndex = 1
        } else if (displayIndex === 0 && clampedIndex === count - 1) {
          targetIndex = 0
          needsJump = true
          jumpOffset = -count * slideSizeValue
          jumpDisplayIndex = count
        } else {
          targetIndex = clampedIndex + 1 // 循环模式下需要偏移
        }
      } else {
        targetIndex = clampedIndex
      }

      if (isWeb) {
        stopWebSnapAnim()
        const offset = -targetIndex * slideSizeValue
        webOffsetRef.current = offset

        if (needsJump) {
          if (animated) {
            const animValue = vertical ? webTranslateYAnim : webTranslateXAnim
            const anim = Animated.timing(animValue, {
              toValue: offset,
              duration,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            })
            webSnapAnimRef.current = anim
            anim.start((finished) => {
              webSnapAnimRef.current = null
              if (!finished || !shouldLoop || jumpOffset === null || jumpDisplayIndex === null) return

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
          }
        } else {
          const animValue = vertical ? webTranslateYAnim : webTranslateXAnim
          if (animated) {
            const anim = Animated.timing(animValue, {
              toValue: offset,
              duration,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            })
            webSnapAnimRef.current = anim
            anim.start(() => {
              webSnapAnimRef.current = null
            })
          } else {
            animValue.setValue(offset)
          }
          setCurrentSafe(targetIndex)
        }
      } else if (flatListRef.current) {
        if (isScrollingRef.current && animated) {
          nativeQueuedScrollRef.current = { index: targetIndex, animated }
          return
        }
        isScrollingRef.current = true
        try {
          flatListRef.current.scrollToIndex({
            index: targetIndex,
            animated,
          })
        } catch {
          isScrollingRef.current = false
          nativeQueuedScrollRef.current = { index: targetIndex, animated }
          return
        }
        if (needsJump && jumpDisplayIndex != null && !animated) {
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: jumpDisplayIndex!, animated: false })
            setCurrentSafe(jumpDisplayIndex!)
          })
        } else if (!animated) {
          setCurrentSafe(targetIndex)
        }

        if (!animated) {
          runAfterFrames(1, () => {
            isScrollingRef.current = false
            const queued = nativeQueuedScrollRef.current
            if (queued && flatListRef.current) {
              nativeQueuedScrollRef.current = null
              swipeTo(getDisplayIndex(queued.index), queued.animated)
            }
          })
        }
      }
    },
    [count, shouldLoop, isWeb, slideSizeValue, vertical, webTranslateXAnim, getDisplayIndex, displayCount, stopWebSnapAnim, setCurrentSafe]
  )

  const swipeToRef = useRef(swipeTo)
  useEffect(() => {
    swipeToRef.current = swipeTo
  }, [swipeTo])

  const swipeNext = useCallback(() => {
    if (count === 0) return
    const displayIndex = getDisplayIndex(currentRef.current)
    const nextIndex = displayIndex === count - 1 ? 0 : displayIndex + 1
    swipeTo(nextIndex)
  }, [count, getDisplayIndex, swipeTo])

  const swipePrev = useCallback(() => {
    if (count === 0) return
    const displayIndex = getDisplayIndex(currentRef.current)
    const prevIndex = displayIndex === 0 ? count - 1 : displayIndex - 1
    swipeTo(prevIndex)
  }, [count, getDisplayIndex, swipeTo])

  const handleNativeScrollEndByOffset = useCallback(
    (offset: number) => {
      if (count === 0) return

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

      const queued = nativeQueuedScrollRef.current
      if (queued && flatListRef.current) {
        nativeQueuedScrollRef.current = null
        const nextDisplayIndex = getDisplayIndex(queued.index)
        runAfterFrames(1, () => {
          swipeTo(nextDisplayIndex, queued.animated)
        })
      }
    },
    [count, displayCount, getDisplayIndex, setCurrentSafe, shouldLoop, slideSizeValue, swipeTo]
  )

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (count === 0) return

      const { contentOffset } = event.nativeEvent
      const offset = vertical ? contentOffset.y : contentOffset.x
      handleNativeScrollEndByOffset(offset)
    },
    [count, handleNativeScrollEndByOffset, vertical]
  )

  const handleScrollBeginDrag = () => {
    isDraggingRef.current = true
    isScrollingRef.current = true
  }

  const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDraggingRef.current = false
    const { contentOffset } = event.nativeEvent
    const offset = vertical ? contentOffset.y : contentOffset.x
    runAfterFrames(1, () => {
      if (nativeMomentumRef.current) return
      handleNativeScrollEndByOffset(offset)
    })
  }

  const handleMomentumScrollBegin = () => {
    nativeMomentumRef.current = true
    isScrollingRef.current = true
  }

  const indicatorRafIdRef = useRef<number | null>(null)
  const indicatorPendingRef = useRef<number | null>(null)

  const flushIndicator = () => {
    const next = indicatorPendingRef.current
    if (next == null) return
    indicatorPendingRef.current = null
    setIndicatorIndex((prev) => (prev === next ? prev : next))
  }

  const scheduleIndicator = (next: number) => {
    indicatorPendingRef.current = next
    if (indicatorRafIdRef.current != null) return
    indicatorRafIdRef.current = requestAnimationFrame(() => {
      indicatorRafIdRef.current = null
      flushIndicator()
    })
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
        cancelAnimationFrame(indicatorRafIdRef.current)
        indicatorRafIdRef.current = null
      }
      indicatorPendingRef.current = null
    }
  }, [])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isWeb) return
      if (count <= 1) return
      if (!slideSizeValue) return
      const { contentOffset } = event.nativeEvent
      const offset = vertical ? contentOffset.y : contentOffset.x
      let displayIndex = Math.round(offset / slideSizeValue)
      displayIndex = shouldLoop
        ? clamp(displayIndex, 0, displayCount - 1)
        : clamp(displayIndex, 0, count - 1)
      scheduleIndicator(getDisplayIndex(displayIndex))
    },
    [
      count,
      displayCount,
      getDisplayIndex,
      isWeb,
      scheduleIndicator,
      shouldLoop,
      slideSizeValue,
      vertical,
    ],
  )

  useEffect(() => {
    const stop = () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }

    if (!autoplay || count <= 1 || !enabledState) {
      stop()
      return
    }

    const interval = isNumber(autoplay) ? autoplay : 5000
    const tick = () => {
      if (!isDraggingRef.current && !isScrollingRef.current) {
        swipeNext()
      }
      autoplayTimerRef.current = setTimeout(tick, interval)
    }

    stop()
    autoplayTimerRef.current = setTimeout(tick, interval)
    return stop
  }, [autoplay, count, enabledState, swipeNext])

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

    const currentIndex = indicatorIndex

    if (typeof indicator === 'function') {
      return indicator(count, currentIndex)
    }

    return (
      <SwiperPagIndicator
        {...indicatorProps}
        total={count}
        current={currentIndex}
        vertical={vertical}
      />
    )
  }

  useEffect(() => {
    if (!onChange || count <= 0) return
    const nextDisplay = getDisplayIndex(current)
    const prevDisplay = currentDisplayIndexRef.current
    if (nextDisplay === prevDisplay) return
    prevIndexRef.current = prevDisplay
    currentDisplayIndexRef.current = nextDisplay
    onChange(nextDisplay)
  }, [current, onChange, count, getDisplayIndex])

  const renderChildItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item.type === 'child') {
        const child = validChildren[item.index]
        if (!child) return null

        if (!autoHeightEnabled) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: [
              (child as React.ReactElement<any>).props.style,
              itemSizeStyle,
            ],
          })
        }

        const nextChild = React.cloneElement(child as React.ReactElement<any>, {
          style: [
            (child as React.ReactElement<any>).props.style,
            styles.autoHeightChild,
          ],
        })

        return (
          <View style={itemSizeStyle} onLayout={(e) => handleItemLayout(index, e)} collapsable={false}>
            {nextChild}
          </View>
        )
      }
      return null
    },
    [validChildren, itemSizeStyle, autoHeightEnabled, handleItemLayout]
  )

  const renderDataItem = useCallback(
    (info: any) => {
      if (!renderItem) return null
      const item = renderItem(info)
      if (!item) return null

      return (
        <View
          style={itemSizeStyle}
          onLayout={autoHeightEnabled ? (e) => handleItemLayout(info.index, e) : undefined}
          collapsable={false}
        >
          {item}
        </View>
      )
    },
    [renderItem, itemSizeStyle, autoHeightEnabled, handleItemLayout]
  )

  const getItemKey = useCallback(
    (item: any, index: number) => {
      if (shouldLoop && count > 1) {
        if (index === 0) return `loop-last-${count - 1}`
        if (index === displayCount - 1) return `loop-first-0`
        return `item-${index - 1}`
      }
      return `item-${index}`
    },
    [shouldLoop, count, displayCount]
  )

  const getItemLayout = useCallback(
    (_: any, index: number) => {
      const offset = slideSizeValue * index
      return {
        length: slideSizeValue,
        offset,
        index,
      }
    },
    [slideSizeValue]
  )

  const snapToOffsets = useMemo(() => {
    if (slideSize === 100 && trackOffset === 0) {
      return undefined // 使用 snapToInterval
    }
    return displayData.map((_, index) => slideSizeValue * index)
  }, [displayData, slideSizeValue, slideSize, trackOffset])

  const panResponder = useMemo(() => {
    if (!isWeb) return null

    return PanResponder.create({
      onStartShouldSetPanResponder: () => {
        const latest = panLatestRef.current
        return !!latest.enabledState && !!latest.touchable && latest.count > 1
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const latest = panLatestRef.current
        if (!latest.enabledState || !latest.touchable || latest.count <= 1) return false
        if (latest.vertical) {
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        }
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
      },
      onPanResponderGrant: () => {
        const latest = panLatestRef.current
        if (!latest.enabledState || !latest.touchable || latest.count <= 1) return
        panLockRef.current = true
        startOffsetRef.current = webOffsetRef.current
        isDraggingRef.current = true
        cancelWebRaf()
        stopWebSnapAnim()
      },
      onPanResponderMove: (_, gestureState) => {
        if (!panLockRef.current) return
        const latest = panLatestRef.current
        const delta = latest.vertical ? gestureState.dy : gestureState.dx
        const nextRaw = startOffsetRef.current + delta
        const next = latest.shouldLoop
          ? clamp(nextRaw, -latest.maxOffsetLoop, 0)
          : clamp(nextRaw, -latest.maxOffsetNonLoop, 0)
        webOffsetRef.current = next
        scheduleWebTranslate(next)
      },
      onPanResponderRelease: (_, gestureState) => {
        const latest = panLatestRef.current
        panLockRef.current = false
        isDraggingRef.current = false
        cancelWebRaf()
        flushWebTranslate()
        const distance = latest.vertical ? gestureState.dy : gestureState.dx
        const velocity = latest.vertical ? gestureState.vy : gestureState.vx

        const dir = velocity !== 0 ? (velocity > 0 ? 1 : -1) : distance !== 0 ? (distance > 0 ? 1 : -1) : 0
        const velocityOffset = Math.min(Math.abs(velocity) * 2000, latest.slideSizeValue) * dir
        let targetOffset = startOffsetRef.current + distance + velocityOffset

        targetOffset = latest.shouldLoop
          ? clamp(targetOffset, -latest.maxOffsetLoop, 0)
          : clamp(targetOffset, -latest.maxOffsetNonLoop, 0)

        const targetIndex = Math.round(-targetOffset / latest.slideSizeValue)
        const displayIndex = latest.shouldLoop
          ? clamp(targetIndex, 0, latest.displayCount - 1)
          : clamp(targetIndex, 0, latest.count - 1)

        const realIndex = latest.shouldLoop
          ? displayIndex === 0
            ? latest.count - 1
            : displayIndex === latest.displayCount - 1
              ? 0
              : displayIndex - 1
          : displayIndex

        swipeToRef.current(realIndex, true)
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => {
        panLockRef.current = false
        isDraggingRef.current = false
        cancelWebRaf()
        stopWebSnapAnim()
      },
    })
  }, [isWeb, webTranslateXAnim, webTranslateYAnim])

  useEffect(() => {
    if (!isWeb) return
    const initialIndex = getInitialIndex()
    const initialOffset = -initialIndex * slideSizeValue
    webOffsetRef.current = initialOffset
    if (vertical) {
      webTranslateYAnim.setValue(initialOffset)
    } else {
      webTranslateXAnim.setValue(initialOffset)
    }
  }, [isWeb, getInitialIndex, slideSizeValue, vertical, webTranslateXAnim, webTranslateYAnim])

  useEffect(() => {
    if (!isWeb) return
    if (count === 0) return
    const offset = -currentRef.current * slideSizeValue
    webOffsetRef.current = offset
    if (vertical) {
      webTranslateYAnim.setValue(offset)
    } else {
      webTranslateXAnim.setValue(offset)
    }
  }, [isWeb, count, slideSizeValue, vertical, webTranslateXAnim, webTranslateYAnim])

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
            {displayData.map((item, index) => {
              const key = getItemKey(item, index)
              const content = data ? renderDataItem({ item, index }) : renderChildItem({ item, index })
              return (
                <View
                  key={key}
                  style={[itemSizeStyle, styles.webSlideWrapper]}
                >
                  {content}
                </View>
              )
            })}
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
        snapToInterval={slideSize === 100 && trackOffset === 0 ? slideSizeValue : undefined}
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEnabled={enabledState && touchable && count > 1}
        pagingEnabled={false}
        nestedScrollEnabled={true}
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
              flatListRef.current?.scrollToIndex({ index: info.index, animated: false })
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
        style={isWeb ? ({ cursor: 'grab' } as any) : undefined}
        contentContainerStyle={[
          isWeb ? ({ userSelect: 'none' } as any) : undefined,
          !isWeb ? nativeTrackContentPaddingStyle : undefined,
        ]}
        testID={`${testID}-flatlist`}
      />
      <View pointerEvents="none" style={styles.indicatorOverlay}>
        {renderIndicator()}
      </View>
    </View>
  )
})

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
  } as any)
  : undefined

export default Swiper
