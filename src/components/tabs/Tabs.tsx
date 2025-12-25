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
const cancelFrame =
  typeof cancelAnimationFrame === 'function'
    ? cancelAnimationFrame
    : (id: any) => clearTimeout(id)

const isRenderableNode = (node: React.ReactNode) => node !== null && node !== undefined && node !== false
const isTextLikeNode = (node: React.ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const devLog = (...args: any[]) => {
  // eslint-disable-next-line no-undef
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}

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
  onSelect: (pane: ParsedPane, event?: unknown) => void
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
    onPress: event => onSelect(pane, event),
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
      disabled={isDisabled}
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
        {isRenderableNode(renderDescription)
          ? isTextLikeNode(renderDescription)
            ? (
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
              )
            : (
                <View
                  style={[
                    styles.description,
                    isJumbo
                      ? {
                          marginTop: 8,
                          alignItems: 'center',
                          backgroundColor: isActive
                            ? tokens.colors.jumboDescriptionActiveBackground
                            : tokens.colors.jumboDescriptionBackground,
                          paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal,
                          paddingVertical: tokens.jumbo.descriptionPaddingVertical,
                          borderRadius: tokens.jumbo.descriptionRadius,
                        }
                      : {
                          marginTop: 2,
                          alignItems: 'center',
                        },
                  ]}
                >
                  {renderDescription}
                </View>
              )
          : null}
        {isRenderableNode(pane.badge) ? (
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
  const resolvedDuration = resolveNumericValue(duration) ?? tokens.defaults.duration
  const resolvedSwipeThreshold = resolveNumericValue(swipeThreshold) ?? tokens.defaults.swipeThreshold
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

  const shouldTrackPaneLayouts = isSwipeable && swipeableConfig?.autoHeight

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
  const navScrollX = React.useRef(new Animated.Value(0)).current
  const navScrollAnimRef = React.useRef<Animated.CompositeAnimation | null>(null)
  const indicatorInitializedRef = React.useRef(false)
  const paneLayoutMap = React.useRef<Map<TabsValue, { height: number }>>(new Map())
  const swipeableScrollRef = React.useRef<Animated.ScrollView | null>(null)
  const swipeableChangeByScrollRef = React.useRef(false)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [swipeableHeight, setSwipeableHeight] = React.useState<number | undefined>(undefined)

  const scrollable = React.useMemo(() => {
    return panes.length > resolvedSwipeThreshold || ellipsis === false
  }, [ellipsis, panes.length, resolvedSwipeThreshold])

  const indicatorColor = color ?? tokens.colors.indicator
  const indicatorCornerRadius = resolvedLineHeight ? resolvedLineHeight / 2 : tokens.indicator.radius
  const animateIndicator = React.useCallback(
    (name?: TabsValue, immediate?: boolean) => {
      if (!name || type !== 'line') return false
      // RN Web 在 flex 均分场景下，onLayout 的 x/width 可能不稳定（常见表现：x 恒为 0），导致指示器不移动。
      // 对于非滚动且均分的 tabs（align != 'start'），直接用容器宽度与 index 计算指示器位置，避免依赖 onLayout。
      const shouldUseEqualWidth =
        !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0
      const index = panes.findIndex(pane => pane.name === name)
      const equalTabWidth = shouldUseEqualWidth ? navContainerWidthRef.current / panes.length : 0
      const layout = shouldUseEqualWidth
        ? { x: Math.max(index, 0) * equalTabWidth, width: equalTabWidth }
        : layoutMap.current.get(name)
      if (!layout) {
        devLog('[Tabs animateIndicator] missing layout for name:', name, 'layouts:', Array.from(layoutMap.current.entries()))
        return false
      }
      const timing = (value: Animated.Value, toValue: number) =>
        Animated.timing(value, {
          toValue,
          duration: immediate || !animated ? 0 : resolvedDuration,
          useNativeDriver: false,
        })
      const targetWidth = resolvedLineWidth ?? layout.width
      const targetX = resolvedLineWidth
        ? layout.x + (layout.width - targetWidth) / 2
        : layout.x
      devLog('[Tabs animateIndicator] name:', name, 'layout:', layout, 'targetX:', targetX, 'targetWidth:', targetWidth, 'immediate:', immediate)
      Animated.parallel([
        timing(indicatorX, targetX),
        timing(indicatorWidth, targetWidth),
      ]).start()
      return true
    },
    [align, animated, indicatorWidth, indicatorX, panes, resolvedDuration, resolvedLineWidth, scrollable, type],
  )

  const scrollIntoView = React.useCallback(
    (immediate?: boolean) => {
      if (!scrollable || currentName === undefined || currentName === null) return
      const layout = layoutMap.current.get(currentName)
      const containerWidth = navContainerWidthRef.current
      if (!layout || !containerWidth) return
      const measuredContentWidth = navContentWidthRef.current
      const computedContentWidth = Array.from(layoutMap.current.values()).reduce((max, item) => {
        return Math.max(max, item.x + item.width)
      }, 0)
      const contentWidth = measuredContentWidth > 0 ? measuredContentWidth : computedContentWidth
      const targetX = layout.x - (containerWidth - layout.width) / 2
      const maxScroll = Math.max(contentWidth - containerWidth, 0)
      const clampedX = Math.max(0, Math.min(targetX, maxScroll))
      // 内容没溢出就无需滚动
      if (maxScroll <= 0) {
        return
      }
      // 取消上一次滚动动画
      if (navScrollAnimRef.current) {
        navScrollAnimRef.current.stop()
        navScrollAnimRef.current = null
      }
      // 用 Animated.timing 驱动 value，监听器会在每帧调用 scrollTo 实现丝滑滚动
      navScrollAnimRef.current = Animated.timing(navScrollX, {
        toValue: clampedX,
        duration: immediate ? 0 : resolvedDuration,
        useNativeDriver: false,
      })
      navScrollAnimRef.current.start(({ finished }) => {
        if (finished) {
          navScrollAnimRef.current = null
        }
      })
    },
    [currentName, navScrollX, resolvedDuration, scrollable],
  )

  // 监听 navScrollX 变化，驱动 ScrollView 实际滚动（RN 中 Animated.ScrollView contentOffset 不生效，需手动同步）
  React.useEffect(() => {
    const listenerId = navScrollX.addListener(({ value }) => {
      navScrollRef.current?.scrollTo({ x: value, y: 0, animated: false })
    })
    return () => {
      navScrollX.removeListener(listenerId)
    }
  }, [navScrollX])

  React.useEffect(() => {
    if (currentName === undefined || currentName === null) return
    const shouldAnimate = indicatorInitializedRef.current
    const didAnimate = animateIndicator(currentName, !shouldAnimate)
    if (didAnimate && !indicatorInitializedRef.current) {
      indicatorInitializedRef.current = true
    }
    devLog('[Tabs] currentName changed:', currentName, 'activeIndex:', activeIndex, 'didAnimate:', didAnimate)
  }, [animateIndicator, currentName])

  React.useEffect(
    () => () => {
      // no-op
    },
    [],
  )

  const handleTabLayout = React.useCallback(
    (name: TabsValue, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout
      layoutMap.current.set(name, { x, width })
      devLog('[Tabs handleTabLayout] name:', name, 'x:', x, 'width:', width, 'currentName:', currentName)
      // 如果激活项布局变化，立即重算指示线
      if (name === currentName) {
        const shouldAnimate = indicatorInitializedRef.current
        const didAnimate = animateIndicator(name, !shouldAnimate)
        if (didAnimate && !indicatorInitializedRef.current) {
          indicatorInitializedRef.current = true
        }
      }
    },
    [animateIndicator, currentName],
  )

  const handleNavContainerLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    navContainerWidthRef.current = width
  }, [])

  const handleContainerLayout = React.useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])


  const runBeforeChange = React.useCallback(
    (name: TabsValue) => {
      if (!beforeChange) {
        return Promise.resolve(true)
      }
      try {
        const result = beforeChange(name)
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
      if (isSwipeable && swipeableConfig?.autoHeight) {
        const { height } = event.nativeEvent.layout
        paneLayoutMap.current.set(name, { height })
        if (name === currentName) {
          setSwipeableHeight(height)
        }
      }
    },
    [currentName, isSwipeable, swipeableConfig?.autoHeight],
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

  const handleSelect = (pane: ParsedPane, index: number, event?: unknown) => {
    if (pane.disabled || pane.name === currentName) {
      onClickTab?.({
        name: pane.name,
        index,
        disabled: !!pane.disabled,
        event,
      })
      return
    }
    onClickTab?.({
      name: pane.name,
      index,
      disabled: !!pane.disabled,
      event,
    })
    if (!beforeChange) {
      setActiveValue(pane.name, index)
      return
    }
    runBeforeChange(pane.name).then(canChange => {
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
    },
    [panes, setActiveValue],
  )

  React.useImperativeHandle(ref, () => ({
    scrollTo,
  }), [scrollTo])

  // 首次渲染时立即定位（与官方对齐：首次 immediate）
  const firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      scrollIntoView(true)
    }
  }, [scrollIntoView])

  // index/currentName 变化时执行滚动（带动画，与官方对齐）
  React.useEffect(() => {
    if (!firstRenderRef.current) {
      scrollIntoView()
    }
  }, [currentName, scrollIntoView])

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
      onSelect={(currentPane, event) => handleSelect(currentPane, currentPane.index, event)}
      onLayout={event => handleTabLayout(pane.name, event)}
      isLast={pane.index === panes.length - 1}
    />
  ))

  const navBody = scrollable ? (
    <ScrollView
      horizontal
      ref={navScrollRef}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={event => {
        // 同步用户手动滚动到 Animated.Value（避免动画结束后再手滚，从旧位置跳跃）
        navScrollX.setValue(event.nativeEvent.contentOffset.x)
      }}
      onContentSizeChange={(w: number) => {
        navContentWidthRef.current = w
        // 内容宽度就绪后补一次定位，避免首屏/某些端 layoutMap 不完整导致不滚动
        scrollIntoView(true)
      }}
      contentContainerStyle={styles.navContent}
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
        onLayout={handleNavContainerLayout}
      >
        {navBody}
      </View>
      {navRight ? <View style={styles.navSide}>{navRight}</View> : null}
    </View>
  )

  const paneNodes = panes.map(pane => {
    const isActive = pane.name === currentName
    const shouldRender =
      !lazyRender || isActive || visitedRef.current.has(pane.name)
    if (!shouldRender && !isSwipeable) {
      return null
    }
    const layoutHandler =
      isSwipeable && swipeableConfig?.autoHeight
        ? (event: LayoutChangeEvent) => handlePaneLayout(pane.name, event)
        : undefined
    const paneStyles = [
      styles.pane,
      isSwipeable ? styles.swipeablePane : null,
      isSwipeable && containerWidth > 0 ? { width: containerWidth } : null,
      !isSwipeable && !isActive ? styles.hiddenPane : null,
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

  const contentNode = isSwipeable ? (
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
    alignItems: 'center',
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
