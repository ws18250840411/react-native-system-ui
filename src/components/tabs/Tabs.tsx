import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  Children,
  isValidElement,
  Fragment,
  type ForwardRefRenderFunction,
} from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native'

import { useAriaPress, useControllableValue } from '../../hooks'
import { parseNumberLike, isBoolean, isFunction, isObject, isRenderable, isText } from '../../utils'
import type { TabPaneProps, TabsProps, TabsRef, TabsValue } from './types'
import { useTabsTokens } from './tokens'
import { cancelFrame, requestFrame, isTabPaneElement } from './utils'
import { useTabsAnimation } from './useTabsAnimation'
import { useTabsScroll } from './useTabsScroll'

interface ParsedPane extends TabPaneProps {
  key: React.Key
  name: TabsValue
  index: number
}

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
  onSelect: (pane: ParsedPane, index: number, event?: unknown) => void
  onLayout: (name: TabsValue, event: LayoutChangeEvent) => void
  isLast: boolean
}

const TabBarItemInner: React.FC<TabItemProps> = ({
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
    onPress: event => onSelect(pane, pane.index, event),
    extraProps: {
      accessibilityRole: 'tab',
      accessibilityState: { selected: isActive, disabled: isDisabled },
      testID: `rv-tabs-item-${pane.name}`,
    },
  })

  const isCapsule = type === 'capsule'
  const isJumbo = type === 'jumbo'
  const isCard = type === 'card'
  const renderTitle = isFunction(pane.title) ? pane.title(isActive) : pane.title ?? pane.name
  const renderDescription = isFunction(pane.description) ? pane.description(isActive) : pane.description

  const activeTitleColor = titleActiveColor ?? (isCard ? tokens.colors.cardActiveText : isCapsule ? tokens.colors.capsuleActiveText : color ?? tokens.colors.textActive)
  const inactiveTitleColor = titleInactiveColor ?? (isCard ? color ?? tokens.colors.cardBorder : isCapsule ? tokens.colors.capsuleText : tokens.colors.text)
  const textColor = pane.disabled ? tokens.colors.textDisabled : isActive ? activeTitleColor : inactiveTitleColor

  const descriptionColor = isDisabled ? tokens.colors.textDisabled : isJumbo ? (isActive ? tokens.colors.jumboDescriptionActive : tokens.colors.jumboDescription) : (isActive ? tokens.colors.descriptionActive : tokens.colors.description)

  const shouldFlex = !scrollable && (align !== 'start' || isCard)
  const horizontalPadding = isCard || isJumbo || isCapsule ? 0 : tokens.tabList.paddingHorizontal
  const verticalPadding = isCard || isJumbo || isCapsule ? 0 : tokens.tabList.paddingVertical
  const labelWrapperStyles: ViewStyle[] = [styles.labelWrapper]
  const labelTextWrapperStyles: ViewStyle[] | null = isCapsule ? [{
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: tokens.capsule.radius,
    backgroundColor: isActive ? color ?? tokens.colors.capsuleActiveBackground : tokens.colors.capsuleBackground,
  }] : null
  if (isJumbo) {
    labelWrapperStyles.push(styles.labelWrapperJumbo)
  }
  if (isCard) {
    labelWrapperStyles.push(styles.cardLabel)
    labelWrapperStyles.push({
      paddingHorizontal: tokens.card.paddingHorizontal,
      paddingVertical: tokens.card.paddingVertical,
    })
  }
  if (isCapsule) {
    labelWrapperStyles.push({ flex: 1, alignSelf: 'stretch' })
    labelWrapperStyles.push({
      paddingHorizontal: tokens.capsule.paddingHorizontal,
      paddingVertical: tokens.capsule.paddingVertical,
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
      onLayout={event => onLayout(pane.name, event)}
        style={[styles.tabItem, shouldFlex ? styles.flexItem : null, {
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
        }, isCard ? {
          borderRightWidth: isLast ? 0 : StyleSheet.hairlineWidth,
          borderRightColor: color ?? tokens.colors.cardBorder,
          backgroundColor: isActive ? color ?? tokens.colors.cardActiveBackground : tokens.colors.cardBackground,
        } : null, tabStyle]}
    >
      <View style={labelWrapperStyles}>
        {labelTextWrapperStyles ? (
          <View style={labelTextWrapperStyles}>
            <Text style={[styles.title, {
              color: textColor,
              fontSize: isJumbo ? tokens.typography.jumboTitleSize : tokens.typography.titleSize,
              fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight,
              lineHeight: isJumbo ? tokens.typography.jumboLineHeight : undefined,
              textAlign: 'center',
            }, ellipsis && !isJumbo ? styles.ellipsis : null, titleStyle]} numberOfLines={ellipsis && !isJumbo ? 1 : undefined}>
              {renderTitle}
            </Text>
          </View>
        ) : (
          <Text style={[styles.title, {
            color: textColor,
            fontSize: isJumbo ? tokens.typography.jumboTitleSize : tokens.typography.titleSize,
            fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight,
            lineHeight: isJumbo ? tokens.typography.jumboLineHeight : undefined,
            textAlign: 'center',
          }, ellipsis && !isJumbo ? styles.ellipsis : null, titleStyle]} numberOfLines={ellipsis && !isJumbo ? 1 : undefined}>
            {renderTitle}
          </Text>
        )}
        {isRenderable(renderDescription) && (isText(renderDescription) ? (
          <Text style={[styles.description, isJumbo ? {
            color: descriptionColor,
            fontSize: tokens.typography.descriptionSize,
            marginTop: 8,
            textAlign: 'center',
            backgroundColor: isActive ? tokens.colors.jumboDescriptionActiveBackground : tokens.colors.jumboDescriptionBackground,
            paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal,
            paddingVertical: tokens.jumbo.descriptionPaddingVertical,
            borderRadius: tokens.jumbo.descriptionRadius,
          } : {
            color: descriptionColor,
            fontSize: tokens.typography.descriptionSize,
            marginTop: 2,
            textAlign: 'center',
          }, descriptionStyle]}>
            {renderDescription}
          </Text>
        ) : (
          <View style={[styles.description, isJumbo ? {
            marginTop: 8,
            alignItems: 'center',
            backgroundColor: isActive ? tokens.colors.jumboDescriptionActiveBackground : tokens.colors.jumboDescriptionBackground,
            paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal,
            paddingVertical: tokens.jumbo.descriptionPaddingVertical,
            borderRadius: tokens.jumbo.descriptionRadius,
          } : {
            marginTop: 2,
            alignItems: 'center',
          }]}>
            {renderDescription}
          </View>
        ))}
        {isRenderable(pane.badge) && (
          <View style={styles.badge}>
            {isText(pane.badge) ? (
              <Text style={[styles.badgeText, { color: tokens.colors.badgeText }]}>{pane.badge}</Text>
            ) : (
              pane.badge
            )}
          </View>
        )}
      </View>
    </Pressable>
  )
}

const TabBarItem = memo(TabBarItemInner)

const TabsBaseInner: ForwardRefRenderFunction<TabsRef, TabsProps> = (props, ref) => {
  const {
    tokensOverride,
    children,
    type: typeProp,
    align: alignProp,
    ellipsis: ellipsisProp,
    swipeThreshold: swipeThresholdProp,
    animated: animatedProp,
    duration: durationProp,
    lazyRender: lazyRenderProp,
    lazyRenderPlaceholder,
    scrollable: scrollableProp,
    swipeable,
    color,
    background: backgroundProp,
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
    onChange,
    style,
    ...rest
  } = props

  const tokens = useTabsTokens(tokensOverride)

  const type = typeProp ?? tokens.defaults.type
  const align = alignProp ?? tokens.defaults.align
  const ellipsis = ellipsisProp ?? tokens.defaults.ellipsis
  const swipeThreshold = swipeThresholdProp ?? tokens.defaults.swipeThreshold
  const animated = animatedProp ?? tokens.defaults.animated
  const duration = durationProp ?? tokens.defaults.duration
  const lazyRender = lazyRenderProp ?? tokens.defaults.lazyRender
  const background = backgroundProp ?? tokens.tabList.background

  const parsedLineWidth = parseNumberLike(lineWidth ?? tokens.indicator.width)
  const resolvedLineWidth = parsedLineWidth != null && parsedLineWidth < 0 ? undefined : parsedLineWidth
  const resolvedLineHeight = Math.max(0, parseNumberLike(lineHeight) ?? tokens.indicator.height)
  const resolvedDuration = Math.max(0, parseNumberLike(duration) ?? tokens.defaults.duration)
  const resolvedSwipeThreshold = Math.max(0, parseNumberLike(swipeThreshold) ?? tokens.defaults.swipeThreshold)
  const swipeableConfig = !swipeable
    ? undefined
    : isObject(swipeable)
      ? {
        autoHeight: swipeable.autoHeight ?? true,
        preventScroll: swipeable.preventScroll ?? true,
      }
      : { autoHeight: true, preventScroll: true }
  const isSwipeable = !!swipeableConfig

  const panes = useMemo<ParsedPane[]>(() => {
    const result: ParsedPane[] = []
    let paneIndex = 0

    const walk = (nodes: React.ReactNode) => {
      Children.forEach(nodes, (node) => {
        if (!isValidElement(node)) return
        const element = node as React.ReactElement<{ children?: React.ReactNode }>
        if (element.type === Fragment) {
          walk(element.props.children)
          return
        }
        if (!isTabPaneElement(element)) {
          if (typeof __DEV__ !== 'undefined' && __DEV__) {
            const type = element.type
            const childName =
              typeof type === 'string'
                ? type
                : (type as { displayName?: string; name?: string }).displayName ??
                (type as { displayName?: string; name?: string }).name ??
                'Unknown'
            console.warn('[Tabs] children 只能是 <Tabs.TabPane />，已忽略：', childName)
          }
          return
        }
        const paneProps = element.props
        const name = paneProps.name ?? paneIndex
        result.push({
          ...paneProps,
          key: element.key ?? name,
          name,
          index: paneIndex,
        })
        paneIndex += 1
      })
    }

    walk(children)
    return result
  }, [children])

  const firstPaneName = panes[0]?.name
  const [activeValue, setActiveValue] = useControllableValue<TabsValue>(props, {
    defaultValue: firstPaneName,
    valuePropName: 'active',
    defaultValuePropName: 'defaultActive',
    trigger: 'onChange',
  })

  const currentName = activeValue == null ? firstPaneName : (panes.some(pane => pane.name === activeValue) ? activeValue : firstPaneName)

  const currentNameRef = useRef<TabsValue | undefined | null>(currentName)
  useEffect(() => {
    currentNameRef.current = currentName
  }, [currentName])

  const nameIndexMap = useMemo(() => {
    const map = new Map<TabsValue, number>()
    panes.forEach(pane => {
      map.set(pane.name, pane.index)
    })
    return map
  }, [panes])

  const activeIndex = currentName == null ? -1 : (nameIndexMap.get(currentName) ?? -1)

  const visitedRef = useRef<Set<TabsValue>>(new Set())
  useEffect(() => {
    if (currentName == null) return
    visitedRef.current.add(currentName)
  }, [currentName])

  useEffect(() => {
    const validNames = new Set(panes.map(pane => pane.name))
    Array.from(paneLayoutMap.current.keys()).forEach(name => {
      if (!validNames.has(name)) paneLayoutMap.current.delete(name)
    })
    Array.from(layoutMap.current.keys()).forEach(name => {
      if (!validNames.has(name)) layoutMap.current.delete(name)
    })
  }, [panes])

  const shouldTrackPaneLayouts = isSwipeable && swipeableConfig?.autoHeight

  useEffect(() => {
    if (!shouldTrackPaneLayouts) {
      paneLayoutMap.current.clear()
    }
  }, [shouldTrackPaneLayouts])

  useEffect(() => {
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

  const layoutMap = useRef<Map<TabsValue, { x: number; width: number }>>(new Map())
  const navContainerWidthRef = useRef(0)
  const navContentWidthRef = useRef(0)
  const navContentSizeSyncFrameRef = useRef<number | null>(null)
  const paneLayoutMap = useRef<Map<TabsValue, { height: number }>>(new Map())
  const swipeableScrollRef = useRef<any>(null)
  const swipeableChangeByScrollRef = useRef(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [swipeableHeight, setSwipeableHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      cancelFrame(navContentSizeSyncFrameRef.current)
      navContentSizeSyncFrameRef.current = null
    }
  }, [])

  const scrollable = useMemo(() => {
    if (isBoolean(scrollableProp)) {
      return scrollableProp
    }
    return panes.length > resolvedSwipeThreshold || ellipsis === false
  }, [ellipsis, panes.length, resolvedSwipeThreshold, scrollableProp])

  const indicatorColor = color ?? tokens.colors.indicator
  const indicatorCornerRadius = resolvedLineHeight ? resolvedLineHeight / 2 : tokens.indicator.radius

  const {
    indicatorX,
    indicatorWidth,
    indicatorInitializedRef,
    animateIndicator,
  } = useTabsAnimation({
    type,
    animated,
    scrollable,
    align,
    panes,
    nameIndexMap,
    resolvedLineWidth,
    resolvedLineHeight,
    resolvedDuration,
    currentName,
    layoutMap,
    navContainerWidthRef,
  })

  const {
    navScrollRef,
    scrollIntoView,
    handleNavScrollBeginDrag,
    handleNavScroll,
  } = useTabsScroll({
    scrollable,
    animated,
    currentName,
    resolvedDuration,
    layoutMap,
    navContainerWidthRef,
    navContentWidthRef,
  })

  const handleTabLayout = useCallback((name: TabsValue, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout
    layoutMap.current.set(name, { x, width })
    if (name === currentNameRef.current) {
      const shouldAnimate = indicatorInitializedRef.current
      const didAnimate = animateIndicator(name, !shouldAnimate)
      if (didAnimate && !indicatorInitializedRef.current) indicatorInitializedRef.current = true
    }
  }, [animateIndicator, indicatorInitializedRef])

  const handleNavContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    navContainerWidthRef.current = width
    if (!scrollable && align !== 'start' && type === 'line' && currentName !== undefined && currentName !== null) {
      const shouldAnimate = indicatorInitializedRef.current
      const didAnimate = animateIndicator(currentName, !shouldAnimate)
      if (didAnimate && !indicatorInitializedRef.current) indicatorInitializedRef.current = true
    }
  }, [align, animateIndicator, currentName, scrollable, type, indicatorInitializedRef])

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width
    setContainerWidth(prev => prev === nextWidth ? prev : nextWidth)
  }, [])

  const runBeforeChange = useCallback((name: TabsValue) => {
    if (!beforeChange) return Promise.resolve(true)
    try {
      return Promise.resolve(beforeChange(name))
        .then(res => res !== false)
        .catch(error => {
          if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('[Tabs] beforeChange 抛出异常：', error)
          return false
        })
    } catch (error) {
      if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('[Tabs] beforeChange 抛出异常：', error)
      return Promise.resolve(false)
    }
  }, [beforeChange])

  const changeSeqRef = useRef(0)
  const requestChange = useCallback((name: TabsValue, index: number) => {
    changeSeqRef.current += 1
    const seq = changeSeqRef.current
    runBeforeChange(name).then(canChange => {
      if (!canChange) return
      if (changeSeqRef.current !== seq) return
      setActiveValue(name, index)
    })
  }, [runBeforeChange, setActiveValue])

  const handlePaneLayout = useCallback((name: TabsValue, event: LayoutChangeEvent) => {
    if (isSwipeable && swipeableConfig?.autoHeight) {
      const { height } = event.nativeEvent.layout
      paneLayoutMap.current.set(name, { height })
      if (name === currentName) setSwipeableHeight(height)
    }
  }, [currentName, isSwipeable, swipeableConfig?.autoHeight])

  const swipeEndIndexRef = useRef<number | null>(null)
  useEffect(() => {
    swipeEndIndexRef.current = null
  }, [currentName])

  const handleSwipeEnd = useCallback((offsetX: number) => {
    if (!isSwipeable || containerWidth <= 0) return
    const pageIndex = Math.round(offsetX / containerWidth)
    if (swipeEndIndexRef.current === pageIndex) return
    swipeEndIndexRef.current = pageIndex
    const nextPane = panes[pageIndex]
    if (!nextPane || nextPane.name === currentNameRef.current) return
    swipeableChangeByScrollRef.current = true
    requestChange(nextPane.name, nextPane.index)
  }, [containerWidth, isSwipeable, panes, requestChange])

  const handleSwipeMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleSwipeEnd(event.nativeEvent.contentOffset.x)
  }, [handleSwipeEnd])
  const handleSwipeScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleSwipeEnd(event.nativeEvent.contentOffset.x)
  }, [handleSwipeEnd])

  useEffect(() => {
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
    const node = swipeableScrollRef.current?.getNode?.() ?? swipeableScrollRef.current
    if (!node?.scrollTo) {
      return
    }
    node.scrollTo({ x: containerWidth * activeIndex, y: 0, animated: true })
  }, [activeIndex, containerWidth, isSwipeable])

  const handleSelect = useCallback((pane: ParsedPane, index: number, event?: unknown) => {
    const payload = { name: pane.name, index, disabled: !!pane.disabled, event }
    onClickTab?.(payload)
    if (pane.disabled || pane.name === currentNameRef.current) return
    requestChange(pane.name, index)
  }, [onClickTab, requestChange])

  const scrollTo = useCallback((name: TabsValue, _options?: { immediate?: boolean }) => {
    const target = panes.find(pane => pane.name === name && !pane.disabled)
    if (!target) return
    setActiveValue(target.name, target.index)
  }, [panes, setActiveValue])

  useImperativeHandle(ref, () => ({
    scrollTo,
  }), [scrollTo])

  const firstRenderRef = useRef(true)
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      scrollIntoView(true)
    }
  }, [scrollIntoView])

  useEffect(() => {
    if (!firstRenderRef.current) {
      scrollIntoView()
    }
  }, [currentName, scrollIntoView])

  const borderEnabled = border ?? false
  const showIndicator = type === 'line'
  const navHeight = useMemo(() => {
    if (type === 'jumbo') {
      return tokens.jumbo.height
    }
    if (type === 'card') {
      return tokens.card.height
    }
    return tokens.tabList.height
  }, [type, tokens])
  const navPaddingBottom =
    Platform.OS === 'web' && type !== 'line' && type !== 'card'
      ? tokens.tabList.paddingBottom
      : 0
  const indicatorBottom = showIndicator ? (type === 'line' ? 0 : tokens.indicator.offset) : 0

  if (panes.length === 0) {
    return null
  }

  const indicatorNode = showIndicator ? (
    <Animated.View testID="rv-tabs-indicator" style={[styles.indicator, {
      height: resolvedLineHeight,
      borderRadius: indicatorCornerRadius,
      backgroundColor: indicatorColor,
      width: indicatorWidth,
      bottom: indicatorBottom,
      transform: [{ translateX: indicatorX }],
    }]} />
  ) : null

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
      onSelect={handleSelect}
      onLayout={handleTabLayout}
      isLast={pane.index === panes.length - 1}
    />
  ))

  const navBody = scrollable ? (
    <ScrollView
      horizontal
      ref={navScrollRef}
      accessibilityRole="tablist"
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScrollBeginDrag={handleNavScrollBeginDrag}
      onScroll={handleNavScroll}
      onContentSizeChange={(w: number) => {
        const prev = navContentWidthRef.current
        navContentWidthRef.current = w
        if (prev === 0 || firstRenderRef.current) {
          scrollIntoView(true)
          return
        }
        if (Math.abs(w - prev) > 1) {
          cancelFrame(navContentSizeSyncFrameRef.current)
          navContentSizeSyncFrameRef.current = requestFrame(() => {
            navContentSizeSyncFrameRef.current = null
            scrollIntoView()
          })
        }
      }}
      contentContainerStyle={styles.navContent}
    >
      {navItems}
      {indicatorNode}
    </ScrollView>
  ) : (
    <View accessibilityRole="tablist" style={[styles.navContent, styles.navContentStatic]}>
      {navItems}
      {indicatorNode}
    </View>
  )

  const navContent = (
    <View
      style={[styles.wrap, borderEnabled && type === 'line' ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: tokens.colors.border } : null, {
        backgroundColor: background,
      }, tabBarStyle]}
    >
      {navLeft && <View style={styles.navSide}>{navLeft}</View>}
      <View
        style={[styles.nav, {
          minHeight: navHeight + navPaddingBottom,
          paddingBottom: navPaddingBottom,
        }, type === 'card' ? {
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: tokens.card.radius,
          borderColor: color ?? tokens.colors.cardBorder,
          marginHorizontal: tokens.card.marginHorizontal,
          overflow: 'hidden',
        } : null]}
        onLayout={handleNavContainerLayout}
      >
        {navBody}
      </View>
      {navRight && <View style={styles.navSide}>{navRight}</View>}
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
    const paneStyles = [styles.pane, isSwipeable ? styles.swipeablePane : null, isSwipeable && containerWidth > 0 && { width: containerWidth }, !isSwipeable && !isActive ? styles.hiddenPane : null]
    const paneContent = shouldRender ? pane.children : (lazyRenderPlaceholder || null)
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
    swipeableConfig?.autoHeight && swipeableHeight !== undefined && { height: swipeableHeight },
  ]

  const contentNode = isSwipeable ? (
    <View style={swipeableContentStyle}>
      <Animated.ScrollView
        ref={swipeableScrollRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipeMomentumScrollEnd}
        onScrollEndDrag={handleSwipeScrollEndDrag}
        nestedScrollEnabled={swipeableConfig?.preventScroll === false}
        directionalLockEnabled={swipeableConfig?.preventScroll !== false}
      >
        {paneNodes}
      </Animated.ScrollView>
    </View>
  ) : (
    <View style={baseContentStyle}>{paneNodes}</View>
  )

  return (
    <View {...rest} style={[styles.container, style]} onLayout={handleContainerLayout}>
      {navContent}
      {navBottom && <View style={styles.navBottom}>{navBottom}</View>}
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
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  content: {
    width: '100%',
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
