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
import { createHairlineBorderBottom } from '../../utils/hairline'
import type { IndexAnchorProps, IndexBarInstance, IndexBarProps, IndexBarValue } from './types'
import { useIndexBarTokens } from './tokens'

interface ParsedAnchor {
  element: React.ReactElement<IndexAnchorProps>
  index: IndexBarValue
  title?: React.ReactNode
}

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
    onChange,
    onSelect,
    style,
    ...rest
  } = props

  const tokens = useIndexBarTokens()
  const scrollRef = React.useRef<ScrollView>(null)
  const scrollYRef = React.useRef(0)
  const anchorLayouts = React.useRef<Map<IndexBarValue, number>>(new Map())
  const indexListRef = React.useRef<View>(null)
  const indexListLayout = React.useRef<{ pageY: number; height: number } | null>(null)
  const pendingScrollToValueRef = React.useRef<IndexBarValue | null>(null)
  const prevControlledValueRef = React.useRef<IndexBarValue | null>(null)
  const [stickyVisible, setStickyVisible] = React.useState(false)

  const anchors = React.useMemo<ParsedAnchor[]>(() => {
    return React.Children.toArray(children)
      .map(child => {
        if (!React.isValidElement<IndexAnchorProps>(child)) return null
        return {
          element: child,
          index: child.props.index,
          title: child.props.title ?? child.props.index,
        }
      })
      .filter(Boolean) as ParsedAnchor[]
  }, [children])

  const navItems = React.useMemo<IndexBarValue[]>(() => {
    if (indexList && indexList.length) return indexList
    return anchors.map(anchor => anchor.index)
  }, [anchors, indexList])

  const firstIndex = navItems[0]
  const [activeIndex, setActiveIndex] = useControllableValue<IndexBarValue>(props, {
    defaultValue: typeof firstIndex === 'undefined' ? anchors[0]?.index : firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex = React.useMemo(() => {
    if (activeIndex === undefined || activeIndex === null) return firstIndex
    const exists = navItems.some(item => item === activeIndex)
    return exists ? activeIndex : firstIndex
  }, [activeIndex, firstIndex, navItems])

  const [indicator, setIndicator] = React.useState<{ visible: boolean; label?: string }>({
    visible: false,
  })

  const showIndicatorNow = React.useCallback(
    (label?: string) => {
      if (!showIndicator) return
      setIndicator({ visible: true, label })
    },
    [showIndicator]
  )

  const hideIndicatorNow = React.useCallback(() => {
    if (!showIndicator) return
    setIndicator(prev => (prev.visible ? { visible: false } : prev))
  }, [showIndicator])

  const getScrollTargetY = React.useCallback(
    (index: IndexBarValue) => {
      const y = anchorLayouts.current.get(index)
      if (y === undefined) return undefined
      // 让锚点标题滚到顶部（官方行为），吸顶标题只在锚点标题滚出顶部后才显示
      const offset = stickyOffsetTop
      return Math.max(0, y - offset)
    },
    [stickyOffsetTop]
  )

  const handleAnchorLayout = React.useCallback(
    (index: IndexBarValue, layoutY: number) => {
      anchorLayouts.current.set(index, layoutY)
      const pending = pendingScrollToValueRef.current
      if (pending === null) return
      const targetY = getScrollTargetY(pending)
      if (targetY === undefined) return
      pendingScrollToValueRef.current = null
      scrollRef.current?.scrollTo({ y: targetY, animated: false })
    },
    [getScrollTargetY]
  )

  const scrollToAnchor = React.useCallback(
    (index: IndexBarValue, animated: boolean) => {
      const targetY = getScrollTargetY(index)
      if (targetY !== undefined) {
        scrollRef.current?.scrollTo({ y: targetY, animated })
        return
      }
      pendingScrollToValueRef.current = index
    },
    [getScrollTargetY]
  )

  const scrollToIndex = React.useCallback(
    (index: IndexBarValue, animated: boolean = true) => {
      scrollToAnchor(index, animated)
      setActiveIndex(index)
    },
    [scrollToAnchor, setActiveIndex]
  )

  React.useImperativeHandle(ref, () => ({ scrollTo: (index: IndexBarValue) => scrollToIndex(index, true) }), [scrollToIndex])

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event?.nativeEvent?.contentOffset?.y ?? 0
      scrollYRef.current = offsetY

      const sorted = [...anchorLayouts.current.entries()].sort((a, b) => a[1] - b[1])
      let current = sorted[0]?.[0]
      const threshold = sticky ? stickyOffsetTop : 0
      for (const [index, layoutY] of sorted) {
        if (offsetY + threshold + 1 >= layoutY) {
          current = index
        }
      }
      if (current !== undefined && current !== null && current !== currentIndex) {
        setActiveIndex(current)
      }

      // 只在当前锚点标题滚出顶部后显示吸顶标题，避免“双标题”
      if (sticky && current !== undefined && current !== null) {
        const anchorY = anchorLayouts.current.get(current)
        const nextStickyVisible = anchorY === undefined ? false : offsetY > Math.max(0, anchorY - stickyOffsetTop)
        setStickyVisible(prev => (prev === nextStickyVisible ? prev : nextStickyVisible))
      } else if (stickyVisible) {
        setStickyVisible(false)
      }
    },
    [currentIndex, setActiveIndex, sticky, stickyOffsetTop, stickyVisible]
  )

  React.useEffect(() => {
    if (value === undefined || value === null) return
    if (prevControlledValueRef.current === value) return
    prevControlledValueRef.current = value

    const targetY = getScrollTargetY(value)
    if (targetY === undefined) {
      pendingScrollToValueRef.current = value
      return
    }
    if (Math.abs(targetY - scrollYRef.current) < 1) return
    scrollToAnchor(value, true)
  }, [getScrollTargetY, scrollToAnchor, value])

  const handlePressIn = (index: IndexBarValue) => {
    showIndicatorNow(String(index))
    onSelect?.(index)
    scrollToIndex(index, true)
  }

  const handlePressOut = () => {
    hideIndicatorNow()
  }

  if (anchors.length === 0) {
    return null
  }

  const highlight = highlightColor ?? tokens.colors.activeText
  const activeAnchor = anchors.find(anchor => anchor.index === currentIndex)

  const stickyNode = sticky && stickyVisible && activeAnchor ? (
    <View
      style={[
        styles.sticky,
        {
          backgroundColor: tokens.colors.stickyBackground,
          height: tokens.layout.stickyHeight,
        },
      ]}
    >
      <Text style={[styles.stickyText, { color: highlight }]}>{activeAnchor.title}</Text>
    </View>
  ) : null

  const indicatorNode = showIndicator && indicator.visible ? (
    <View
      style={[
        styles.indicator,
        {
          width: tokens.layout.indicatorSize,
          height: tokens.layout.indicatorSize,
          borderRadius: tokens.layout.indicatorSize / 2,
          backgroundColor: tokens.colors.indicatorBackground,
          zIndex,
          transform: [
            { translateX: -tokens.layout.indicatorSize / 2 },
            { translateY: -tokens.layout.indicatorSize / 2 },
          ],
        },
        indicatorStyle,
      ]}
    >
      <Text style={[styles.indicatorText, { color: tokens.colors.indicatorText }]}>{indicator.label}</Text>
    </View>
  ) : null

  const pickIndexFromEvent = React.useCallback(
    (evt: GestureResponderEvent): IndexBarValue | null => {
      const layout = indexListLayout.current
      if (!layout) return null
      if (!navItems.length) return null
      const pageY = evt.nativeEvent.pageY
      const y = pageY - layout.pageY
      const itemHeight = layout.height / navItems.length
      if (itemHeight <= 0) return null
      const rawIndex = Math.floor(y / itemHeight)
      const idx = Math.min(navItems.length - 1, Math.max(0, rawIndex))
      return navItems[idx] ?? null
    },
    [navItems]
  )

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const picked = pickIndexFromEvent(evt)
        if (picked !== null) handlePressIn(picked)
      },
      onPanResponderMove: evt => {
        const picked = pickIndexFromEvent(evt)
        if (picked === null) return
        showIndicatorNow(String(picked))
        onSelect?.(picked)
        if (picked !== currentIndex) {
          scrollToIndex(picked, false)
        }
      },
      onPanResponderRelease: () => hideIndicatorNow(),
      onPanResponderTerminate: () => hideIndicatorNow(),
    })
  }, [currentIndex, handlePressIn, hideIndicatorNow, onSelect, pickIndexFromEvent, scrollToIndex, showIndicatorNow])

  return (
    <View {...rest} style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {anchors.map(anchor =>
          React.cloneElement(anchor.element, {
            key: anchor.element.key ?? anchor.index,
            active: anchor.index === currentIndex,
            highlightColor: highlight,
            onLayoutCapture: handleAnchorLayout,
          })
        )}
      </ScrollView>
      {sticky && stickyVisible ? (
        safeAreaInsetTop ? (
          <SafeAreaView style={[styles.stickyWrapper, { top: stickyOffsetTop, zIndex }]}>{stickyNode}</SafeAreaView>
        ) : (
          <View style={[styles.stickyWrapper, { top: stickyOffsetTop, zIndex }]}>{stickyNode}</View>
        )
      ) : null}
      <View
        style={[
          styles.indexList,
          {
            width: tokens.layout.indexWidth,
            paddingVertical: tokens.layout.paddingVertical,
            zIndex,
          },
        ]}
        ref={indexListRef}
        onLayout={e => {
          const { height } = e.nativeEvent.layout
          indexListRef.current?.measureInWindow((_, pageY, __, measuredHeight) => {
            indexListLayout.current = { pageY, height: measuredHeight || height }
          })
        }}
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
                    { color: isActive ? highlight : tokens.colors.text },
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
