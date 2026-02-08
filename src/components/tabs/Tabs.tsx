import React, { memo, useCallback, useEffect, useImperativeHandle, useRef, useState, useMemo, Children, isValidElement, Fragment, type FC, type ForwardRefRenderFunction } from 'react'
import { Animated, Pressable, StyleSheet, Text, ScrollView, View, Platform, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ViewStyle } from 'react-native'
import { useAriaPress, useControllableValue } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'
import { parseNumberLike } from '../../utils/number'
import { isBoolean, isFunction, isObject, isRenderable, isText } from '../../utils/validate'
import type { TabPaneProps, TabsProps, TabsRef, TabsValue } from './types'
import { useTabsTokens } from './tokens'

const TabPane: FC<TabPaneProps> = () => null
TabPane.displayName = 'Tabs.TabPane'

interface ParsedPane extends TabPaneProps {
  key: React.Key
  name: TabsValue
  index: number
}

const hasRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'
const requestFrame: (cb: (time?: number) => void) => number = hasRaf ? requestAnimationFrame : (cb) => setTimeout(cb, 16) as unknown as number
const cancelFrame = (id: number | null) => { if (id != null) (hasRaf ? cancelAnimationFrame : clearTimeout)(id) }
const isTabPaneElement = (child: React.ReactNode): child is React.ReactElement<TabPaneProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type === TabPane) return true
  const type = child.type as unknown as { displayName?: string }
  return type.displayName === 'Tabs.TabPane'
}

interface UseTabsAnimationParams {
  type: 'line' | 'card' | 'jumbo' | 'capsule'
  animated: boolean
  scrollable: boolean
  align: 'start' | 'center' | 'end'
  panes: Array<{ name: TabsValue; index: number }>
  nameIndexMap: Map<TabsValue, number>
  resolvedLineWidth?: number
  resolvedLineHeight: number
  resolvedDuration: number
  currentName?: TabsValue | null
  layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: React.MutableRefObject<number>
}

const useTabsAnimation = ({ type, animated, scrollable, align, panes, nameIndexMap, resolvedLineWidth, resolvedDuration, currentName, layoutMap, navContainerWidthRef }: UseTabsAnimationParams) => {
  const indicatorX = useRef(new Animated.Value(0)).current
  const indicatorWidth = useRef(new Animated.Value(0)).current
  const indicatorInitializedRef = useRef(false)
  const animateIndicator = useCallback((name?: TabsValue, immediate?: boolean) => {
    if (name == null || type !== 'line') return false
    const shouldUseEqualWidth = !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0
    const index = nameIndexMap.get(name) ?? -1
    const equalTabWidth = shouldUseEqualWidth ? navContainerWidthRef.current / panes.length : 0
    const layout = shouldUseEqualWidth ? { x: Math.max(index, 0) * equalTabWidth, width: equalTabWidth } : layoutMap.current.get(name)
    if (!layout || index < 0) return false
    const timing = (value: Animated.Value, toValue: number) => Animated.timing(value, { toValue, duration: immediate || !animated ? 0 : resolvedDuration, useNativeDriver: false })
    const targetWidth = resolvedLineWidth ?? layout.width
    const targetX = resolvedLineWidth ? layout.x + (layout.width - targetWidth) / 2 : layout.x
    Animated.parallel([timing(indicatorX, targetX), timing(indicatorWidth, targetWidth)]).start()
    return true
  }, [align, animated, indicatorWidth, indicatorX, nameIndexMap, panes.length, resolvedDuration, resolvedLineWidth, scrollable, type, layoutMap, navContainerWidthRef])
  useEffect(() => {
    if (currentName == null) return
    const shouldAnimate = indicatorInitializedRef.current
    const didAnimate = animateIndicator(currentName, !shouldAnimate)
    if (didAnimate && !indicatorInitializedRef.current) indicatorInitializedRef.current = true
  }, [animateIndicator, currentName])
  return { indicatorX, indicatorWidth, indicatorInitializedRef, animateIndicator }
}

interface UseTabsScrollParams {
  scrollable: boolean
  animated: boolean
  currentName?: TabsValue | null
  resolvedDuration: number
  layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: React.MutableRefObject<number>
  navContentWidthRef: React.MutableRefObject<number>
}

const useTabsScroll = ({ scrollable, animated, currentName, resolvedDuration, layoutMap, navContainerWidthRef, navContentWidthRef }: UseTabsScrollParams) => {
  const navScrollRef = useRef<ScrollView>(null)
  const navScrollX = useRef(new Animated.Value(0)).current
  const navScrollAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const navAutoScrollingRef = useRef(false)
  const navLastScrollXRef = useRef(0)
  const navAutoScrollFrameRef = useRef<number | null>(null)
  const scrollIntoView = useCallback((immediate?: boolean) => {
    if (!scrollable || currentName == null) return
    const layout = layoutMap.current.get(currentName)
    const containerWidth = navContainerWidthRef.current
    if (!layout || !containerWidth) return
    const contentWidth = navContentWidthRef.current
    const targetX = layout.x - (containerWidth - layout.width) / 2
    const maxScroll = Math.max(contentWidth - containerWidth, 0)
    const clampedX = Math.max(0, Math.min(targetX, maxScroll))
    if (maxScroll <= 0) return
    if (Math.abs(clampedX - navLastScrollXRef.current) < 1) return
    if (navScrollAnimRef.current) { navScrollAnimRef.current.stop(); navScrollAnimRef.current = null }
    cancelFrame(navAutoScrollFrameRef.current)
    navAutoScrollFrameRef.current = null
    if (immediate || !animated) {
      navAutoScrollingRef.current = true
      navScrollX.setValue(clampedX)
      navAutoScrollFrameRef.current = requestFrame(() => { navAutoScrollFrameRef.current = null; navAutoScrollingRef.current = false })
      return
    }
    navScrollX.setValue(navLastScrollXRef.current)
    navAutoScrollingRef.current = true
    navScrollAnimRef.current = Animated.timing(navScrollX, { toValue: clampedX, duration: resolvedDuration, useNativeDriver: false })
    navScrollAnimRef.current.start(({ finished }) => {
      navScrollAnimRef.current = null
      navAutoScrollingRef.current = false
      if (!finished) return
      navLastScrollXRef.current = clampedX
    })
  }, [animated, currentName, navScrollX, resolvedDuration, scrollable, layoutMap, navContainerWidthRef, navContentWidthRef])
  useEffect(() => {
    if (!scrollable) return
    const listenerId = navScrollX.addListener(({ value }) => {
      const prev = navLastScrollXRef.current
      navLastScrollXRef.current = value
      if (Math.abs(value - prev) < 0.5) return
      navScrollRef.current?.scrollTo({ x: value, y: 0, animated: false })
    })
    return () => { navScrollX.removeListener(listenerId) }
  }, [navScrollX, scrollable])
  useEffect(() => { return () => { cancelFrame(navAutoScrollFrameRef.current); navAutoScrollFrameRef.current = null } }, [])
  const handleNavScrollBeginDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    navAutoScrollingRef.current = false
    if (navScrollAnimRef.current) { navScrollAnimRef.current.stop(); navScrollAnimRef.current = null }
    navLastScrollXRef.current = event.nativeEvent.contentOffset.x
  }, [])
  const handleNavScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (navAutoScrollingRef.current) return
    navLastScrollXRef.current = event.nativeEvent.contentOffset.x
  }, [])
  return { navScrollRef, navScrollX, scrollIntoView, handleNavScrollBeginDrag, handleNavScroll }
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

const TabBarItemInner: React.FC<TabItemProps> = ({ pane, isActive, align, scrollable, type, ellipsis, tokens, color, titleActiveColor, titleInactiveColor, tabStyle, titleStyle, descriptionStyle, onSelect, onLayout, isLast }) => {
  const isDisabled = !!pane.disabled
  const ariaPress = useAriaPress({ onPress: event => onSelect(pane, pane.index, event), extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: isActive, disabled: isDisabled }, testID: `rv-tabs-item-${pane.name}` } })
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
  const isCompactType = isCard || isJumbo || isCapsule
  const horizontalPadding = isCompactType ? 0 : tokens.tabList.paddingHorizontal
  const verticalPadding = isCompactType ? 0 : tokens.tabList.paddingVertical
  const labelWrapperStyles: ViewStyle[] = [S.lblW, isJumbo && S.lblWJ, isCard && S.cardLbl, isCard && { paddingHorizontal: tokens.card.paddingHorizontal, paddingVertical: tokens.card.paddingVertical }, isCapsule && { flex: 1, alignSelf: 'stretch', paddingHorizontal: tokens.capsule.paddingHorizontal, paddingVertical: tokens.capsule.paddingVertical }, isJumbo && { paddingHorizontal: tokens.jumbo.paddingHorizontal, paddingVertical: tokens.jumbo.paddingVertical, alignItems: 'center' }].filter(Boolean) as ViewStyle[]
  const labelTextWrapperStyles: ViewStyle[] | null = isCapsule ? [{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRadius: tokens.capsule.radius, backgroundColor: isActive ? color ?? tokens.colors.capsuleActiveBackground : tokens.colors.capsuleBackground }] : null
  const titleTextStyle = [S.title, { color: textColor, fontSize: isJumbo ? tokens.typography.jumboTitleSize : tokens.typography.titleSize, fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight, lineHeight: isJumbo ? tokens.typography.jumboLineHeight : undefined, textAlign: 'center' as const }, ellipsis && !isJumbo ? S.ellipsis : null, titleStyle]
  const titleNode = <Text style={titleTextStyle} numberOfLines={ellipsis && !isJumbo ? 1 : undefined}>{renderTitle}</Text>
  const descriptionMarginTop = isJumbo ? tokens.spacing.jumboDescriptionMarginTop : tokens.spacing.descriptionMarginTop
  const descriptionJumboStyle = isJumbo ? { backgroundColor: isActive ? tokens.colors.jumboDescriptionActiveBackground : tokens.colors.jumboDescriptionBackground, paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal, paddingVertical: tokens.jumbo.descriptionPaddingVertical, borderRadius: tokens.jumbo.descriptionRadius } : null
  const descriptionTextStyle = [S.descTxt, { color: descriptionColor, fontSize: tokens.typography.descriptionSize, marginTop: descriptionMarginTop, textAlign: 'center' as const }, descriptionJumboStyle, descriptionStyle]
  const descriptionViewStyle = [{ marginTop: descriptionMarginTop, alignItems: 'center' as const }, descriptionJumboStyle]
  const handleLayout = useCallback((event: LayoutChangeEvent) => { onLayout(pane.name, event) }, [onLayout, pane.name])
  return (
    <Pressable {...ariaPress.interactionProps} onLayout={handleLayout} style={[S.tabI, shouldFlex ? S.flexI : null, { paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }, isCard ? { backgroundColor: isActive ? color ?? tokens.colors.cardActiveBackground : tokens.colors.cardBackground } : null, tabStyle]}>
      <View style={labelWrapperStyles}>
        {labelTextWrapperStyles ? <View style={labelTextWrapperStyles}>{titleNode}</View> : titleNode}
        {isRenderable(renderDescription) && (isText(renderDescription) ? <Text style={descriptionTextStyle}>{renderDescription}</Text> : <View style={descriptionViewStyle}>{renderDescription}</View>)}
        {isRenderable(pane.badge) && <View style={{ marginTop: tokens.spacing.badgeMarginTop }}>{isText(pane.badge) ? <Text style={{ color: tokens.colors.badgeText, fontSize: tokens.typography.badgeTextSize }}>{pane.badge}</Text> : pane.badge}</View>}
      </View>
      {isCard && !isLast && <View style={createHairlineView({ position: 'right', color: color ?? tokens.colors.cardBorder, top: 0, bottom: 0 })} />}
    </Pressable>
  )
}

const TabBarItem = memo(TabBarItemInner)

const TabsBaseInner: ForwardRefRenderFunction<TabsRef, TabsProps> = (props, ref) => {
  const { tokensOverride, children, type: typeProp, align: alignProp, ellipsis: ellipsisProp, swipeThreshold: swipeThresholdProp, animated: animatedProp, duration: durationProp, lazyRender: lazyRenderProp, lazyRenderPlaceholder, scrollable: scrollableProp, swipeable, color, background: backgroundProp, border, navLeft, navRight, navBottom, tabBarStyle, tabStyle, titleStyle, descriptionStyle, contentStyle, lineWidth, lineHeight, titleActiveColor, titleInactiveColor, beforeChange, onClickTab, onChange, style, ...rest } = props
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
  const resLineW = parsedLineWidth != null && parsedLineWidth < 0 ? undefined : parsedLineWidth
  const resLineH = Math.max(0, parseNumberLike(lineHeight) ?? tokens.indicator.height)
  const resDur = Math.max(0, parseNumberLike(duration) ?? tokens.defaults.duration)
  const resSwipeTh = Math.max(0, parseNumberLike(swipeThreshold) ?? tokens.defaults.swipeThreshold)
  const swipeCfg = !swipeable ? undefined : isObject(swipeable) ? { autoHeight: swipeable.autoHeight ?? true, preventScroll: swipeable.preventScroll ?? true } : { autoHeight: true, preventScroll: true }
  const isSwipe = !!swipeCfg
  const panes = useMemo(() => {
    const result: ParsedPane[] = []
    let paneIndex = 0
    const walk = (nodes: React.ReactNode) => {
      Children.forEach(nodes, (node) => {
        if (!isValidElement(node)) return
        const element = node as React.ReactElement<{ children?: React.ReactNode }>
        if (element.type === Fragment) { walk(element.props.children); return }
        if (!isTabPaneElement(element)) return
        const paneProps = element.props
        const name = paneProps.name ?? paneIndex
        result.push({ ...paneProps, key: element.key ?? name, name, index: paneIndex })
        paneIndex += 1
      })
    }
    walk(children)
    return result
  }, [children])
  const firstPaneName = panes[0]?.name
  const [actVal, setActVal] = useControllableValue<TabsValue>(props, { defaultValue: firstPaneName, valuePropName: 'active', defaultValuePropName: 'defaultActive', trigger: 'onChange' })
  const curName = actVal == null ? firstPaneName : (panes.some(pane => pane.name === actVal) ? actVal : firstPaneName)
  const curNameRef = useRef<TabsValue | undefined | null>(curName)
  useEffect(() => { curNameRef.current = curName }, [curName])
  const nameIdxMap = useMemo(() => {
    const map = new Map<TabsValue, number>()
    panes.forEach(pane => { map.set(pane.name, pane.index) })
    return map
  }, [panes])
  const actIdx = curName == null ? -1 : (nameIdxMap.get(curName) ?? -1)
  const visRef = useRef<Set<TabsValue>>(new Set())
  const layMap = useRef<Map<TabsValue, { x: number; width: number }>>(new Map())
  const navCtrWRef = useRef(0)
  const navCntWRef = useRef(0)
  const navCntSyncRef = useRef<number | null>(null)
  const paneLayMap = useRef<Map<TabsValue, { height: number }>>(new Map())
  const swipeScrRef = useRef<any>(null)
  const swipeChgRef = useRef(false)
  const [ctrW, setCtrW] = useState(0)
  const [swipeH, setSwipeH] = useState<number | undefined>(undefined)
  useEffect(() => { if (curName == null) return; visRef.current.add(curName) }, [curName])
  useEffect(() => {
    const validNames = new Set(panes.map(pane => pane.name))
    Array.from(paneLayMap.current.keys()).forEach(name => { if (!validNames.has(name)) paneLayMap.current.delete(name) })
    Array.from(layMap.current.keys()).forEach(name => { if (!validNames.has(name)) layMap.current.delete(name) })
  }, [panes])
  const trackPaneLay = isSwipe && swipeCfg?.autoHeight
  useEffect(() => { if (!trackPaneLay) paneLayMap.current.clear() }, [trackPaneLay])
  useEffect(() => {
    if (!isSwipe || !swipeCfg?.autoHeight) { setSwipeH(undefined); return }
    const layout = curName != null ? paneLayMap.current.get(curName) : undefined
    if (layout) setSwipeH(layout.height)
    else setSwipeH(undefined)
  }, [curName, isSwipe, swipeCfg?.autoHeight])
  useEffect(() => { return () => { cancelFrame(navCntSyncRef.current); navCntSyncRef.current = null } }, [])
  const scrollable = isBoolean(scrollableProp) ? scrollableProp : panes.length > resSwipeTh || ellipsis === false
  const indColor = color ?? tokens.colors.indicator
  const indRad = resLineH ? resLineH / 2 : tokens.indicator.radius
  const { indicatorX, indicatorWidth, indicatorInitializedRef, animateIndicator } = useTabsAnimation({ type, animated, scrollable, align, panes, nameIndexMap: nameIdxMap, resolvedLineWidth: resLineW, resolvedLineHeight: resLineH, resolvedDuration: resDur, currentName: curName, layoutMap: layMap, navContainerWidthRef: navCtrWRef })
  const { navScrollRef, scrollIntoView, handleNavScrollBeginDrag, handleNavScroll } = useTabsScroll({ scrollable, animated, currentName: curName, resolvedDuration: resDur, layoutMap: layMap, navContainerWidthRef: navCtrWRef, navContentWidthRef: navCntWRef })
  const onTabLayout = useCallback((name: TabsValue, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout
    layMap.current.set(name, { x, width })
    if (name === curNameRef.current) {
      const shouldAnimate = indicatorInitializedRef.current
      const didAnimate = animateIndicator(name, !shouldAnimate)
      if (didAnimate && !indicatorInitializedRef.current) indicatorInitializedRef.current = true
    }
  }, [animateIndicator, indicatorInitializedRef])
  const onNavCtrLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    navCtrWRef.current = width
    if (!scrollable && align !== 'start' && type === 'line' && curName !== undefined && curName !== null) {
      const shouldAnimate = indicatorInitializedRef.current
      const didAnimate = animateIndicator(curName, !shouldAnimate)
      if (didAnimate && !indicatorInitializedRef.current) indicatorInitializedRef.current = true
    }
  }, [align, animateIndicator, curName, scrollable, type, indicatorInitializedRef])
  const onCtrLayout = useCallback((event: LayoutChangeEvent) => { const nextW = event.nativeEvent.layout.width; setCtrW(prev => prev === nextW ? prev : nextW) }, [])
  const beforeChgRef = useRef(beforeChange)
  beforeChgRef.current = beforeChange
  const runBeforeChg = useCallback((name: TabsValue) => {
    if (!beforeChgRef.current) return Promise.resolve(true)
    try {
      return Promise.resolve(beforeChgRef.current(name)).then(res => res !== false).catch(() => false)
    } catch (error) {
      return Promise.resolve(false)
    }
  }, [])
  const chgSeqRef = useRef(0)
  const reqChg = useCallback((name: TabsValue, index: number) => {
    chgSeqRef.current += 1
    const seq = chgSeqRef.current
    runBeforeChg(name).then(canChange => {
      if (!canChange) return
      if (chgSeqRef.current !== seq) return
      setActVal(name, index)
    })
  }, [runBeforeChg, setActVal])
  const onPaneLayout = useCallback((name: TabsValue, event: LayoutChangeEvent) => {
    if (isSwipe && swipeCfg?.autoHeight) {
      const { height } = event.nativeEvent.layout
      paneLayMap.current.set(name, { height })
      if (name === curName) setSwipeH(height)
    }
  }, [curName, isSwipe, swipeCfg?.autoHeight])
  const swipeEndIdxRef = useRef<number | null>(null)
  useEffect(() => { swipeEndIdxRef.current = null }, [curName])
  const onSwipeEnd = useCallback((offsetX: number) => {
    if (!isSwipe || ctrW <= 0) return
    const pageIdx = Math.round(offsetX / ctrW)
    if (swipeEndIdxRef.current === pageIdx) return
    swipeEndIdxRef.current = pageIdx
    const nextPane = panes[pageIdx]
    if (!nextPane || nextPane.name === curNameRef.current) return
    swipeChgRef.current = true
    reqChg(nextPane.name, nextPane.index)
  }, [ctrW, isSwipe, panes, reqChg])
  const onSwipeMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => { onSwipeEnd(event.nativeEvent.contentOffset.x) }, [onSwipeEnd])
  const onSwipeScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => { onSwipeEnd(event.nativeEvent.contentOffset.x) }, [onSwipeEnd])
  useEffect(() => {
    if (!isSwipe || !swipeScrRef.current || ctrW <= 0) return
    if (swipeChgRef.current) { swipeChgRef.current = false; return }
    if (actIdx < 0) return
    const node = swipeScrRef.current?.getNode?.() ?? swipeScrRef.current
    if (!node?.scrollTo) return
    node.scrollTo({ x: ctrW * actIdx, y: 0, animated: true })
  }, [actIdx, ctrW, isSwipe])
  const onClickTabRef = useRef(onClickTab)
  onClickTabRef.current = onClickTab
  const onSel = useCallback((pane: ParsedPane, index: number, event?: unknown) => {
    const payload = { name: pane.name, index, disabled: !!pane.disabled, event }
    onClickTabRef.current?.(payload)
    if (pane.disabled || pane.name === curNameRef.current) return
    reqChg(pane.name, index)
  }, [reqChg])
  const scrollTo = useCallback((name: TabsValue, _options?: { immediate?: boolean }) => {
    const target = panes.find(pane => pane.name === name && !pane.disabled)
    if (!target) return
    setActVal(target.name, target.index)
  }, [panes, setActVal])
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])
  const firstRndRef = useRef(true)
  useEffect(() => { if (firstRndRef.current) { firstRndRef.current = false; scrollIntoView(true) } }, [scrollIntoView])
  useEffect(() => { if (!firstRndRef.current) scrollIntoView() }, [curName, scrollIntoView])
  const hasBorder = border ?? false
  const showInd = type === 'line'
  const navH = type === 'jumbo' ? tokens.jumbo.height : type === 'card' ? tokens.card.height : tokens.tabList.height
  const navPB = Platform.OS === 'web' && type !== 'line' && type !== 'card' ? tokens.tabList.paddingBottom : 0
  const indBot = showInd ? (type === 'line' ? 0 : tokens.indicator.offset) : 0
  if (panes.length === 0) return null
  const indicatorNode = showInd ? <Animated.View testID="rv-tabs-indicator" style={[S.ind, { height: resLineH, borderRadius: indRad, backgroundColor: indColor, width: indicatorWidth, bottom: indBot, transform: [{ translateX: indicatorX }] }]} /> : null
  const navItems = useMemo(() => panes.map(pane => <TabBarItem key={pane.key} pane={pane} isActive={pane.name === curName} align={align} scrollable={scrollable} type={type} ellipsis={ellipsis} tokens={tokens} color={color} titleActiveColor={titleActiveColor} titleInactiveColor={titleInactiveColor} tabStyle={tabStyle} titleStyle={titleStyle} descriptionStyle={descriptionStyle} onSelect={onSel} onLayout={onTabLayout} isLast={pane.index === panes.length - 1} />), [align, color, curName, descriptionStyle, ellipsis, onSel, onTabLayout, panes, scrollable, tabStyle, titleActiveColor, titleInactiveColor, titleStyle, tokens, type])
  const onNavCntSizeChg = useCallback((w: number) => {
    const prev = navCntWRef.current
    navCntWRef.current = w
    if (prev === 0 || firstRndRef.current) { scrollIntoView(true); return }
    if (Math.abs(w - prev) > 1) {
      cancelFrame(navCntSyncRef.current)
      navCntSyncRef.current = requestFrame(() => { navCntSyncRef.current = null; scrollIntoView() })
    }
  }, [scrollIntoView])
  const navBody = scrollable ? <ScrollView horizontal ref={navScrollRef} accessibilityRole="tablist" showsHorizontalScrollIndicator={false} scrollEventThrottle={16} onScrollBeginDrag={handleNavScrollBeginDrag} onScroll={handleNavScroll} onContentSizeChange={onNavCntSizeChg} contentContainerStyle={S.navC}>{navItems}{indicatorNode}</ScrollView> : <View accessibilityRole="tablist" style={[S.navC, S.navCSta]}>{navItems}{indicatorNode}</View>
  const navContent = <View style={[S.wrap, { backgroundColor: background }, tabBarStyle]}>{navLeft && <View style={{ paddingHorizontal: tokens.spacing.navSidePaddingHorizontal }}>{navLeft}</View>}<View style={[S.nav, { minHeight: navH + navPB, paddingBottom: navPB }, type === 'card' ? { borderRadius: tokens.card.radius, marginHorizontal: tokens.card.marginHorizontal, overflow: 'hidden' } : null]} onLayout={onNavCtrLayout}>{navBody}{type === 'card' && <View style={createHairlineView({ position: 'all', color: color ?? tokens.colors.cardBorder, borderRadius: tokens.card.radius })} />}</View>{navRight && <View style={{ paddingHorizontal: tokens.spacing.navSidePaddingHorizontal }}>{navRight}</View>}{hasBorder && type === 'line' && <View style={createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0 })} />}</View>
  const paneNodes = useMemo(() => panes.map(pane => {
    const isActive = pane.name === curName
    const shouldRender = !lazyRender || isActive || visRef.current.has(pane.name)
    if (!shouldRender && !isSwipe) return null
    const layoutHandler = isSwipe && swipeCfg?.autoHeight ? (event: LayoutChangeEvent) => onPaneLayout(pane.name, event) : undefined
    const paneStyles = [S.pane, isSwipe ? S.swipePane : null, isSwipe && ctrW > 0 && { width: ctrW }, !isSwipe && !isActive ? S.hidPane : null]
    const paneContent = shouldRender ? pane.children : (lazyRenderPlaceholder || null)
    return <View key={pane.key} testID={`rv-tabs-pane-${pane.name}`} onLayout={layoutHandler} style={paneStyles}>{paneContent}</View>
  }), [ctrW, curName, onPaneLayout, isSwipe, lazyRender, lazyRenderPlaceholder, panes, swipeCfg?.autoHeight])
  const baseContentStyle = [S.content, contentStyle]
  const swipeContentStyle = [S.content, contentStyle, swipeCfg?.autoHeight && swipeH !== undefined && { height: swipeH }]
  const contentNode = isSwipe ? <View style={swipeContentStyle}><Animated.ScrollView ref={swipeScrRef} horizontal pagingEnabled scrollEventThrottle={16} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onSwipeMomentumScrollEnd} onScrollEndDrag={onSwipeScrollEndDrag} nestedScrollEnabled={swipeCfg?.preventScroll === false} directionalLockEnabled={swipeCfg?.preventScroll !== false}>{paneNodes}</Animated.ScrollView></View> : <View style={baseContentStyle}>{paneNodes}</View>
  return <View {...rest} style={[S.ctr, style]} onLayout={onCtrLayout}>{navContent}{navBottom && <View style={{ marginTop: tokens.spacing.navBottomMarginTop }}>{navBottom}</View>}{contentNode}</View>
}

const S = StyleSheet.create({
  ctr: { width: '100%' },
  wrap: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  nav: { flex: 1, position: 'relative', alignSelf: 'stretch' },
  navC: { flexDirection: 'row', alignItems: 'center', height: '100%', position: 'relative' },
  navCSta: { flex: 1 },
  lblW: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
  lblWJ: { alignItems: 'center' },
  cardLbl: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  tabI: { flexShrink: 0, height: '100%', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  flexI: { flexGrow: 1 },
  title: { includeFontPadding: false },
  descTxt: { includeFontPadding: false },
  ellipsis: { maxWidth: '100%', flexShrink: 1 },
  ind: { position: 'absolute', bottom: 0, left: 0 },
  content: { width: '100%' },
  pane: { width: '100%' },
  swipePane: { flexShrink: 0 },
  hidPane: { display: 'none' },
})

const TabsBaseRef = React.forwardRef(TabsBaseInner) as React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<TabsRef>>
TabsBaseRef.displayName = 'Tabs'
const TabsBase = React.memo(TabsBaseRef)
const TabsWithPane = Object.assign(TabsBase, { TabPane })
export { TabPane }
export default TabsWithPane
