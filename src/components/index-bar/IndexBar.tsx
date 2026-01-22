import React from 'react'
import {
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import { isFiniteNumber, isUndefined } from '../../utils'
import type { IndexAnchorProps, IndexBarInstance, IndexBarProps, IndexBarValue } from './types'
import { useIndexBarTokens } from './tokens'

const IndexBarBase = React.forwardRef<IndexBarInstance, IndexBarProps>((props, ref) => {
  const {
    children,
    value,
    defaultValue,
    highlightColor,
    zIndex = 1,
    sticky = true,
    stickyOffsetTop = 0,
    indexList,
    itemRender,
    showIndicator = true,
    indicatorStyle,
    indexTextStyle,
    safeAreaInsetTop = false,
    tokensOverride,
    onChange,
    onSelect,
    style,
    ...rest
  } = props

  const { colors, layout } = useIndexBarTokens(tokensOverride)
  const scrollRef = React.useRef<ScrollView>(null)
  const scrollYRef = React.useRef(0)
  const anchorLayouts = React.useRef<Map<IndexBarValue, number>>(new Map())
  const indexListHeightRef = React.useRef(0)
  const draggingIndexRef = React.useRef<IndexBarValue | null>(null)
  const pendingScrollToValueRef = React.useRef<IndexBarValue | null>(null)
  const [stickyVisible, setStickyVisible] = React.useState(false)
  const [indicator, setIndicator] = React.useState<{ visible: boolean; label?: string }>({ visible: false })

  const anchors = React.useMemo(() => {
    return React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<IndexAnchorProps>[]
  }, [children])

  const navItems = React.useMemo<IndexBarValue[]>(() => {
    return indexList?.length ? indexList : anchors.map(anchor => anchor.props.index)
  }, [anchors, indexList])

  const firstIndex = navItems[0]
  const [activeIndex, setActiveIndex] = useControllableValue<IndexBarValue>(props, {
    defaultValue: isUndefined(firstIndex) ? anchors[0]?.props.index : firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex =
    activeIndex === undefined || activeIndex === null || !navItems.includes(activeIndex) ? firstIndex : activeIndex

  const showIndicatorNow = React.useCallback(
    (label?: string) => {
      if (!showIndicator) return
      setIndicator({ visible: true, label })
    },
    [showIndicator],
  )

  const hideIndicatorNow = React.useCallback(() => {
    if (!showIndicator) return
    setIndicator(prev => (prev.visible ? { visible: false } : prev))
  }, [showIndicator])

  const scrollToAnchor = React.useCallback((index: IndexBarValue, animated: boolean) => {
    const y = anchorLayouts.current.get(index)
    if (y === undefined) {
      pendingScrollToValueRef.current = index
      return
    }
    scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyOffsetTop), animated })
  }, [stickyOffsetTop])

  const handleAnchorLayout = React.useCallback((index: IndexBarValue, layoutY: number) => {
    anchorLayouts.current.set(index, layoutY)
    const pending = pendingScrollToValueRef.current
    if (pending === null) return
    const y = anchorLayouts.current.get(pending)
    if (y === undefined) return
    pendingScrollToValueRef.current = null
    scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyOffsetTop), animated: false })
  }, [stickyOffsetTop])

  const scrollToIndex = React.useCallback((index: IndexBarValue, animated: boolean = true) => {
    scrollToAnchor(index, animated)
    setActiveIndex(index)
  }, [scrollToAnchor, setActiveIndex])

  React.useImperativeHandle(
    ref,
    () => ({ scrollTo: (index: IndexBarValue) => scrollToIndex(index, true) }),
    [scrollToIndex],
  )

  const handleScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event?.nativeEvent?.contentOffset?.y ?? 0
    scrollYRef.current = offsetY

    const threshold = sticky ? stickyOffsetTop : 0
    let nextIndex = currentIndex
    for (const anchor of anchors) {
      const y = anchorLayouts.current.get(anchor.props.index)
      if (y === undefined) continue
      if (offsetY + threshold + 1 >= y) nextIndex = anchor.props.index
      else break
    }
    if (nextIndex !== undefined && nextIndex !== null && nextIndex !== currentIndex) {
      setActiveIndex(nextIndex)
    }

    if (sticky && nextIndex !== undefined && nextIndex !== null) {
      const y = anchorLayouts.current.get(nextIndex)
      const nextStickyVisible = y !== undefined && offsetY > Math.max(0, y - stickyOffsetTop)
      setStickyVisible(prev => (prev === nextStickyVisible ? prev : nextStickyVisible))
    } else {
      setStickyVisible(prev => (prev ? false : prev))
    }
  }, [anchors, currentIndex, setActiveIndex, sticky, stickyOffsetTop])

  React.useEffect(() => {
    if (value === undefined || value === null) return
    const y = anchorLayouts.current.get(value)
    if (y === undefined) {
      pendingScrollToValueRef.current = value
      return
    }
    const targetY = Math.max(0, y - stickyOffsetTop)
    if (Math.abs(targetY - scrollYRef.current) < 1) return
    scrollRef.current?.scrollTo({ y: targetY, animated: true })
  }, [stickyOffsetTop, value])

  const selectIndex = React.useCallback((index: IndexBarValue, animated: boolean) => {
    showIndicatorNow(String(index))
    onSelect?.(index)
    scrollToIndex(index, animated)
  }, [onSelect, scrollToIndex, showIndicatorNow])

  const handlePressIn = React.useCallback((index: IndexBarValue) => {
    selectIndex(index, true)
  }, [selectIndex])

  const handlePressOut = React.useCallback(() => {
    hideIndicatorNow()
  }, [hideIndicatorNow])

  if (anchors.length === 0) {
    return null
  }

  const highlight = highlightColor ?? colors.activeText
  const activeAnchor = anchors.find(anchor => anchor.props.index === currentIndex)

  const stickyNode = sticky && stickyVisible && activeAnchor ? (
    <View
      style={[
        styles.sticky,
        {
          backgroundColor: colors.stickyBackground,
          height: layout.stickyHeight,
        },
      ]}
    >
      <Text style={[styles.stickyText, { color: highlight }]}>{activeAnchor.props.title ?? activeAnchor.props.index}</Text>
    </View>
  ) : null

  const indicatorSize = layout.indicatorSize
  const indicatorNode = React.useMemo(() => {
    if (!showIndicator || !indicator.visible) return null
    return (
      <View
        style={[
          styles.indicator,
          {
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            backgroundColor: colors.indicatorBackground,
            zIndex,
            transform: [
              { translateX: -indicatorSize / 2 },
              { translateY: -indicatorSize / 2 },
            ],
          },
          indicatorStyle,
        ]}
      >
        <Text style={[styles.indicatorText, { color: colors.indicatorText }]}>{indicator.label}</Text>
      </View>
    )
  }, [
    colors.indicatorBackground,
    colors.indicatorText,
    indicator.label,
    indicator.visible,
    indicatorSize,
    indicatorStyle,
    showIndicator,
    zIndex,
  ])

  const pickIndexFromEvent = React.useCallback((evt: GestureResponderEvent): IndexBarValue | null => {
    const height = indexListHeightRef.current
    if (!height || !navItems.length) return null
    const paddingY = layout.paddingVertical
    const contentHeight = Math.max(0, height - paddingY * 2)
    const itemHeight = contentHeight / navItems.length
    if (itemHeight <= 0) return null
    const locationY = evt?.nativeEvent?.locationY
    if (!isFiniteNumber(locationY)) return null
    const y = locationY - paddingY
    const idx = Math.max(0, Math.min(navItems.length - 1, Math.floor(y / itemHeight)))
    return navItems[idx] ?? null
  }, [layout.paddingVertical, navItems])

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: evt => {
          const picked = pickIndexFromEvent(evt)
          draggingIndexRef.current = picked
          if (picked !== null) {
            selectIndex(picked, true)
          }
        },
        onPanResponderMove: evt => {
          const picked = pickIndexFromEvent(evt)
          if (picked === null) return
          if (picked === draggingIndexRef.current) return
          draggingIndexRef.current = picked
          selectIndex(picked, false)
        },
        onPanResponderRelease: () => {
          draggingIndexRef.current = null
          hideIndicatorNow()
        },
        onPanResponderTerminate: () => {
          draggingIndexRef.current = null
          hideIndicatorNow()
        },
      }),
    [hideIndicatorNow, pickIndexFromEvent, selectIndex],
  )

  const StickyWrapper = safeAreaInsetTop ? SafeAreaView : View
  const stickyWrapperStyle = [styles.stickyWrapper, { top: stickyOffsetTop, zIndex }]
  const handleIndexListLayout = React.useCallback((e: { nativeEvent: { layout: { height: number } } }) => {
    const { height } = e.nativeEvent.layout
    indexListHeightRef.current = height
  }, [])

  const anchorNodes = React.useMemo(
    () =>
      anchors.map(anchor =>
        React.cloneElement(anchor, {
          key: anchor.key ?? anchor.props.index,
          active: anchor.props.index === currentIndex,
          highlightColor: highlight,
          onLayoutCapture: handleAnchorLayout,
        }),
      ),
    [anchors, currentIndex, handleAnchorLayout, highlight],
  )

  return (
    <View {...rest} style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {anchorNodes}
      </ScrollView>
      {sticky && stickyVisible && stickyNode ? <StickyWrapper style={stickyWrapperStyle}>{stickyNode}</StickyWrapper> : null}
      <View
        style={[
          styles.indexList,
          {
            width: layout.indexWidth,
            paddingVertical: layout.paddingVertical,
            zIndex,
          },
        ]}
        onLayout={handleIndexListLayout}
        {...panResponder.panHandlers}
      >
        {navItems.map(item => {
          const isActive = item === currentIndex
          const node = itemRender?.(item, isActive)
          return (
            <Pressable
              key={String(item)}
              testID={`rv-indexbar-nav-${String(item)}`}
              style={styles.indexItem}
              onPressIn={() => handlePressIn(item)}
              onPressOut={handlePressOut}
            >
              {node ?? (
                <Text
                  style={[
                    styles.indexText,
                    { color: isActive ? highlight : colors.text },
                    indexTextStyle,
                  ]}
                >
                  {String(item)}
                </Text>
              )}
            </Pressable>
          )
        })}
      </View>
      {indicatorNode}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indexList: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  indexItem: {
    paddingVertical: 1,
    paddingHorizontal: 0,
  },
  indexText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  indicatorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  stickyWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  sticky: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  stickyText: {
    fontSize: 14,
    fontWeight: '600',
  },
})

IndexBarBase.displayName = 'IndexBar'

export default IndexBarBase
