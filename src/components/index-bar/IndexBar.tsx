import React from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import type { IndexAnchorProps, IndexBarProps } from './types'
import { useIndexBarTokens } from './tokens'

interface ParsedAnchor {
  element: React.ReactElement<IndexAnchorProps>
  index: string
  title?: React.ReactNode
}

const IndexBarBase: React.FC<IndexBarProps> = props => {
  const {
    children,
    value,
    defaultValue,
    highlightColor,
    sticky = true,
    showIndicator = true,
    indicatorStyle,
    indexTextStyle,
    safeAreaInsetTop = false,
    onChange,
    style,
    ...rest
  } = props

  const tokens = useIndexBarTokens()
  const scrollRef = React.useRef<ScrollView>(null)
  const anchorLayouts = React.useRef<Map<string, number>>(new Map())

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

  const firstIndex = anchors[0]?.index
  const [activeIndex, setActiveIndex] = useControllableValue<string>(props, {
    defaultValue: firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex = React.useMemo(() => {
    if (!activeIndex) return firstIndex
    const exists = anchors.some(anchor => anchor.index === activeIndex)
    return exists ? activeIndex : firstIndex
  }, [activeIndex, anchors, firstIndex])

  const [indicator, setIndicator] = React.useState<{ visible: boolean; label?: string }>({
    visible: false,
  })

  const handleAnchorLayout = React.useCallback((index: string, layoutY: number) => {
    anchorLayouts.current.set(index, layoutY)
  }, [])

  const scrollToIndex = React.useCallback(
    (index: string) => {
      const y = anchorLayouts.current.get(index)
      if (y !== undefined) {
        scrollRef.current?.scrollTo({ y, animated: true })
      }
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const handleScroll = React.useCallback(
    (event: any) => {
      const offsetY = event?.nativeEvent?.contentOffset?.y ?? 0
      const sorted = [...anchorLayouts.current.entries()].sort((a, b) => a[1] - b[1])
      let current = sorted[0]?.[0]
      for (const [index, layoutY] of sorted) {
        if (offsetY + 1 >= layoutY) {
          current = index
        }
      }
      if (current && current !== currentIndex) {
        setActiveIndex(current)
      }
    },
    [currentIndex, setActiveIndex]
  )

  const handlePressIn = (index: string) => {
    if (showIndicator) {
      setIndicator({ visible: true, label: index })
    }
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
          <SafeAreaView style={styles.stickyWrapper}>{stickyNode}</SafeAreaView>
        ) : (
          <View style={styles.stickyWrapper}>{stickyNode}</View>
        )
      ) : null}
      <View
        style={[
          styles.indexList,
          {
            paddingVertical: tokens.layout.paddingVertical,
          },
        ]}
      >
        {anchors.map(anchor => {
          const isActive = anchor.index === currentIndex
          return (
            <Pressable
              key={anchor.index}
              testID={`rv-indexbar-nav-${anchor.index}`}
              style={styles.indexItem}
              onPressIn={() => handlePressIn(anchor.index)}
              onPressOut={handlePressOut}
            >
              <Text
                style={[
                  styles.indexText,
                  { color: isActive ? highlight : tokens.colors.text },
                  indexTextStyle,
                ]}
              >
                {anchor.index}
              </Text>
            </Pressable>
          )
        })}
      </View>
      {indicatorNode}
    </View>
  )
}

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
