import React from 'react'
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useAriaPress, useControllableValue } from '../../hooks'
import type { TabPaneProps, TabsProps, TabsRef, TabsValue } from './types'
import { useTabsTokens } from './tokens'

const AnimatedIndicator = Animated.View
const AnimatedScrollView = Animated.ScrollView
const requestFrame =
  typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : (cb: (time?: number) => void) => setTimeout(cb, 16)
const SCROLLSPY_SCROLL_TEST_ID = 'rv-tabs-scrollspy'

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
  isLast: boolean
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
  isLast,
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
  const isCard = type === 'card'
  const renderTitle = React.useMemo(
    () => (typeof pane.title === 'function' ? pane.title(isActive) : pane.title ?? pane.name),
    [isActive, pane.name, pane.title],
  )
  const renderDescription = React.useMemo(
    () => (typeof pane.description === 'function' ? pane.description(isActive) : pane.description),
    [isActive, pane.description],
  )

  const activeTitleColor = titleActiveColor ?? (isCard ? '#ffffff' : isCapsule ? tokens.colors.capsuleActiveText : color ?? tokens.colors.textActive)
  const inactiveTitleColor = titleInactiveColor ?? (isCard ? color ?? tokens.colors.cardBorder : isCapsule ? tokens.colors.capsuleText : tokens.colors.text)
  const textColor = pane.disabled ? tokens.colors.textDisabled : isActive ? activeTitleColor : inactiveTitleColor

  const descriptionColor = isDisabled
    ? tokens.colors.textDisabled
    : isJumbo
      ? isActive
        ? tokens.colors.jumboDescriptionActive
        : tokens.colors.jumboDescription
      : isActive
        ? tokens.colors.descriptionActive
        : tokens.colors.description

  const shouldFlex = !scrollable && (align !== 'start' || isCard)
  const horizontalPadding = isCard || isJumbo ? 0 : isCapsule ? 0 : tokens.tabList.paddingHorizontal
  const verticalPadding = isCard || isJumbo ? 0 : isCapsule ? 0 : tokens.tabList.paddingVertical
  const labelWrapperStyles = [styles.labelWrapper]
  if (isJumbo) {
    labelWrapperStyles.push(styles.labelWrapperJumbo)
  }
  if (isCard) {
    labelWrapperStyles.push(styles.cardLabel)
    labelWrapperStyles.push({
      paddingHorizontal: tokens.card.paddingHorizontal,
      paddingVertical: tokens.card.paddingVertical,
      backgroundColor: isActive
        ? color ?? tokens.colors.cardActiveBackground
        : tokens.colors.cardBackground,
    })
  }
  if (isCapsule) {
    labelWrapperStyles.push({
      paddingHorizontal: 8,
      paddingVertical: 4,
    })
  }
  if (isJumbo) {
    labelWrapperStyles.push({
      paddingHorizontal: tokens.jumbo.paddingHorizontal,
      paddingVertical: tokens.jumbo.paddingVertical,
      alignItems: 'center',
    })
  }

  return (
    <Pressable
      {...ariaPress.interactionProps}
      onLayout={onLayout}
      style={[
        styles.tabItem,
        shouldFlex ? styles.flexItem : null,
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
        },
        isCard
          ? {
            borderRightWidth: isLast ? 0 : StyleSheet.hairlineWidth,
            borderRightColor: color ?? tokens.colors.cardBorder,
          }
          : null,
        tabStyle,
      ]}
    >
      <View style={labelWrapperStyles}>
        <Text
          style={[
            styles.title,
            isCapsule
              ? {
                borderRadius: tokens.capsule.radius,
                backgroundColor: isActive
                  ? color ?? tokens.colors.capsuleActiveBackground
                  : tokens.colors.capsuleBackground,
                color: textColor,
                fontSize: tokens.typography.titleSize,
                fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight,
                textAlign: 'center',
                width: '100%',
                height: '100%',
                paddingVertical: tokens.capsule.paddingVertical,
              }
              : {
                color: textColor,
                fontSize: isJumbo ? tokens.typography.jumboTitleSize : tokens.typography.titleSize,
                fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight,
                lineHeight: isJumbo ? tokens.typography.jumboLineHeight : undefined,
                textAlign: 'center',
              },
            ellipsis && !isJumbo ? styles.ellipsis : null,
            titleStyle,
          ]}
          numberOfLines={ellipsis && !isJumbo ? 1 : undefined}
        >
          {renderTitle}
        </Text>
        {renderDescription ? (
          <Text
            style={[
              styles.description,
              isJumbo
                ? {
                  color: descriptionColor,
                  fontSize: tokens.typography.descriptionSize,
                  marginTop: 8,
                  textAlign: 'center',
                  backgroundColor: isActive
                    ? tokens.colors.jumboDescriptionActiveBackground
                    : tokens.colors.jumboDescriptionBackground,
                  paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal,
                  paddingVertical: tokens.jumbo.descriptionPaddingVertical,
                  borderRadius: tokens.jumbo.descriptionRadius,
                }
                : {
                  color: descriptionColor,
                  fontSize: tokens.typography.descriptionSize,
                  marginTop: 2,
                  textAlign: 'center',
                },
              descriptionStyle,
            ]}
          >
            {renderDescription}
          </Text>
        ) : null}
        {pane.badge ? (
          <View style={styles.badge}>
            {typeof pane.badge === 'string' || typeof pane.badge === 'number' ? (
              <Text style={styles.badgeText}>{pane.badge}</Text>
            ) : (
              pane.badge
            )}
          </View>
        ) : null}
      </View>
    </Pressable>
  )
}

const TabsBaseInner: React.ForwardRefRenderFunction<TabsRef, TabsProps> = (props, ref) => {
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
    lazyRenderPlaceholder,
    scrollable: scrollableProp,
    scrollspy,
    swipeable,
    color,
    background = tokens.tabList.background,
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
    onChange: _onChange,
    style,
    ...rest
  } = props
  // 防止 onChange 透传到原生 View，同时避免未使用警告
  void _onChange

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

  const fallbackLineWidth = lineWidth ?? tokens.indicator.width
  const resolvedLineWidth = resolveNumericValue(fallbackLineWidth)
  const resolvedLineHeight = resolveNumericValue(lineHeight) ?? tokens.indicator.height
  const swipeableConfig = React.useMemo(() => {
    if (!swipeable) {
      return undefined
    }
    if (typeof swipeable === 'object') {
      return {
        autoHeight: swipeable.autoHeight ?? true,
        preventScroll: swipeable.preventScroll ?? true,
      }
    }
    return {
      autoHeight: true,
      preventScroll: true,
    }
  }, [swipeable])
  const isSwipeable = !!swipeableConfig
  const isScrollspy = !!scrollspy && !isSwipeable
  const scrollspyOptions = React.useMemo(() => {
    if (!isScrollspy) {
      return undefined
    }
    if (typeof scrollspy === 'object') {
      return {
        autoFocusLast: scrollspy.autoFocusLast ?? false,
        reachBottomThreshold: scrollspy.reachBottomThreshold ?? 0,
        scrollImmediate: scrollspy.scrollImmediate ?? true,
      }
    }
    return {
      autoFocusLast: false,
      reachBottomThreshold: 0,
      scrollImmediate: true,
    }
  }, [isScrollspy, scrollspy])

  React.useEffect(() => {
    if (scrollspy && isSwipeable) {
      console.warn('[Tabs] swipeable 模式与 scrollspy 互斥，已忽略 scrollspy 配置。')
    }
  }, [scrollspy, isSwipeable])

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

  React.useEffect(() => {
    paneLayoutMap.current.clear()
  }, [panes])

  const shouldTrackPaneLayouts = isScrollspy || (isSwipeable && swipeableConfig?.autoHeight)

  React.useEffect(() => {
    if (!shouldTrackPaneLayouts) {
      paneLayoutMap.current.clear()
    }
  }, [shouldTrackPaneLayouts])

  React.useEffect(() => {
    if (!isSwipeable || !swipeableConfig?.autoHeight) {
      setSwipeableHeight(undefined)
      return
    }
    const layout = currentName != null ? paneLayoutMap.current.get(currentName) : undefined
    if (layout) {
      setSwipeableHeight(layout.height)
    } else {
      setSwipeableHeight(undefined)
    }
  }, [currentName, isSwipeable, swipeableConfig?.autoHeight])

  const indicatorX = React.useRef(new Animated.Value(0)).current
  const indicatorWidth = React.useRef(new Animated.Value(0)).current
  const layoutMap = React.useRef<Map<TabsValue, { x: number; width: number }>>(new Map())
  const navScrollRef = React.useRef<ScrollView>(null)
  const navContainerWidthRef = React.useRef(0)
  const navContentWidthRef = React.useRef(0)
  const indicatorInitializedRef = React.useRef(false)
  const paneLayoutMap = React.useRef<Map<TabsValue, { y: number; height: number }>>(new Map())
  const scrollspyScrollRef = React.useRef<Animated.ScrollView | null>(null)
  const scrollspyLockRef = React.useRef(false)
  const scrollspyLockTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollspyChangeByScrollRef = React.useRef(false)
  const swipeableScrollRef = React.useRef<Animated.ScrollView | null>(null)
  const swipeableChangeByScrollRef = React.useRef(false)
  const navHeightRef = React.useRef(0)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [swipeableHeight, setSwipeableHeight] = React.useState<number | undefined>(undefined)

  const scrollable = React.useMemo(() => {
    if (typeof scrollableProp === 'boolean') {
      return scrollableProp
    }
    // 与 web 版逻辑一致：超过阈值或禁止省略时横向滚动
    return panes.length > swipeThreshold || !ellipsis
  }, [ellipsis, panes.length, scrollableProp, swipeThreshold])

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
    (name?: TabsValue, immediate?: boolean) => {
      if (!scrollable || !name) return
      const layout = layoutMap.current.get(name)
      const containerWidth = navContainerWidthRef.current
      if (!layout || !containerWidth) return
      const rawTarget = layout.x + layout.width / 2 - containerWidth / 2
      const maxScroll =
        navContentWidthRef.current > containerWidth
          ? navContentWidthRef.current - containerWidth
          : 0
      const target = Math.min(Math.max(rawTarget, 0), maxScroll)
      const animatedScroll = !immediate && +duration > 0
      requestFrame(() => {
        navScrollRef.current?.scrollTo({ x: target, animated: animatedScroll })
      })
    },
    [duration, scrollable],
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

  React.useEffect(
    () => () => {
      if (scrollspyLockTimerRef.current) {
        clearTimeout(scrollspyLockTimerRef.current)
        scrollspyLockTimerRef.current = null
      }
    },
    [],
  )

  const handleTabLayout = React.useCallback(
    (name: TabsValue, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout
      layoutMap.current.set(name, { x, width })
      // 如果激活项布局变化，立即重算指示线并同步 nav 居中
      if (name === currentName) {
        const shouldAnimate = indicatorInitializedRef.current
        const didAnimate = animateIndicator(name, !shouldAnimate)
        if (didAnimate && !indicatorInitializedRef.current) {
          indicatorInitializedRef.current = true
        }
        scrollIntoView(name, true)
      }
    },
    [animateIndicator, currentName, scrollIntoView],
  )

  const handleNavLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    navContainerWidthRef.current = width
    if (isScrollspy) {
      navHeightRef.current = height
    }
  }

  const handleContainerLayout = React.useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])

  const getScrollspyOffset = React.useCallback(() => {
    if (!isScrollspy) {
      return 0
    }
    return navHeightRef.current
  }, [isScrollspy])

  const releaseScrollspyLock = React.useCallback(() => {
    if (scrollspyLockTimerRef.current) {
      clearTimeout(scrollspyLockTimerRef.current)
      scrollspyLockTimerRef.current = null
    }
    scrollspyLockRef.current = false
  }, [])

  React.useEffect(() => {
    if (!isScrollspy) {
      releaseScrollspyLock()
    }
  }, [isScrollspy, releaseScrollspyLock])

  const engageScrollspyLock = React.useCallback(
    (durationMs?: number) => {
      if (!isScrollspy) {
        return
      }
      if (scrollspyLockTimerRef.current) {
        clearTimeout(scrollspyLockTimerRef.current)
        scrollspyLockTimerRef.current = null
      }
      scrollspyLockRef.current = true
      if (typeof durationMs === 'number' && durationMs > 0) {
        const timeout = Math.max(durationMs, 0) + 32
        scrollspyLockTimerRef.current = setTimeout(() => {
          scrollspyLockRef.current = false
          scrollspyLockTimerRef.current = null
        }, timeout)
      }
    },
    [isScrollspy],
  )

  const scrollToPane = React.useCallback(
    (targetName?: TabsValue, immediateOverride?: boolean) => {
      if (!isScrollspy || !targetName) {
        return
      }
      const scrollView = scrollspyScrollRef.current
      const layout = paneLayoutMap.current.get(targetName)
      if (!scrollView || !layout) {
        return
      }
      const node: any =
        (scrollView as unknown as { scrollTo?: (options: { x?: number; y?: number; animated?: boolean }) => void }) ??
        scrollView.getNode?.()
      if (!node?.scrollTo) {
        return
      }
      const offset = Math.max(layout.y - getScrollspyOffset(), 0)
      const immediate = immediateOverride ?? scrollspyOptions?.scrollImmediate ?? true
      const animatedScroll = !immediate
      if (animatedScroll) {
        engageScrollspyLock(duration)
      } else {
        engageScrollspyLock()
      }
      node.scrollTo({ x: 0, y: offset, animated: animatedScroll })
      if (!animatedScroll || !duration) {
        requestFrame(() => releaseScrollspyLock())
      }
    },
    [duration, engageScrollspyLock, getScrollspyOffset, isScrollspy, releaseScrollspyLock, scrollspyOptions?.scrollImmediate],
  )

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

  const handlePaneLayout = React.useCallback(
    (name: TabsValue, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout
      if (isScrollspy) {
        paneLayoutMap.current.set(name, { y, height })
        if (name === currentName) {
          scrollToPane(name, true)
        }
        return
      }
      if (isSwipeable && swipeableConfig?.autoHeight) {
        paneLayoutMap.current.set(name, { y: 0, height })
        if (name === currentName) {
          setSwipeableHeight(height)
        }
      }
    },
    [currentName, isScrollspy, isSwipeable, scrollToPane, swipeableConfig?.autoHeight],
  )

  const resolveScrollspyActiveName = React.useCallback(
    (offsetY: number, event?: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isScrollspy || paneLayoutMap.current.size === 0) {
        return undefined
      }
      const adjustedOffset = offsetY + getScrollspyOffset()
      let matched: TabsValue | undefined
      for (let idx = panes.length - 1; idx >= 0; idx -= 1) {
        const pane = panes[idx]
        const layout = paneLayoutMap.current.get(pane.name)
        if (!layout) {
          continue
        }
        if (adjustedOffset + 1 >= layout.y) {
          matched = pane.name
          break
        }
      }
      if (
        event &&
        scrollspyOptions?.autoFocusLast &&
        panes.length > 0
      ) {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
        const distanceToBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height)
        if (distanceToBottom <= (scrollspyOptions.reachBottomThreshold ?? 0)) {
          matched = panes[panes.length - 1].name
        }
      }
      return matched ?? panes[0]?.name
    },
    [getScrollspyOffset, isScrollspy, panes, scrollspyOptions?.autoFocusLast, scrollspyOptions?.reachBottomThreshold],
  )

  const handleScrollspyContentScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y
      if (!isScrollspy || scrollspyLockRef.current) {
        return
      }
      const nextName = resolveScrollspyActiveName(offsetY, event)
      if (!nextName || nextName === currentName) {
        return
      }
      const nextPane = panes.find(pane => pane.name === nextName)
      if (!nextPane) {
        return
      }
      scrollspyChangeByScrollRef.current = true
      setActiveValue(nextName, nextPane.index)
    },
    [currentName, isScrollspy, panes, resolveScrollspyActiveName, setActiveValue],
  )

  const handleSwipeMomentumScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!isSwipeable || containerWidth <= 0) {
        return
      }
      const offsetX = event.nativeEvent.contentOffset.x
      const pageIndex = Math.round(offsetX / containerWidth)
      const nextPane = panes[pageIndex]
      if (!nextPane || nextPane.name === currentName) {
        return
      }
      swipeableChangeByScrollRef.current = true
      setActiveValue(nextPane.name, nextPane.index)
    },
    [containerWidth, currentName, isSwipeable, panes, setActiveValue],
  )

  React.useEffect(() => {
    if (!isSwipeable || !swipeableScrollRef.current || containerWidth <= 0) {
      return
    }
    if (swipeableChangeByScrollRef.current) {
      swipeableChangeByScrollRef.current = false
      return
    }
    if (activeIndex < 0) {
      return
    }
    const node: any =
      (swipeableScrollRef.current as unknown as {
        scrollTo?: (options: { x?: number; y?: number; animated?: boolean }) => void
      }) ?? swipeableScrollRef.current.getNode?.()
    if (!node?.scrollTo) {
      return
    }
    node.scrollTo({ x: containerWidth * activeIndex, y: 0, animated: true })
  }, [activeIndex, containerWidth, isSwipeable])

  React.useEffect(() => {
    if (!isScrollspy) {
      return
    }
    if (scrollspyChangeByScrollRef.current) {
      scrollspyChangeByScrollRef.current = false
      return
    }
    scrollToPane(currentName)
  }, [currentName, isScrollspy, scrollToPane])

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

  const scrollTo = React.useCallback(
    (name: TabsValue, options?: { immediate?: boolean }) => {
      const target = panes.find(pane => pane.name === name && !pane.disabled)
      if (!target) {
        return
      }
      setActiveValue(target.name, target.index)
      scrollIntoView(target.name, options?.immediate)
      if (isScrollspy) {
        scrollToPane(target.name, options?.immediate)
      }
    },
    [isScrollspy, panes, scrollIntoView, scrollToPane, setActiveValue],
  )

  React.useImperativeHandle(ref, () => ({
    scrollTo,
  }), [scrollTo])

  const borderEnabled = border ?? false
  const showIndicator = type === 'line'
  const navHeight = React.useMemo(() => {
    if (type === 'jumbo') {
      return tokens.jumbo.height
    }
    if (type === 'card') {
      return tokens.card.height
    }
    return tokens.tabList.height
  }, [type, tokens])
  const navPaddingBottom =
    type === 'line'
      ? 0
      : type === 'card'
        ? 0
        : tokens.tabList.paddingBottom
  const indicatorBottom = showIndicator ? (type === 'line' ? 0 : tokens.indicator.offset) : 0

  if (panes.length === 0) {
    return null
  }

  const navItems = panes.map(pane => (
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
      isLast={pane.index === panes.length - 1}
    />
  ))

  const navBody = scrollable ? (
    <ScrollView
      horizontal
      ref={navScrollRef}
      onContentSizeChange={w => {
        navContentWidthRef.current = w
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.navContent, styles.navContentScrollable]}
    >
      {navItems}
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
              bottom: indicatorBottom,
              transform: [{ translateX: indicatorX }],
            },
          ]}
        />
      ) : null}
    </ScrollView>
  ) : (
    <View style={[styles.navContent, styles.navContentStatic]}>
      {navItems}
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
              bottom: indicatorBottom,
              transform: [{ translateX: indicatorX }],
            },
          ]}
        />
      ) : null}
    </View>
  )

  const navContent = (
    <View
      style={[
        styles.wrap,
        borderEnabled && type === 'line'
          ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: tokens.colors.border }
          : null,
        {
          backgroundColor: background,
        },
        tabBarStyle,
      ]}
      onLayout={handleNavLayout}
    >
      {navLeft ? <View style={styles.navSide}>{navLeft}</View> : null}
      <View
        style={[
          styles.nav,
          {
            minHeight: navHeight + navPaddingBottom,
            paddingBottom: navPaddingBottom,
          },
          type === 'card'
            ? {
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: tokens.card.radius,
              borderColor: color ?? tokens.colors.cardBorder,
              marginHorizontal: tokens.card.marginHorizontal,
              overflow: 'hidden',
            }
            : null,
        ]}
      >
        {navBody}
      </View>
      {navRight ? <View style={styles.navSide}>{navRight}</View> : null}
    </View>
  )

  const paneNodes = panes.map(pane => {
    const isActive = pane.name === currentName
    const shouldRender =
      isScrollspy || !lazyRender || isActive || visitedRef.current.has(pane.name)
    if (!shouldRender && !isSwipeable) {
      return null
    }
    const layoutHandler =
      isScrollspy || (isSwipeable && swipeableConfig?.autoHeight)
        ? (event: LayoutChangeEvent) => handlePaneLayout(pane.name, event)
        : undefined
    const paneStyles = [
      styles.pane,
      isSwipeable ? styles.swipeablePane : null,
      isSwipeable && containerWidth > 0 ? { width: containerWidth } : null,
      !isSwipeable && !isScrollspy && !isActive ? styles.hiddenPane : null,
    ]
    const paneContent = shouldRender ? pane.children : lazyRenderPlaceholder ?? null
    return (
      <View
        key={pane.key}
        testID={`rv-tabs-pane-${pane.name}`}
        onLayout={layoutHandler}
        style={paneStyles}
      >
        {paneContent}
      </View>
    )
  })

  const baseContentStyle = [styles.content, contentStyle]
  const swipeableContentStyle = [
    styles.content,
    contentStyle,
    swipeableConfig?.autoHeight && swipeableHeight !== undefined ? { height: swipeableHeight } : null,
  ]

  const contentNode = isScrollspy ? (
    <AnimatedScrollView
      ref={scrollspyScrollRef}
      testID={SCROLLSPY_SCROLL_TEST_ID}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={handleScrollspyContentScroll}
      contentContainerStyle={baseContentStyle}
    >
      {paneNodes}
    </AnimatedScrollView>
  ) : isSwipeable ? (
    <View style={swipeableContentStyle}>
      <AnimatedScrollView
        ref={swipeableScrollRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipeMomentumScrollEnd}
        nestedScrollEnabled={swipeableConfig?.preventScroll === false}
        directionalLockEnabled={swipeableConfig?.preventScroll !== false}
      >
        {paneNodes}
      </AnimatedScrollView>
    </View>
  ) : (
    <View style={baseContentStyle}>{paneNodes}</View>
  )

  return (
    <View {...rest} style={[styles.container, style]} onLayout={handleContainerLayout}>
      {navContent}
      {navBottom ? <View style={styles.navBottom}>{navBottom}</View> : null}
      {contentNode}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  nav: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
  },
  navContentScrollable: {},
  navContentStatic: {
    flex: 1,
  },
  navSide: {
    paddingHorizontal: 8,
  },
  navBottom: {
    marginTop: 8,
  },
  labelWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  labelWrapperJumbo: {
    alignItems: 'center',
  },
  cardLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    flexShrink: 0,
    height: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    maxWidth: '100%',
    flexShrink: 1,
  },
  badge: {
    marginTop: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  content: {
    width: '100%',
    height: '100%',
  },
  pane: {
    width: '100%',
  },
  swipeablePane: {
    flexShrink: 0,
  },
  hiddenPane: {
    display: 'none',
  },
})

const TabsBase = React.forwardRef(TabsBaseInner) as React.ForwardRefExoticComponent<
  TabsProps & React.RefAttributes<TabsRef>
>

TabsBase.displayName = 'Tabs'

export default TabsBase
