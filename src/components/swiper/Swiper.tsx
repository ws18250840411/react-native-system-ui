import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
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
  useWindowDimensions,
  Platform,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type LayoutChangeEvent,
} from 'react-native'
import { clamp } from '../../utils/number'
import type { SwiperProps, SwiperInstance, SwiperItemProps } from './types'
import SwiperPagIndicator from './SwiperPagIndicator'

type SwiperComponent = (<T>(
  props: SwiperProps<T> & RefAttributes<SwiperInstance>
) => ReactElement | null) & { displayName?: string }

export const SwiperItem = forwardRef<View, SwiperItemProps>((props, ref) => {
  const { style, children, testID } = props
  return (
    <View ref={ref} style={[styles.item, style]} testID={testID}>
      {children}
    </View>
  )
})

SwiperItem.displayName = 'SwiperItem'

const DEFAULT_AUTOPLAY_INTERVAL = 3000
const LOOP_RENDER_ALL_THRESHOLD = 10

const SwiperImpl = <T,>(props: SwiperProps<T>, ref: Ref<SwiperInstance>) => {
  const {
    data,
    renderItem,
    children,
    initialSwipe = 0,
    touchable = true,
    loop = true,
    autoplay = false,
    vertical = false,
    onChange,
    indicator = true,
    indicatorProps,
    style,
    testID,
  } = props

  const flatListRef = useRef<FlatList>(null)
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInteractingRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const queuedIndexRef = useRef<number | null>(null)
  const isMomentumRef = useRef(false)
  const webDragStartRef = useRef<number | null>(null)
  const isWeb = Platform.OS === 'web'

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const [layout, setLayout] = useState({ width: 0, height: 0 })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setLayout((prev) => (prev.width === width && prev.height === height ? prev : { width, height }))
  }, [])

  const childItems = useMemo(() => {
    if (!children) return []
    return Children.toArray(children).filter(
      (child): child is ReactElement => isValidElement(child)
    )
  }, [children])

  const usingData = Array.isArray(data)
  const baseItems = usingData ? data! : childItems
  const count = baseItems.length
  const shouldLoop = loop && count > 1

  const displayData = useMemo(() => {
    if (!shouldLoop) return baseItems
    return [baseItems[count - 1], ...baseItems, baseItems[0]]
  }, [baseItems, shouldLoop, count])
  const displayCount = displayData.length
  const loopRenderAll = shouldLoop && displayCount <= LOOP_RENDER_ALL_THRESHOLD

  const getRealIndex = useCallback((displayIndex: number) => {
    if (!shouldLoop) return clamp(displayIndex, 0, count - 1)
    if (displayIndex === 0) return count - 1
    if (displayIndex === displayCount - 1) return 0
    return displayIndex - 1
  }, [shouldLoop, count, displayCount])

  const getDisplayIndex = useCallback((realIndex: number) => {
    if (!shouldLoop) return clamp(realIndex, 0, count - 1)
    return clamp(realIndex, 0, count - 1) + 1
  }, [shouldLoop, count])

  const initialRealIndex = clamp(initialSwipe, 0, Math.max(0, count - 1))
  const initialDisplayIndex = getDisplayIndex(initialRealIndex)
  const currentIndexRef = useRef(initialRealIndex)
  const [currentIndex, setCurrentIndex] = useState(initialRealIndex)

  const layoutReady = layout.width > 0 && layout.height > 0
  const mainSize = vertical
    ? (layout.height || windowHeight || 1)
    : (layout.width || windowWidth || 1)
  const crossSize = vertical
    ? (layout.width || windowWidth || 1)
    : (layout.height || windowHeight || 1)

  const itemStyle = useMemo(() => ({
    width: vertical ? crossSize : mainSize,
    height: vertical ? mainSize : crossSize,
  }), [vertical, mainSize, crossSize])

  const clearAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }, [])

  const updateIndex = useCallback((next: number) => {
    const clamped = clamp(next, 0, Math.max(0, count - 1))
    if (currentIndexRef.current === clamped) return
    currentIndexRef.current = clamped
    setCurrentIndex(clamped)
    onChange?.(clamped)
  }, [count, onChange])

  const scrollToDisplayIndex = useCallback((displayIndex: number, animated: boolean) => {
    try {
      flatListRef.current?.scrollToIndex({ index: displayIndex, animated })
    } catch {
    }
  }, [])

  const swipeTo = useCallback((index: number, animated = true) => {
    if (count === 0) return
    if (animated && isAnimatingRef.current) {
      queuedIndexRef.current = index
      return
    }
    const targetRealIndex = clamp(index, 0, count - 1)
    let targetDisplayIndex = getDisplayIndex(targetRealIndex)

    if (shouldLoop && animated) {
      const currentDisplayIndex = getDisplayIndex(currentIndexRef.current)
      if (currentDisplayIndex === count && targetRealIndex === 0) {
        targetDisplayIndex = displayCount - 1
      } else if (currentDisplayIndex === 1 && targetRealIndex === count - 1) {
        targetDisplayIndex = 0
      }
    }

    const currentRealIndex = currentIndexRef.current
    const currentDisplayIndex = getDisplayIndex(currentRealIndex)
    if (targetRealIndex === currentRealIndex && targetDisplayIndex === currentDisplayIndex) {
      if (queuedIndexRef.current != null) {
        const next = queuedIndexRef.current
        queuedIndexRef.current = null
        swipeTo(next, true)
      }
      return
    }

    if (animated) {
      isAnimatingRef.current = true
    }
    scrollToDisplayIndex(targetDisplayIndex, animated)
    if (!animated) {
      updateIndex(targetRealIndex)
      if (queuedIndexRef.current != null) {
        const next = queuedIndexRef.current
        queuedIndexRef.current = null
        swipeTo(next, true)
      }
    }
  }, [count, getDisplayIndex, scrollToDisplayIndex, shouldLoop, displayCount, updateIndex])

  const scheduleAutoplay = useCallback(() => {
    const interval = typeof autoplay === 'number' ? Math.max(0, autoplay) : autoplay ? DEFAULT_AUTOPLAY_INTERVAL : 0
    if (!interval || count <= 1) return
    if (isInteractingRef.current && !isWeb) return
    clearAutoplay()
    autoplayTimerRef.current = setTimeout(() => {
      if (isInteractingRef.current && !isWeb) return
      const nextIndex = shouldLoop
        ? (currentIndexRef.current + 1) % count
        : clamp(currentIndexRef.current + 1, 0, count - 1)
      swipeTo(nextIndex, true)
    }, interval)
  }, [autoplay, count, clearAutoplay, shouldLoop, swipeTo])

  const swipeNext = useCallback(() => {
    if (count === 0) return
    const next = shouldLoop
      ? (currentIndexRef.current + 1) % count
      : clamp(currentIndexRef.current + 1, 0, count - 1)
    swipeTo(next, true)
  }, [count, shouldLoop, swipeTo])

  const swipePrev = useCallback(() => {
    if (count === 0) return
    const next = shouldLoop
      ? (currentIndexRef.current - 1 + count) % count
      : clamp(currentIndexRef.current - 1, 0, count - 1)
    swipeTo(next, true)
  }, [count, shouldLoop, swipeTo])

  const flushQueuedSwipe = () => {
    if (queuedIndexRef.current == null) return
    const next = queuedIndexRef.current
    queuedIndexRef.current = null
    swipeTo(next, true)
  }

  useImperativeHandle(ref, () => ({
    swipeTo, swipeNext, swipePrev,
    getCurrentIndex: () => currentIndexRef.current,
  }), [swipeTo, swipeNext, swipePrev])

  useEffect(() => {
    if (!layoutReady || count === 0) return
    scrollToDisplayIndex(initialDisplayIndex, false)
  }, [layoutReady, count, initialDisplayIndex, scrollToDisplayIndex])

  useEffect(() => {
    scheduleAutoplay()
    return clearAutoplay
  }, [scheduleAutoplay, clearAutoplay, currentIndex])

  const resetScrollState = () => {
    isAnimatingRef.current = false
    isInteractingRef.current = false
    isMomentumRef.current = false
    scheduleAutoplay()
    flushQueuedSwipe()
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (count <= 1) return
    const offset = vertical
      ? event.nativeEvent.contentOffset.y
      : event.nativeEvent.contentOffset.x
    const displayIndex = Math.round(offset / mainSize)
    const clampedDisplayIndex = shouldLoop
      ? clamp(displayIndex, 0, displayCount - 1)
      : clamp(displayIndex, 0, count - 1)
    updateIndex(getRealIndex(clampedDisplayIndex))
    if (isWeb) {
      const alignedOffset = displayIndex * mainSize
      if (Math.abs(offset - alignedOffset) < 0.5) {
        if (shouldLoop && (displayIndex <= 0 || displayIndex >= displayCount - 1)) {
          scrollToDisplayIndex(displayIndex <= 0 ? count : 1, false)
        }
        resetScrollState()
      }
    }
  }

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isWeb || count === 0) return
    const offset = vertical
      ? event.nativeEvent.contentOffset.y
      : event.nativeEvent.contentOffset.x
    const displayIndex = Math.round(offset / mainSize)
    let nextDisplayIndex = displayIndex
    if (shouldLoop) {
      if (displayIndex === 0) nextDisplayIndex = count
      if (displayIndex === displayCount - 1) nextDisplayIndex = 1
    }
    if (nextDisplayIndex !== displayIndex) {
      scrollToDisplayIndex(nextDisplayIndex, false)
    }
    updateIndex(getRealIndex(nextDisplayIndex))
    resetScrollState()
  }

  const webMouseProps = isWeb && touchable && count > 1 ? ({
    onPointerDown: (e: any) => {
      if (e.nativeEvent.pointerType !== 'mouse' || e.nativeEvent.button !== 0) return
      webDragStartRef.current = vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX
      isInteractingRef.current = true
      clearAutoplay()
    },
    onPointerUp: (e: any) => {
      const start = webDragStartRef.current
      webDragStartRef.current = null
      if (start == null || e.nativeEvent.pointerType !== 'mouse') return
      const d = (vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX) - start
      if (Math.abs(d) >= mainSize * 0.15) {
        d < 0 ? swipeNext() : swipePrev()
      }
      isInteractingRef.current = false
      scheduleAutoplay()
    },
    onPointerLeave: () => {
      if (webDragStartRef.current != null) {
        webDragStartRef.current = null
        isInteractingRef.current = false
        scheduleAutoplay()
      }
    },
  } as Record<string, any>) : undefined

  const renderSlide = useCallback((info: { item: T | ReactElement }) => {
    const content = usingData
      ? renderItem?.(info as Parameters<NonNullable<typeof renderItem>>[0]) ?? null
      : (info.item as ReactElement)
    if (!content) return null
    return (
      <View style={[styles.slide, itemStyle]}>
        {content}
      </View>
    )
  }, [usingData, renderItem, itemStyle])

  if (count === 0) return null

  const indicatorNode = indicator === false || count <= 1
    ? null
    : typeof indicator === 'function'
      ? indicator(count, currentIndex)
      : <SwiperPagIndicator {...indicatorProps} total={count} current={currentIndex} vertical={vertical} />

  return (
    <View style={[styles.container, webMouseProps && styles.webDrag, style]} onLayout={handleLayout} testID={testID} {...webMouseProps}>
      <FlatList
        ref={flatListRef}
        data={displayData}
        renderItem={renderSlide as any}
        keyExtractor={(_item, index) => `swiper-${index}`}
        horizontal={!vertical}
        getItemLayout={(_, index) => ({ length: mainSize, offset: mainSize * index, index })}
        initialScrollIndex={layoutReady ? initialDisplayIndex : undefined}
        scrollEnabled={touchable && count > 1}
        removeClippedSubviews={!shouldLoop || !loopRenderAll}
        disableVirtualization={shouldLoop && loopRenderAll}
        initialNumToRender={shouldLoop ? (loopRenderAll ? displayCount : 3) : 3}
        maxToRenderPerBatch={shouldLoop ? (loopRenderAll ? displayCount : 3) : 3}
        windowSize={shouldLoop ? (loopRenderAll ? displayCount : 7) : 5}
        pagingEnabled
        snapToInterval={mainSize}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => { isInteractingRef.current = true; clearAutoplay() }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={(e) => { if (!isMomentumRef.current) handleScrollEnd(e) }}
        onMomentumScrollBegin={() => { isMomentumRef.current = true }}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollToIndexFailed={(info) => {
          scrollToDisplayIndex(info.index, false)
          updateIndex(getRealIndex(info.index))
          resetScrollState()
        }}
      />
      <View pointerEvents="none" style={styles.indicatorOverlay}>
        {indicatorNode}
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
  webDrag: {
    cursor: 'grab',
    userSelect: 'none',
  } as any,
  slide: { flex: 1 },
  item: { flex: 1 },
  indicatorOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    elevation: 10,
  },
})

export default Swiper
