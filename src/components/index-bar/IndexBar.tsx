import React from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
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
  const anchorLayouts = React.useRef<Map<IndexBarValue, number>>(new Map())

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

  const handleAnchorLayout = React.useCallback((index: IndexBarValue, layoutY: number) => {
    anchorLayouts.current.set(index, layoutY)
  }, [])

  const scrollToIndex = React.useCallback(
    (index: IndexBarValue) => {
      const y = anchorLayouts.current.get(index)
      if (y !== undefined) {
        const offset = sticky ? tokens.layout.stickyHeight + stickyOffsetTop : 0
        scrollRef.current?.scrollTo({ y: Math.max(0, y - offset), animated: true })
      }
      setActiveIndex(index)
    },
    [setActiveIndex, sticky, stickyOffsetTop, tokens.layout.stickyHeight]
  )

  React.useImperativeHandle(ref, () => ({ scrollTo: scrollToIndex }), [scrollToIndex])

  const handleScroll = React.useCallback(
    (event: any) => {
      const offsetY = event?.nativeEvent?.contentOffset?.y ?? 0
      const sorted = [...anchorLayouts.current.entries()].sort((a, b) => a[1] - b[1])
      let current = sorted[0]?.[0]
      const threshold = sticky ? tokens.layout.stickyHeight + stickyOffsetTop : 0
      for (const [index, layoutY] of sorted) {
        if (offsetY + threshold + 1 >= layoutY) {
          current = index
        }
      }
      if (current !== undefined && current !== null && current !== currentIndex) {
        setActiveIndex(current)
      }
    },
    [currentIndex, setActiveIndex, sticky, stickyOffsetTop, tokens.layout.stickyHeight]
  )

  const handlePressIn = (index: IndexBarValue) => {
    if (showIndicator) {
      setIndicator({ visible: true, label: String(index) })
    }
    onSelect?.(index)
    scrollToIndex(index)
  }

  const handlePressOut = () => {
    if (showIndicator) {
      setIndicator(prev => (prev.visible ? { visible: false } : prev))
    }
  }

  if (anchors.length === 0) {
    return null
  }

  const highlight = highlightColor ?? tokens.colors.activeText
  const activeAnchor = anchors.find(anchor => anchor.index === currentIndex)

  const stickyNode = sticky && activeAnchor ? (
    <View
      style={[
        styles.sticky,
        {
          backgroundColor: tokens.colors.stickyBackground,
          height: tokens.layout.stickyHeight,
          borderBottomColor: tokens.colors.border,
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
        },
        indicatorStyle,
      ]}
    >
      <Text style={[styles.indicatorText, { color: tokens.colors.indicatorText }]}>{indicator.label}</Text>
    </View>
  ) : null

  return (
    <View {...rest} style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sticky ? { paddingTop: tokens.layout.stickyHeight } : undefined}
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
      {sticky ? (
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
            paddingVertical: tokens.layout.paddingVertical,
            zIndex,
          },
        ]}
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
    paddingHorizontal: 4,
  },
  indexItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  indexText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    right: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stickyText: {
    fontSize: 16,
    fontWeight: '600',
  },
})

IndexBarBase.displayName = 'IndexBar'

export default IndexBarBase
