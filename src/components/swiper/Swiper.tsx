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
  type PanResponderGestureState,
  type LayoutChangeEvent,
} from 'react-native'
import type { SwiperProps, SwiperInstance } from './types'
import SwiperItem from './SwiperItem'
import SwiperPagIndicator from './SwiperPagIndicator'

const FALLBACK_WIDTH = 375
const FALLBACK_HEIGHT = 667

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
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
    stuckAtBoundary = false,
    autoHeight = false,
    preventScroll = true,
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
  const prevIndexRef = useRef<number>(initialSwipe)
  const currentDisplayIndexRef = useRef<number>(initialSwipe)
  const isWeb = Platform.OS === 'web'
  // Native：滚动任务队列（避免 scrollToIndex 竞争导致掉帧/乱序）
  const nativeQueuedScrollRef = useRef<{ index: number; animated: boolean } | null>(null)

  // 处理子元素（children 模式）
  const validChildren = useMemo(() => {
    if (children) {
      return React.Children.toArray(children).filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && child.type === SwiperItem
      )
    }
    return []
  }, [children])

  // 转换为数据数组
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

  // 计算是否应该启用循环
  const shouldLoop = useMemo(() => {
    if (count <= 1) return false
    if (slideRatio * (count - 1) < 1) return false
    return loop
  }, [count, loop, slideRatio])

  // 构建循环数据（复制首尾）
  const loopData = useMemo(() => {
    if (!shouldLoop || count <= 1) {
      return itemsData
    }
    // 循环模式：末尾 + 原始 + 开头
    return [
      ...itemsData.slice(-1), // 末尾的复制
      ...itemsData, // 原始数据
      ...itemsData.slice(0, 1), // 开头的复制
    ]
  }, [shouldLoop, itemsData, count])

  const displayData = shouldLoop ? loopData : itemsData
  const displayCount = displayData.length

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    // 避免重复 setState（减少 re-render）
    setContainerLayout((prev) => {
      if (prev.width === width && prev.height === height) return prev
      return { width, height }
    })
  }, [])

  const containerWidth = containerLayout.width || viewportWidth
  const containerHeight = containerLayout.height || viewportHeight

  // 计算滑动尺寸（用容器真实尺寸而不是 window 尺寸，尤其是纵向场景）
  const getSlideSize = useCallback(() => {
    const containerSize = vertical ? containerHeight : containerWidth
    return containerSize * slideRatio
  }, [vertical, containerHeight, containerWidth, slideRatio])

  // 主轴尺寸：横向为 width，纵向为 height
  // 注意：在容器尚未测量到尺寸（0）前，使用 viewport 只用于计算 slideSize；
  // 但不要用 viewport 去“写死”交叉轴尺寸，否则会把布局撑到整屏，导致指示器看起来跑到很底下。
  const crossAxisMeasured = vertical ? containerLayout.width : containerLayout.height
  const crossAxisSize = crossAxisMeasured > 0 ? crossAxisMeasured : undefined

  const slideSizeValue = getSlideSize()

  const itemSizeStyle = useMemo(() => {
    const style: any = { [vertical ? 'height' : 'width']: slideSizeValue }
    if (crossAxisSize != null) {
      style[vertical ? 'width' : 'height'] = crossAxisSize
    }
    return style
  }, [vertical, slideSizeValue, crossAxisSize])

  // trackOffset（百分比）应基于“实际容器主轴尺寸”计算，避免初次渲染用 viewport 兜底导致整体大幅位移（看起来乱套）
  const mainAxisMeasured = vertical ? containerLayout.height : containerLayout.width
  const trackOffsetPx = mainAxisMeasured > 0 ? mainAxisMeasured * offsetRatio : 0

  // 对齐官方：trackOffset 应该作用在“轨道容器”上（track），而不是 contentContainerStyle。
  // 这样能避免 web / RN 在 transform + scroll 的组合下出现布局/命中区域异常。
  const trackOffsetStyle = useMemo(() => {
    if (!trackOffsetPx) return undefined
    return { transform: vertical ? [{ translateY: trackOffsetPx }] : [{ translateX: trackOffsetPx }] }
  }, [trackOffsetPx, vertical])

  // 计算初始索引（循环模式下需要偏移）
  const getInitialIndex = useCallback(() => {
    const initial = clamp(initialSwipe, 0, count - 1)
    return shouldLoop ? initial + 1 : initial // +1 因为循环模式下第一个是复制的末尾
  }, [initialSwipe, count, shouldLoop])

  const [current, setCurrent] = useState(() => getInitialIndex())
  // 避免重复 setState 触发无效渲染
  const setCurrentSafe = useCallback((next: number) => {
    setCurrent((prev) => (prev === next ? prev : next))
  }, [])
  const [enabledState, setEnabledState] = useState(enabled)

  // Web 端 PanResponder 相关状态
  const webOffsetRef = useRef(0)
  const startOffsetRef = useRef(0)
  const startTimeRef = useRef(0)
  const panLockRef = useRef(false)
  const webTranslateXAnim = useRef(new Animated.Value(0)).current
  const webTranslateYAnim = useRef(new Animated.Value(0)).current

  // 让 PanResponder 只创建一次：用 ref 存储最新参数，避免频繁重建带来的抖动/卡顿
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
  useEffect(() => {
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
  }, [enabledState, touchable, vertical, count, shouldLoop, displayCount, slideSizeValue, duration, onChange])

  // Web 拖拽极致性能：move 事件非常密集，用 rAF 将 Animated.setValue 节流到“每帧最多一次”
  const rafIdRef = useRef<number | null>(null)
  const rafPendingValueRef = useRef<number | null>(null)

  const flushWebTranslate = useCallback(() => {
    const pending = rafPendingValueRef.current
    if (pending == null) return
    rafPendingValueRef.current = null
    const latest = panLatestRef.current
    if (latest.vertical) {
      webTranslateYAnim.setValue(pending)
    } else {
      webTranslateXAnim.setValue(pending)
    }
  }, [webTranslateXAnim, webTranslateYAnim])

  const scheduleWebTranslate = useCallback(
    (next: number) => {
      rafPendingValueRef.current = next
      if (rafIdRef.current != null) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        flushWebTranslate()
      })
    },
    [flushWebTranslate]
  )

  const cancelWebRaf = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    rafPendingValueRef.current = null
  }, [])

  // Web 端吸附动画统一管理：可中断，避免拖拽/多次 swipeTo 时与上一段动画竞争导致抖动
  const webSnapAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const stopWebSnapAnim = useCallback(() => {
    const anim = webSnapAnimRef.current
    if (anim) {
      anim.stop()
      webSnapAnimRef.current = null
    }
    // 同时停掉 Animated.Value 上可能在跑的动画（更稳）
    webTranslateXAnim.stopAnimation()
    webTranslateYAnim.stopAnimation()
  }, [webTranslateXAnim, webTranslateYAnim])

  useEffect(() => {
    return () => {
      cancelWebRaf()
      stopWebSnapAnim()
    }
  }, [cancelWebRaf, stopWebSnapAnim])

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

  // 同步 enabled prop 的变化
  useEffect(() => {
    setEnabledState(enabled)
  }, [enabled])

  // 用 rAF 替代 setTimeout：用于边界跳转/失败重试等“下一帧再做”的场景
  const runAfterFrames = useCallback((frames: number, fn: () => void) => {
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
  }, [])

  // 获取真实索引（用于显示和回调）
  const getDisplayIndex = useCallback(
    (index: number): number => {
      if (!shouldLoop) return index
      if (index === 0) return count - 1 // 第一个是复制的末尾
      if (index === displayCount - 1) return 0 // 最后一个是复制的开头
      return index - 1 // 中间的是原始数据
    },
    [shouldLoop, count, displayCount]
  )

  // 滑动到指定索引
  // 使用 ref 存储当前索引，避免依赖 current 导致频繁重建
  const currentRef = useRef(current)
  useEffect(() => {
    currentRef.current = current
  }, [current])

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
        // 循环模式：检查是否需要通过复制元素实现无缝切换
        if (displayIndex === count - 1 && clampedIndex === 0) {
          // 从最后一个切换到第一个：先动画到末尾的复制元素，然后跳转到开头的真实元素
          targetIndex = displayCount - 1
          needsJump = true
          jumpOffset = -1 * slideSizeValue
          jumpDisplayIndex = 1
        } else if (displayIndex === 0 && clampedIndex === count - 1) {
          // 从第一个切换到最后一个：先动画到开头的复制元素，然后跳转到末尾的真实元素
          targetIndex = 0
          needsJump = true
          jumpOffset = -count * slideSizeValue
          jumpDisplayIndex = count
        } else {
          // 正常切换：直接动画到目标位置
          targetIndex = clampedIndex + 1 // 循环模式下需要偏移
        }
      } else {
        targetIndex = clampedIndex
      }

      if (isWeb) {
        // 新的指令开始前，停掉上一段吸附动画，避免竞争抖动
        stopWebSnapAnim()
        const offset = -targetIndex * slideSizeValue
        webOffsetRef.current = offset

        if (needsJump) {
          // 需要跳转的情况：先动画到复制元素，动画结束后跳转到真实元素
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

              // 动画结束后，无动画跳转到对应位置以实现无缝衔接
              webOffsetRef.current = jumpOffset
              if (vertical) {
                webTranslateYAnim.setValue(jumpOffset)
              } else {
                webTranslateXAnim.setValue(jumpOffset)
              }
              setCurrentSafe(jumpDisplayIndex)
            })
            // 先更新到 targetIndex，动画结束后会更新到 jumpDisplayIndex
            setCurrentSafe(targetIndex)
          } else {
            // 无动画模式下，直接跳转到真实元素
            if (vertical) {
              webTranslateYAnim.setValue(jumpOffset!)
            } else {
              webTranslateXAnim.setValue(jumpOffset!)
            }
            webOffsetRef.current = jumpOffset!
            setCurrentSafe(jumpDisplayIndex!)
          }
        } else {
          // 不需要跳转：直接动画到目标位置
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
        // 若当前仍在滚动中，合并为“最后一次”目标，等滚动结束后执行（生产级稳定性）
        if (isScrollingRef.current && animated) {
          nativeQueuedScrollRef.current = { index: targetIndex, animated }
          return
        }
        isScrollingRef.current = true
        flatListRef.current.scrollToIndex({
          index: targetIndex,
          animated,
        })
        // Native：animated=true 时交给 handleScrollEnd 处理“复制元素→真实元素”的无缝跳转；
        // animated=false 时直接跳到真实元素（避免依赖定时器/事件是否触发）
        if (needsJump && jumpDisplayIndex != null && !animated) {
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: jumpDisplayIndex!, animated: false })
            setCurrentSafe(jumpDisplayIndex!)
          })
        } else if (!animated) {
          // 非动画滚动不一定触发 onMomentumScrollEnd，直接更新 state
          setCurrentSafe(targetIndex)
        }

        // 非动画的 programmatic scroll 不一定触发 momentum end：下一帧解除滚动锁
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
    [count, shouldLoop, isWeb, slideSizeValue, vertical, webTranslateXAnim, getDisplayIndex, displayCount, runAfterFrames, stopWebSnapAnim, setCurrentSafe]
  )

  // 滑动到下一张/上一张
  // 关键性能点：基于 currentRef，保持回调稳定，避免 autoplay interval 因依赖变动反复重建（会导致抖动）
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

  // 处理滑动结束
  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (count === 0) return

      isScrollingRef.current = false
      const { contentOffset, layoutMeasurement } = event.nativeEvent
      const containerSizeValue = vertical
        ? layoutMeasurement.height || viewportHeight
        : layoutMeasurement.width || viewportWidth
      const offset = vertical ? contentOffset.y : contentOffset.x
      const slideSizeValue = containerSizeValue * slideRatio

      let index = Math.round(offset / slideSizeValue)

      if (shouldLoop) {
        // 循环模式下的索引处理
        if (index === 0) {
          // 滑动到开头的复制元素，跳转到末尾的真实元素
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: count, animated: false })
          })
          index = count
        } else if (index === displayCount - 1) {
          // 滑动到末尾的复制元素，跳转到开头的真实元素
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: 1, animated: false })
          })
          index = 1
        }
      } else {
        index = clamp(index, 0, count - 1)
      }

      const displayIndex = getDisplayIndex(index)
      setCurrentSafe(index)

      // 若滚动期间收到了新的 programmatic 目标，滚动结束后再执行（合并多次调用）
      const queued = nativeQueuedScrollRef.current
      if (queued && flatListRef.current) {
        nativeQueuedScrollRef.current = null
        // queued.index 是 displayData 的 index；转换回对外 index 再走 swipeTo（保持逻辑一致）
        const nextDisplayIndex = getDisplayIndex(queued.index)
        runAfterFrames(1, () => {
          swipeTo(nextDisplayIndex, queued.animated)
        })
      }
    },
    [count, shouldLoop, vertical, viewportWidth, viewportHeight, slideRatio, getDisplayIndex, displayCount, runAfterFrames, swipeTo, setCurrentSafe]
  )

  // 处理滑动开始
  const handleScrollBeginDrag = useCallback(() => {
    isDraggingRef.current = true
    isScrollingRef.current = true
    // 停止自动播放
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  // 处理滑动结束拖拽
  const handleScrollEndDrag = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  // 自动播放
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

    const interval = typeof autoplay === 'boolean' ? 5000 : autoplay
    const tick = () => {
      // 交互中暂停（避免抢手势/滚动）
      if (!isDraggingRef.current && !isScrollingRef.current) {
        swipeNext()
      }
      autoplayTimerRef.current = setTimeout(tick, interval)
    }

    stop()
    autoplayTimerRef.current = setTimeout(tick, interval)
    return stop
  }, [autoplay, count, enabledState, swipeNext])

  // 暴露方法
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

  // 渲染指示器
  const renderIndicator = () => {
    if (indicator === false || count <= 1) return null

    const currentIndex = getDisplayIndex(current)

    if (typeof indicator === 'function') {
      return indicator(count, currentIndex)
    }

    // 默认指示器
    return (
      <SwiperPagIndicator
        total={count}
        current={currentIndex}
        vertical={vertical}
        style={indicatorProps?.style}
      />
    )
  }

  // 统一触发 onChange：避免在手势/滚动回调里调用用户逻辑（更稳定、也不需要 setTimeout(0)）
  useEffect(() => {
    if (!onChange || count <= 0) return
    const nextDisplay = getDisplayIndex(current)
    const prevDisplay = currentDisplayIndexRef.current
    if (nextDisplay === prevDisplay) return
    prevIndexRef.current = prevDisplay
    currentDisplayIndexRef.current = nextDisplay
    onChange(nextDisplay)
  }, [current, onChange, count, getDisplayIndex])

  // 渲染项目（children 模式）
  const renderChildItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item.type === 'child') {
        const child = validChildren[item.index]
        if (!child) return null

        return React.cloneElement(child as React.ReactElement<any>, {
          style: [
            (child as React.ReactElement<any>).props.style,
            itemSizeStyle,
          ],
        })
      }
      return null
    },
    [validChildren, itemSizeStyle]
  )

  // 渲染项目（data 模式）
  const renderDataItem = useCallback(
    (info: any) => {
      if (!renderItem) return null
      const item = renderItem(info)
      if (!item) return null

      return (
        <View
          style={itemSizeStyle}
        >
          {item}
        </View>
      )
    },
    [renderItem, itemSizeStyle]
  )

  // 获取 key
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

  // 获取布局信息（性能优化）
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

  // 计算 snap 偏移（支持 trackOffset）
  const snapToOffsets = useMemo(() => {
    if (slideSize === 100 && trackOffset === 0) {
      return undefined // 使用 snapToInterval
    }
    return displayData.map((_, index) => slideSizeValue * index)
  }, [displayData, slideSizeValue, slideSize, trackOffset])

  // Web 端 PanResponder 处理鼠标拖拽
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
        startTimeRef.current = Date.now()
        isDraggingRef.current = true
        cancelWebRaf()
        stopWebSnapAnim()
        if (autoplayTimerRef.current) {
          clearTimeout(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (!panLockRef.current) return
        const latest = panLatestRef.current
        // 对齐官方 `react-vant` 的“跟手”体验：
        // 官方在 use-gesture 层 `transform: ([x, y]) => [-x, -y]` 先反转手势，
        // 但渲染时又对 position 做了取反（例如非 loop: `x: -position%`），最终效果是：
        // - 手指向右拖动（dx > 0）→ 轨道 translateX 增大（向右移动）
        // - 手指向下拖动（dy > 0）→ 轨道 translateY 增大（向下移动）
        //
        // 我们的 web 端直接用 translateX/Y（单位 px），且内部 offset 约定为：offset = -index * slideSizeValue（<= 0）。
        // 因此这里应让 offset “跟手”变化：dx/dy 为正时，offset 也应增大（变得不那么负），轨道向右/下移动。
        const delta = latest.vertical ? gestureState.dy : gestureState.dx
        // 生产级：即使 loop，也必须限制在“可渲染轨道范围”内，否则会出现空白/超长动画。
        // loop: offset 范围 [-(displayCount-1)*slideSize, 0]（仅允许拖到两端复制项）
        // non-loop: offset 范围 [-(count-1)*slideSize, 0]
        const nextRaw = startOffsetRef.current + delta
        const next = latest.shouldLoop
          ? clamp(nextRaw, -latest.maxOffsetLoop, 0)
          : clamp(nextRaw, -latest.maxOffsetNonLoop, 0)
        webOffsetRef.current = next
        scheduleWebTranslate(next)
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const latest = panLatestRef.current
        panLockRef.current = false
        isDraggingRef.current = false
        // 确保动画从“最后一帧”位置起跳
        cancelWebRaf()
        flushWebTranslate()
        stopWebSnapAnim()
        // 预留：如需根据按压时长调整惯性，可使用 elapsed
        // const elapsed = Date.now() - startTimeRef.current
        // 与 onPanResponderMove 保持一致（跟手）
        const distance = latest.vertical ? gestureState.dy : gestureState.dx
        const velocity = latest.vertical ? gestureState.vy : gestureState.vx

        // 计算目标索引：对齐官方实现
        // 官方：index = Math.round((offset + Math.min(velocity * 2000, slidePixels) * direction) / slidePixels)
        // 其中 direction 也是反转后的值（-1 或 1）
        // 松手后的“甩动”惯性：更贴近官方实现（velocity * 2000，并限制最多一页距离）
        const dir = velocity !== 0 ? (velocity > 0 ? 1 : -1) : distance !== 0 ? (distance > 0 ? 1 : -1) : 0
        const velocityOffset = Math.min(Math.abs(velocity) * 2000, latest.slideSizeValue) * dir
        let targetOffset = startOffsetRef.current + distance + velocityOffset

        // release 同样限制在可渲染轨道范围内
        targetOffset = latest.shouldLoop
          ? clamp(targetOffset, -latest.maxOffsetLoop, 0)
          : clamp(targetOffset, -latest.maxOffsetNonLoop, 0)

        // 对齐到最近的 slide
        // 注意：循环模式下，displayData 的结构是 [末尾复制(index 0), 原始0(index 1), ..., 原始n-1(index count), 开头复制(index count+1)]
        const targetIndex = Math.round(-targetOffset / latest.slideSizeValue)
        let displayIndex: number
        let finalOffset: number

        if (latest.shouldLoop) {
          // 循环模式：允许平滑拖动到复制元素，然后在动画结束后跳转
          // 先允许动画到目标位置（包括复制元素）
          displayIndex = clamp(targetIndex, 0, latest.displayCount - 1)
          finalOffset = -displayIndex * latest.slideSizeValue
        } else {
          displayIndex = clamp(targetIndex, 0, latest.count - 1)
          finalOffset = -displayIndex * latest.slideSizeValue
        }

        webOffsetRef.current = finalOffset

        // 动画过渡到目标位置
        const animValue = latest.vertical ? webTranslateYAnim : webTranslateXAnim
        const anim = Animated.timing(animValue, {
          toValue: finalOffset,
          duration: latest.duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        })
        webSnapAnimRef.current = anim
        anim.start((finished) => {
          webSnapAnimRef.current = null
          if (!finished || !latest.shouldLoop) return

          // 动画结束后，检查是否需要无缝跳转
          // 如果当前在边界复制元素上，无动画跳转到对应的真实元素
          const currentOffset = webOffsetRef.current
          const currentIndex = Math.round(-currentOffset / latest.slideSizeValue)

          if (currentIndex === 0) {
            // 在开头的复制元素上，跳转到末尾的真实元素
            const jumpOffset = -latest.count * latest.slideSizeValue
            webOffsetRef.current = jumpOffset
            if (latest.vertical) {
              webTranslateYAnim.setValue(jumpOffset)
            } else {
              webTranslateXAnim.setValue(jumpOffset)
            }
            setCurrentSafe(latest.count)
          } else if (currentIndex === latest.displayCount - 1) {
            // 在末尾的复制元素上，跳转到开头的真实元素
            const jumpOffset = -1 * latest.slideSizeValue
            webOffsetRef.current = jumpOffset
            if (latest.vertical) {
              webTranslateYAnim.setValue(jumpOffset)
            } else {
              webTranslateXAnim.setValue(jumpOffset)
            }
            setCurrentSafe(1)
          }
        })

        const realIndex = latest.shouldLoop
          ? displayIndex === 0 ? latest.count - 1 : displayIndex === latest.displayCount - 1 ? 0 : displayIndex - 1
          : displayIndex

        setCurrentSafe(latest.shouldLoop ? realIndex + 1 : realIndex)
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

  // 初始化 Web 端偏移
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

  // 容器尺寸或 slideSize 变化时，同步当前 index 的 offset（避免纵向容器高度 < windowHeight 时需要拖很远才换页）
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

  // Web 端使用 PanResponder + Animated.View，原生端使用 FlatList
  if (isWeb) {
    return (
      <View
        style={[styles.container, webContainerStyle, style]}
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
    <View style={[styles.container, style]} testID={testID} onLayout={handleContainerLayout} collapsable={false}>
      <FlatList
        ref={flatListRef}
        data={displayData}
        keyExtractor={getItemKey}
        renderItem={data ? renderDataItem : renderChildItem}
        getItemLayout={getItemLayout}
        horizontal={!vertical}
        // 极致性能：更激进的虚拟化参数（对轮播场景通常是安全的）
        removeClippedSubviews={Platform.OS !== 'web'}
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
        onMomentumScrollEnd={handleScrollEnd}
        initialScrollIndex={getInitialIndex()}
        onScrollToIndexFailed={(info) => {
          // 处理滚动失败：用 rAF 等待布局/测量完成，尽量避免 setTimeout
          runAfterFrames(2, () => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: false })
          })
        }}
        style={[
          Platform.OS === 'web' ? ({ cursor: 'grab' } as any) : undefined,
          trackOffsetStyle,
        ]}
        contentContainerStyle={Platform.OS === 'web' ? ({ userSelect: 'none' } as any) : undefined}
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
  webSlideWrapper: {
    flexShrink: 0,
    flexGrow: 0,
  },
  // 指示器覆盖层：避免在 web 下被 transform/列表内容压住（横向更容易出现）
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
