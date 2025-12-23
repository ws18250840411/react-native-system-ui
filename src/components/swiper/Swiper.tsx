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
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
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

  const flatListRef = useRef<FlatList>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isDraggingRef = useRef(false)
  const isScrollingRef = useRef(false)
  const prevIndexRef = useRef<number>(initialSwipe)

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

  // 计算实际索引（考虑循环）
  const getRealIndex = useCallback(
    (index: number): number => {
      if (!shouldLoop) {
        return clamp(index, 0, count - 1)
      }
      return ((index % count) + count) % count
    },
    [count, shouldLoop]
  )

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

  // 计算滑动尺寸
  const getSlideSize = useCallback(() => {
    const containerSize = vertical ? viewportHeight : viewportWidth
    return containerSize * slideRatio
  }, [vertical, viewportWidth, viewportHeight, slideRatio])

  const slideSizeValue = getSlideSize()
  const containerSize = vertical ? viewportHeight : viewportWidth

  // 计算初始索引（循环模式下需要偏移）
  const getInitialIndex = useCallback(() => {
    const initial = clamp(initialSwipe, 0, count - 1)
    return shouldLoop ? initial + 1 : initial // +1 因为循环模式下第一个是复制的末尾
  }, [initialSwipe, count, shouldLoop])

  const [current, setCurrent] = useState(() => getInitialIndex())
  const [enabledState, setEnabledState] = useState(enabled)

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
  const swipeTo = useCallback(
    (index: number, animated = true) => {
      if (count === 0 || !flatListRef.current) return

      const targetIndex = shouldLoop
        ? clamp(index, 0, count - 1) + 1 // 循环模式下需要偏移
        : clamp(index, 0, count - 1)

      flatListRef.current.scrollToIndex({
        index: targetIndex,
        animated,
      })
    },
    [count, shouldLoop]
  )

  // 滑动到下一张
  const swipeNext = useCallback(() => {
    if (count === 0) return
    const displayIndex = getDisplayIndex(current)
    const nextIndex = displayIndex === count - 1 ? 0 : displayIndex + 1
    swipeTo(nextIndex)
  }, [current, count, getDisplayIndex, swipeTo])

  // 滑动到上一张
  const swipePrev = useCallback(() => {
    if (count === 0) return
    const displayIndex = getDisplayIndex(current)
    const prevIndex = displayIndex === 0 ? count - 1 : displayIndex - 1
    swipeTo(prevIndex)
  }, [current, count, getDisplayIndex, swipeTo])

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
          setTimeout(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                index: count,
                animated: false,
              })
            }
          }, 50)
          index = count
        } else if (index === displayCount - 1) {
          // 滑动到末尾的复制元素，跳转到开头的真实元素
          setTimeout(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                index: 1,
                animated: false,
              })
            }
          }, 50)
          index = 1
        }
      } else {
        index = clamp(index, 0, count - 1)
      }

      const displayIndex = getDisplayIndex(index)
      setCurrent(index)
      prevIndexRef.current = displayIndex
      onChange?.(displayIndex)
    },
    [count, shouldLoop, vertical, viewportWidth, viewportHeight, slideRatio, getDisplayIndex, onChange, displayCount]
  )

  // 处理滑动开始
  const handleScrollBeginDrag = useCallback(() => {
    isDraggingRef.current = true
    isScrollingRef.current = true
    // 停止自动播放
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  // 处理滑动结束拖拽
  const handleScrollEndDrag = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  // 自动播放
  useEffect(() => {
    if (!autoplay || count <= 1 || !enabledState || isDraggingRef.current || isScrollingRef.current) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
      return
    }

    const interval = typeof autoplay === 'boolean' ? 5000 : autoplay
    autoplayTimerRef.current = setInterval(() => {
      if (!isDraggingRef.current && !isScrollingRef.current) {
        swipeNext()
      }
    }, interval)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
  }, [autoplay, count, enabledState, swipeNext])

  // 初始化滚动位置
  useEffect(() => {
    if (count === 0 || !flatListRef.current) return

    const initialIndex = getInitialIndex()
    // 延迟执行以确保布局完成
    const timer = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        })
        setCurrent(initialIndex)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [count, getInitialIndex])

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

  // 渲染项目（children 模式）
  const renderChildItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item.type === 'child') {
        const child = validChildren[item.index]
        if (!child) return null

        return React.cloneElement(child, {
          style: [
            child.props.style,
            {
              [vertical ? 'height' : 'width']: slideSizeValue,
              [vertical ? 'width' : 'height']: containerSize,
            },
          ],
        })
      }
      return null
    },
    [validChildren, vertical, slideSizeValue, containerSize]
  )

  // 渲染项目（data 模式）
  const renderDataItem = useCallback(
    (info: any) => {
      if (!renderItem) return null
      const item = renderItem(info)
      if (!item) return null

      return (
        <View
          style={{
            [vertical ? 'height' : 'width']: slideSizeValue,
            [vertical ? 'width' : 'height']: containerSize,
          }}
        >
          {item}
        </View>
      )
    },
    [renderItem, vertical, slideSizeValue, containerSize]
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

  if (count === 0) {
    return null
  }

  const currentIndex = getDisplayIndex(current)

  return (
    <View style={[styles.container, style]} testID={testID}>
      <FlatList
        ref={flatListRef}
        data={displayData}
        keyExtractor={getItemKey}
        renderItem={data ? renderDataItem : renderChildItem}
        getItemLayout={getItemLayout}
        horizontal={!vertical}
        snapToInterval={slideSize === 100 && trackOffset === 0 ? slideSizeValue : undefined}
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEnabled={enabledState && touchable && count > 1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={rubberband && !shouldLoop}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleScrollEnd}
        initialScrollIndex={getInitialIndex()}
        onScrollToIndexFailed={(info) => {
          // 处理滚动失败的情况
          const wait = new Promise((resolve) => setTimeout(resolve, 500))
          wait.then(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({ index: info.index, animated: false })
            }
          })
        }}
        testID={`${testID}-flatlist`}
      />
      {renderIndicator()}
    </View>
  )
})

Swiper.displayName = 'Swiper'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
})

export default Swiper
