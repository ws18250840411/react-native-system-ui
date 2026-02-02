import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import { isFiniteNumber, isUndefined } from '../../utils/validate'
import { SafeAreaView } from '../safe-area-view'
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

  const { colors, layout, typography } = useIndexBarTokens(tokensOverride)
  const scrollRef = useRef<ScrollView>(null)
  const scrollYRef = useRef(0)
  const anchorLayouts = useRef<Map<IndexBarValue, number>>(new Map())
  const anchorOffsetsRef = useRef<Array<{ index: IndexBarValue; y: number }>>([])
  const indexListHeightRef = useRef(0)
  const navItemLayoutsRef = useRef<Map<IndexBarValue, { y: number; height: number }>>(new Map())
  const navItemOffsetsRef = useRef<Array<{ index: IndexBarValue; y: number; height: number }>>([])
  const draggingIndexRef = useRef<IndexBarValue | null>(null)
  const pendingScrollToValueRef = useRef<IndexBarValue | null>(null)
  const [interactionIndex, setInteractionIndex] = useState<IndexBarValue | null>(null)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [indicator, setIndicator] = useState<{ visible: boolean; label?: string }>({ visible: false })

  const anchors = useMemo(
    () => React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<IndexAnchorProps>[],
    [children]
  )

  const navItems: IndexBarValue[] = useMemo(
    () => (indexList?.length ? indexList : anchors.map(anchor => anchor.props.index)),
    [anchors, indexList]
  )

  const firstIndex = navItems[0]
  const [activeIndex, setActiveIndex] = useControllableValue<IndexBarValue>(props, {
    defaultValue: isUndefined(firstIndex) ? anchors[0]?.props.index : firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex =
    activeIndex === undefined || activeIndex === null || !navItems.includes(activeIndex) ? firstIndex : activeIndex
  const displayIndex = interactionIndex ?? currentIndex

  const showIndicatorNow = useCallback(
    (label?: string) => {
      if (!showIndicator) return
      setIndicator({ visible: true, label })
    },
    [showIndicator],
  )

  const hideIndicatorNow = useCallback(() => {
    if (!showIndicator) return
    setIndicator(prev => (prev.visible ? { visible: false } : prev))
  }, [showIndicator])

  const scrollToAnchor = useCallback((index: IndexBarValue, animated: boolean) => {
    const y = anchorLayouts.current.get(index)
    if (y === undefined) {
      pendingScrollToValueRef.current = index
      return
    }
    scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyOffsetTop), animated })
  }, [stickyOffsetTop])

  const handleAnchorLayout = useCallback((index: IndexBarValue, layoutY: number) => {
    anchorLayouts.current.set(index, layoutY)
    anchorOffsetsRef.current = Array.from(anchorLayouts.current.entries())
      .map(([key, y]) => ({ index: key, y }))
      .sort((a, b) => a.y - b.y)
    const pending = pendingScrollToValueRef.current
    if (pending === null) return
    const y = anchorLayouts.current.get(pending)
    if (y === undefined) return
    pendingScrollToValueRef.current = null
    scrollRef.current?.scrollTo({ y: Math.max(0, y - stickyOffsetTop), animated: false })
  }, [stickyOffsetTop])

  const scrollToIndex = useCallback((index: IndexBarValue, animated: boolean = true) => {
    scrollToAnchor(index, animated)
    setActiveIndex(index)
  }, [scrollToAnchor, setActiveIndex])

  useImperativeHandle(
    ref,
    () => ({ scrollTo: (index: IndexBarValue) => scrollToIndex(index, true) }),
    [scrollToIndex],
  )

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event?.nativeEvent?.contentOffset?.y ?? 0
    scrollYRef.current = offsetY

    const threshold = sticky ? stickyOffsetTop : 0
    let nextIndex = currentIndex
    const entries = anchorOffsetsRef.current
    const targetY = offsetY + threshold + 1
    let low = 0
    let high = entries.length - 1
    let found: IndexBarValue | null = null
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const entry = entries[mid]
      if (entry && entry.y <= targetY) {
        found = entry.index
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    if (found !== null) {
      nextIndex = found
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
  }, [currentIndex, setActiveIndex, sticky, stickyOffsetTop])

  useEffect(() => {
    const valid = new Set(anchors.map(anchor => anchor.props.index))
    Array.from(anchorLayouts.current.keys()).forEach(key => {
      if (!valid.has(key)) {
        anchorLayouts.current.delete(key)
      }
    })
    anchorOffsetsRef.current = Array.from(anchorLayouts.current.entries())
      .map(([key, y]) => ({ index: key, y }))
      .sort((a, b) => a.y - b.y)
  }, [anchors])

  useEffect(() => {
    const valid = new Set(navItems)
    Array.from(navItemLayoutsRef.current.keys()).forEach(key => {
      if (!valid.has(key)) {
        navItemLayoutsRef.current.delete(key)
      }
    })
    navItemOffsetsRef.current = Array.from(navItemLayoutsRef.current.entries())
      .map(([key, layoutItem]) => ({ index: key, y: layoutItem.y, height: layoutItem.height }))
      .sort((a, b) => a.y - b.y)
  }, [navItems])

  useEffect(() => {
    if (interactionIndex == null) return
    if (!navItems.includes(interactionIndex)) {
      setInteractionIndex(null)
    }
  }, [interactionIndex, navItems])

  useEffect(() => {
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

  const selectIndex = useCallback((index: IndexBarValue, animated: boolean) => {
    showIndicatorNow(String(index))
    onSelect?.(index)
    scrollToIndex(index, animated)
  }, [onSelect, scrollToIndex, showIndicatorNow])

  const handlePressIn = useCallback((index: IndexBarValue) => {
    setInteractionIndex(index)
    selectIndex(index, true)
  }, [selectIndex])

  const handlePressOut = useCallback(() => {
    hideIndicatorNow()
    setInteractionIndex(null)
  }, [hideIndicatorNow])

  const handleIndexItemLayout = useCallback(
    (index: IndexBarValue, event: { nativeEvent: { layout: { y: number; height: number } } }) => {
      const { y, height } = event.nativeEvent.layout
      navItemLayoutsRef.current.set(index, { y, height })
      navItemOffsetsRef.current = Array.from(navItemLayoutsRef.current.entries())
        .map(([key, layoutItem]) => ({ index: key, y: layoutItem.y, height: layoutItem.height }))
        .sort((a, b) => a.y - b.y)
    },
    [],
  )

  if (anchors.length === 0) {
    return null
  }

  const highlight = highlightColor ?? colors.activeText
  const activeAnchor = anchors.find(anchor => anchor.props.index === displayIndex)

  const stickyNode = useMemo(() => {
    if (!sticky || !stickyVisible || !activeAnchor) return null
    return (
      <View
        style={[
          styles.sticky,
          {
            backgroundColor: colors.stickyBackground,
            height: layout.stickyHeight,
            paddingHorizontal: layout.stickyPaddingHorizontal,
          },
        ]}
      >
        <Text style={[styles.stickyText, { color: highlight, fontSize: typography.stickyTextSize }]}>
          {activeAnchor.props.title ?? activeAnchor.props.index}
        </Text>
      </View>
    )
  }, [activeAnchor, colors.stickyBackground, highlight, layout.stickyHeight, layout.stickyPaddingHorizontal, sticky, stickyVisible, typography.stickyTextSize])

  const indicatorSize = layout.indicatorSize
  const indicatorNode = useMemo(() => {
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
        <Text style={[styles.indicatorText, { color: colors.indicatorText, fontSize: typography.indicatorTextSize }]}>
          {indicator.label}
        </Text>
      </View>
    )
  }, [colors.indicatorBackground, colors.indicatorText, indicator.label, indicator.visible, indicatorSize, indicatorStyle, showIndicator, typography.indicatorTextSize, zIndex])

  const pickIndexFromEvent = useCallback((evt: GestureResponderEvent): IndexBarValue | null => {
    if (!navItems.length) return null
    const locationY = evt?.nativeEvent?.locationY
    if (!isFiniteNumber(locationY)) return null
    const entries = navItemOffsetsRef.current
    if (entries.length) {
      let picked: IndexBarValue | null = null
      let minDistance = Number.POSITIVE_INFINITY
      entries.forEach(entry => {
        if (entry.height <= 0) return
        const center = entry.y + entry.height / 2
        const distance = Math.abs(locationY - center)
        if (distance < minDistance) {
          minDistance = distance
          picked = entry.index
        }
      })
      return picked
    }
    const height = indexListHeightRef.current
    if (!height) return null
    const paddingY = layout.paddingVertical
    const contentHeight = Math.max(0, height - paddingY * 2)
    const itemHeight = contentHeight / navItems.length
    if (itemHeight <= 0) return null
    const y = locationY - paddingY
    const idx = Math.max(0, Math.min(navItems.length - 1, Math.floor(y / itemHeight)))
    return navItems[idx] || null
  }, [layout.paddingVertical, navItems])

  const shouldHandleResponder = useCallback((evt: GestureResponderEvent) => {
    if (!navItems.length) return false
    const locationY = evt?.nativeEvent?.locationY
    if (!isFiniteNumber(locationY)) return false
    if (navItemOffsetsRef.current.length) return true
    return indexListHeightRef.current > 0
  }, [navItems.length])

  const handleResponderGrant = useCallback((evt: GestureResponderEvent) => {
    const picked = pickIndexFromEvent(evt)
    draggingIndexRef.current = picked
    if (picked !== null) {
      setInteractionIndex(picked)
      selectIndex(picked, true)
    }
  }, [pickIndexFromEvent, selectIndex])

  const handleResponderMove = useCallback((evt: GestureResponderEvent) => {
    const picked = pickIndexFromEvent(evt)
    if (picked === null) return
    if (picked === draggingIndexRef.current) return
    draggingIndexRef.current = picked
    setInteractionIndex(picked)
    selectIndex(picked, false)
  }, [pickIndexFromEvent, selectIndex])

  const handleResponderRelease = useCallback(() => {
    draggingIndexRef.current = null
    hideIndicatorNow()
    setInteractionIndex(null)
  }, [hideIndicatorNow])

  const StickyWrapper = safeAreaInsetTop ? SafeAreaView : View
  const stickyWrapperStyle = [styles.stickyWrapper, { top: stickyOffsetTop, zIndex }]
  const handleIndexListLayout = useCallback((e: { nativeEvent: { layout: { height: number } } }) => {
    const { height } = e.nativeEvent.layout
    indexListHeightRef.current = height
  }, [])

  const anchorNodes = useMemo(() => anchors.map(anchor =>
    React.cloneElement(anchor, {
      key: anchor.key ?? anchor.props.index,
      active: anchor.props.index === displayIndex,
      highlightColor: highlight,
      onLayoutCapture: handleAnchorLayout,
    }),
  ), [anchors, displayIndex, handleAnchorLayout, highlight])

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
      {sticky && stickyVisible && stickyNode && <StickyWrapper style={stickyWrapperStyle}>{stickyNode}</StickyWrapper>}
      <View
        testID="rv-indexbar-nav-list"
        style={[
          styles.indexList,
          {
            width: layout.indexWidth,
            paddingVertical: layout.paddingVertical,
            paddingHorizontal: layout.indexListPaddingHorizontal,
            zIndex,
          },
        ]}
        onLayout={handleIndexListLayout}
        onStartShouldSetResponder={() => false}
        onMoveShouldSetResponder={evt => shouldHandleResponder(evt)}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={evt => shouldHandleResponder(evt)}
        onResponderGrant={handleResponderGrant}
        onResponderStart={handleResponderGrant}
        onResponderMove={handleResponderMove}
        onResponderRelease={handleResponderRelease}
        onResponderTerminate={handleResponderRelease}
      >
        {navItems.map(item => {
          const isActive = item === displayIndex
          const node = itemRender?.(item, isActive)
          return (
            <Pressable
              key={String(item)}
              testID={`rv-indexbar-nav-${String(item)}`}
              style={[
                styles.indexItem,
                {
                  paddingVertical: layout.indexItemPaddingVertical,
                  paddingHorizontal: layout.indexItemPaddingHorizontal,
                },
              ]}
              hitSlop={layout.spacing}
              onLayout={event => handleIndexItemLayout(item, event)}
              onPress={() => handlePressIn(item)}
              onPressIn={() => handlePressIn(item)}
              onPressOut={handlePressOut}
            >
              {node ?? (
                <Text
                  style={[
                    styles.indexText,
                    { color: isActive ? highlight : colors.text, fontSize: typography.indexTextSize },
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
  },
  indexItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
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
  },
  stickyText: {
    fontWeight: '600',
  },
})

IndexBarBase.displayName = 'IndexBar'

export default IndexBarBase
