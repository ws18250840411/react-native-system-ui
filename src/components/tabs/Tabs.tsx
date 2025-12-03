import React from 'react'
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native'

import { useAriaPress, useControllableValue } from '../../hooks'
import Sticky from '../sticky'
import type { TabPaneProps, TabsProps, TabsValue } from './types'
import { useTabsTokens } from './tokens'

const AnimatedIndicator = Animated.View

interface ParsedPane extends TabPaneProps {
  key: React.Key
  name: TabsValue
  index: number
}

const isTabPaneElement = (child: React.ReactNode): child is React.ReactElement<TabPaneProps> =>
  React.isValidElement(child)

interface TabItemProps {
  pane: ParsedPane
  isActive: boolean
  align: TabsProps['align']
  scrollable: boolean
  type: TabsProps['type']
  ellipsis: boolean
  tokens: ReturnType<typeof useTabsTokens>
  color?: string
  titleActiveColor?: string
  titleInactiveColor?: string
  tabStyle?: TabsProps['tabStyle']
  titleStyle?: TabsProps['titleStyle']
  descriptionStyle?: TabsProps['descriptionStyle']
  onSelect: (pane: ParsedPane) => void
  onLayout: (event: LayoutChangeEvent) => void
}

const TabBarItem: React.FC<TabItemProps> = ({
  pane,
  isActive,
  align,
  scrollable,
  type,
  ellipsis,
  tokens,
  color,
  titleActiveColor,
  titleInactiveColor,
  tabStyle,
  titleStyle,
  descriptionStyle,
  onSelect,
  onLayout,
}) => {
  const isDisabled = !!pane.disabled
  const ariaPress = useAriaPress({
    disabled: isDisabled,
    onPress: () => onSelect(pane),
    extraProps: {
      accessibilityRole: 'tab',
      accessibilityState: { selected: isActive, disabled: isDisabled },
      testID: `rv-tabs-item-${pane.name}`,
    },
  })

  const isCapsule = type === 'capsule'
  const isJumbo = type === 'jumbo'

  const textColor = isActive
    ? titleActiveColor ?? color ?? (isCapsule ? tokens.colors.capsuleActiveText : tokens.colors.textActive)
    : titleInactiveColor ?? (isCapsule ? tokens.colors.capsuleText : tokens.colors.text)

  const descriptionColor = isDisabled
    ? tokens.colors.textDisabled
    : isActive
      ? tokens.colors.descriptionActive
      : tokens.colors.description

  return (
    <Pressable
      {...ariaPress.interactionProps}
      onLayout={onLayout}
      style={[
        styles.tabItem,
        {
          minHeight: isCapsule ? tokens.capsule.minHeight : tokens.nav.height,
          paddingHorizontal:
            type === 'card'
              ? tokens.card.paddingHorizontal
              : isCapsule
                ? tokens.capsule.paddingHorizontal
                : tokens.nav.paddingHorizontal / 2,
          paddingVertical:
            type === 'card'
              ? tokens.card.paddingVertical
              : isCapsule
                ? tokens.capsule.paddingVertical
                : tokens.nav.paddingVertical,
          opacity: isDisabled ? 0.45 : 1,
        },
        !scrollable && align === 'center' ? styles.flexItem : null,
        tabStyle,
        type === 'card' && {
          borderRadius: tokens.card.radius,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: isActive ? tokens.colors.cardActiveBorder : tokens.colors.cardBorder,
          backgroundColor: isActive
            ? tokens.colors.cardActiveBackground
            : tokens.colors.cardBackground,
        },
        isCapsule && {
          borderRadius: tokens.capsule.radius,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: isActive ? tokens.colors.capsuleActiveBorder : tokens.colors.capsuleBorder,
          backgroundColor: isActive
            ? tokens.colors.capsuleActiveBackground
            : tokens.colors.capsuleBackground,
        },
        isJumbo && {
          borderRadius: tokens.jumbo.radius,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: isActive ? tokens.colors.jumboActiveBorder : tokens.colors.jumboBorder,
          backgroundColor: isActive
            ? tokens.colors.jumboActiveBackground
            : tokens.colors.jumboBackground,
          alignItems: 'flex-start',
          paddingHorizontal: tokens.jumbo.paddingHorizontal,
          paddingVertical: tokens.jumbo.paddingVertical,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: textColor,
            fontSize: tokens.typography.titleSize,
            fontWeight: tokens.typography.titleWeight,
          },
          ellipsis && !isJumbo ? styles.ellipsis : null,
          titleStyle,
        ]}
        numberOfLines={ellipsis && !isJumbo ? 1 : undefined}
      >
        {pane.title ?? pane.name}
      </Text>
      {pane.description ? (
        <Text
          style={[
            styles.description,
            {
              color: descriptionColor,
              fontSize: tokens.typography.descriptionSize,
              marginTop: isJumbo ? 8 : 2,
            },
            descriptionStyle,
          ]}
        >
          {pane.description}
        </Text>
      ) : null}
      {pane.badge ? <View style={styles.badge}>{pane.badge}</View> : null}
    </Pressable>
  )
}

const TabsBase: React.FC<TabsProps> = props => {
  const tokens = useTabsTokens()
  const {
    children,
    type = tokens.defaults.type,
    align = tokens.defaults.align,
    ellipsis = tokens.defaults.ellipsis,
    swipeThreshold = tokens.defaults.swipeThreshold,
    animated = tokens.defaults.animated,
    duration = tokens.defaults.duration,
    lazyRender = tokens.defaults.lazyRender,
    scrollable: scrollableProp,
    sticky = false,
    offsetTop,
    scrollValue,
    enableStickyShadow = tokens.defaults.enableStickyShadow,
    color,
    background = tokens.nav.background,
    border,
    navLeft,
    navRight,
    navBottom,
    tabBarStyle,
    tabStyle,
    titleStyle,
    descriptionStyle,
    contentStyle,
    lineWidth,
    lineHeight,
    titleActiveColor,
    titleInactiveColor,
    beforeChange,
    onClickTab,
    onScroll,
    style,
    ...rest
  } = props

  const resolveNumericValue = (val?: number | string): number | undefined => {
    if (typeof val === 'number') {
      return val
    }
    if (typeof val === 'string') {
      const parsed = Number(val)
      if (!Number.isNaN(parsed)) {
        return parsed
      }
    }
    return undefined
  }

  const resolvedLineWidth = resolveNumericValue(lineWidth)
  const resolvedLineHeight = resolveNumericValue(lineHeight) ?? tokens.indicator.height

  const panes = React.useMemo<ParsedPane[]>(() => {
    return React.Children.toArray(children)
      .map((child, index) => {
        if (!isTabPaneElement(child)) return null
        const paneProps = child.props
        const name = paneProps.name ?? index
        return {
          ...paneProps,
          key: child.key ?? name,
          name,
          index,
        }
      })
      .filter(Boolean) as ParsedPane[]
  }, [children])

  const firstPaneName = panes[0]?.name
  const [activeValue, setActiveValue] = useControllableValue<TabsValue>(props, {
    defaultValue: firstPaneName,
    valuePropName: 'active',
    defaultValuePropName: 'defaultActive',
    trigger: 'onChange',
  })

  const currentName = React.useMemo(() => {
    if (activeValue === undefined || activeValue === null) {
      return firstPaneName
    }
    const exists = panes.some(pane => pane.name === activeValue)
    return exists ? activeValue : firstPaneName
  }, [activeValue, firstPaneName, panes])

  const activeIndex = React.useMemo(() => {
    return panes.findIndex(pane => pane.name === currentName)
  }, [currentName, panes])

  const visitedRef = React.useRef<Set<TabsValue>>(new Set())
  React.useEffect(() => {
    if (currentName === undefined || currentName === null) return
    visitedRef.current.add(currentName)
  }, [currentName])

  const indicatorX = React.useRef(new Animated.Value(0)).current
  const indicatorWidth = React.useRef(new Animated.Value(0)).current
  const layoutMap = React.useRef<Map<TabsValue, { x: number; width: number }>>(new Map())
  const navScrollRef = React.useRef<ScrollView>(null)
  const navContainerWidthRef = React.useRef(0)
  const indicatorInitializedRef = React.useRef(false)

  const scrollable = React.useMemo(() => {
    if (typeof scrollableProp === 'boolean') {
      return scrollableProp
    }
    return panes.length > swipeThreshold
  }, [panes.length, scrollableProp, swipeThreshold])

  const indicatorColor = color ?? tokens.colors.indicator
  const indicatorCornerRadius = resolvedLineHeight ? resolvedLineHeight / 2 : tokens.indicator.radius

  const animateIndicator = React.useCallback(
    (name?: TabsValue, immediate?: boolean) => {
      if (!name || type !== 'line') return false
      const layout = layoutMap.current.get(name)
      if (!layout) return false
      const timing = (value: Animated.Value, toValue: number) =>
        Animated.timing(value, {
          toValue,
          duration: immediate || !animated ? 0 : duration,
          useNativeDriver: false,
        })
      const targetWidth = resolvedLineWidth ?? layout.width
      const targetX = resolvedLineWidth
        ? layout.x + (layout.width - targetWidth) / 2
        : layout.x
      Animated.parallel([
        timing(indicatorX, targetX),
        timing(indicatorWidth, targetWidth),
      ]).start()
      return true
    },
    [animated, duration, indicatorWidth, indicatorX, resolvedLineWidth, type],
  )

  const scrollIntoView = React.useCallback(
    (name?: TabsValue) => {
      if (!scrollable || !name) return
      const layout = layoutMap.current.get(name)
      const containerWidth = navContainerWidthRef.current
      if (!layout || !containerWidth) return
      const target = Math.max(layout.x + layout.width / 2 - containerWidth / 2, 0)
      navScrollRef.current?.scrollTo({ x: target, animated: true })
    },
    [scrollable],
  )

  React.useEffect(() => {
    if (currentName === undefined || currentName === null) return
    const shouldAnimate = indicatorInitializedRef.current
    const didAnimate = animateIndicator(currentName, !shouldAnimate)
    if (didAnimate && !indicatorInitializedRef.current) {
      indicatorInitializedRef.current = true
    }
    scrollIntoView(currentName)
  }, [animateIndicator, currentName, scrollIntoView])

  React.useEffect(() => {
    if (sticky && !scrollValue) {
      console.warn('[Tabs] sticky 模式需要传入 scrollValue（来自 useGestureScroll）。')
    }
  }, [scrollValue, sticky])

  const handleTabLayout = React.useCallback((name: TabsValue, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout
    layoutMap.current.set(name, { x, width })
    if (name === currentName) {
      const shouldAnimate = indicatorInitializedRef.current
      const didAnimate = animateIndicator(name, !shouldAnimate)
      if (didAnimate && !indicatorInitializedRef.current) {
        indicatorInitializedRef.current = true
      }
    }
  }, [animateIndicator, currentName])

  const handleNavLayout = (event: LayoutChangeEvent) => {
    navContainerWidthRef.current = event.nativeEvent.layout.width
  }

  const runBeforeChange = React.useCallback(
    (name: TabsValue, index: number) => {
      if (!beforeChange) {
        return Promise.resolve(true)
      }
      try {
        const result = beforeChange(name, index)
        if (typeof result === 'boolean' || result === undefined) {
          return Promise.resolve(result !== false)
        }
        if (result && typeof (result as Promise<boolean>).then === 'function') {
          return (result as Promise<boolean>).then(res => res !== false)
        }
        return Promise.resolve(true)
      } catch (error) {
        console.warn('[Tabs] beforeChange 抛出异常：', error)
        return Promise.resolve(false)
      }
    },
    [beforeChange],
  )

  const handleSelect = (pane: ParsedPane, index: number) => {
    if (pane.disabled || pane.name === currentName) {
      onClickTab?.({
        name: pane.name,
        index,
        disabled: !!pane.disabled,
        title: pane.title,
      })
      return
    }
    onClickTab?.({
      name: pane.name,
      index,
      disabled: !!pane.disabled,
      title: pane.title,
    })
    if (!beforeChange) {
      setActiveValue(pane.name, index)
      return
    }
    runBeforeChange(pane.name, index).then(canChange => {
      if (!canChange) {
        return
      }
      setActiveValue(pane.name, index)
    })
  }

  const borderEnabled = border ?? (type === 'line')
  const showIndicator = type === 'line'

  if (panes.length === 0) {
    return null
  }

  const navContent = (
    <View
      style={[
        styles.navContainer,
        borderEnabled && type === 'line'
          ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: tokens.colors.border }
          : null,
        { backgroundColor: background },
        tabBarStyle,
      ]}
      onLayout={handleNavLayout}
    >
      {navLeft ? <View style={styles.navSide}>{navLeft}</View> : null}
      <View style={styles.navTrack}>
        <ScrollView
          horizontal
          ref={navScrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.navInner,
            {
              paddingHorizontal: scrollable ? tokens.nav.paddingHorizontal / 2 : tokens.nav.paddingHorizontal,
              columnGap: tokens.nav.gap,
              justifyContent: scrollable
                ? 'flex-start'
                : align === 'start'
                  ? 'flex-start'
                  : 'space-around',
            },
          ]}
        >
          {panes.map(pane => (
            <TabBarItem
              key={pane.key}
              pane={pane}
              isActive={pane.name === currentName}
              align={align}
              scrollable={scrollable}
              type={type}
              ellipsis={ellipsis}
              tokens={tokens}
              color={color}
              titleActiveColor={titleActiveColor}
              titleInactiveColor={titleInactiveColor}
              tabStyle={tabStyle}
              titleStyle={titleStyle}
              descriptionStyle={descriptionStyle}
              onSelect={currentPane => handleSelect(currentPane, currentPane.index)}
              onLayout={event => handleTabLayout(pane.name, event)}
            />
          ))}
        </ScrollView>
        {showIndicator ? (
          <AnimatedIndicator
            testID="rv-tabs-indicator"
            style={[
              styles.indicator,
              {
                height: resolvedLineHeight,
                borderRadius: indicatorCornerRadius,
                backgroundColor: indicatorColor,
                width: indicatorWidth,
                transform: [{ translateX: indicatorX }],
              },
            ]}
          />
        ) : null}
      </View>
      {navRight ? <View style={styles.navSide}>{navRight}</View> : null}
    </View>
  )

  const wrappedNav = sticky ? (
    <Sticky
      scrollValue={scrollValue}
      offsetTop={offsetTop}
      enableShadow={enableStickyShadow}
      onScroll={onScroll}
      backgroundColor={background}
    >
      {navContent}
    </Sticky>
  ) : (
    navContent
  )

  return (
    <View {...rest} style={[styles.container, style]}>
      {wrappedNav}
      {navBottom ? <View style={styles.navBottom}>{navBottom}</View> : null}
      <View style={[styles.content, contentStyle]}>
        {panes.map(pane => {
          const isActive = pane.name === currentName
          const shouldRender = !lazyRender || isActive || visitedRef.current.has(pane.name)
          if (!shouldRender) {
            return null
          }
          return (
            <View
              key={pane.key}
              testID={`rv-tabs-pane-${pane.name}`}
              style={[styles.pane, !isActive && styles.hiddenPane]}
            >
              {pane.children}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  navTrack: {
    flex: 1,
    position: 'relative',
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navSide: {
    paddingHorizontal: 8,
  },
  navBottom: {
    marginTop: 8,
  },
  tabItem: {
    flexShrink: 0,
  },
  flexItem: {
    flexGrow: 1,
  },
  title: {
    includeFontPadding: false,
  },
  description: {
    marginTop: 2,
    includeFontPadding: false,
  },
  ellipsis: {
    maxWidth: 120,
  },
  badge: {
    marginTop: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  content: {
    marginTop: 12,
  },
  pane: {
    width: '100%',
  },
  hiddenPane: {
    display: 'none',
  },
})

TabsBase.displayName = 'Tabs'

export default TabsBase
