import React, { memo, useCallback, useEffect, useImperativeHandle, useRef, useState, useMemo, Children, isValidElement, type FC, type ForwardRefRenderFunction } from 'react'
import { Animated, Pressable, StyleSheet, Text, ScrollView, View, Platform, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ViewStyle } from 'react-native'
import { useAriaPress, useControllableValue } from '../../hooks'
import { useReducedMotion } from '../../hooks/animation'
import { createHairlineView } from '../../utils/hairline'
import { parseNumberLike } from '../../utils/number'
import { isBoolean, isFunction, isObject, isRenderable, isText } from '../../utils/validate'
import type { TabPaneProps, TabsProps, TabsRef, TabsValue } from './types'
import { useTabsTokens } from './tokens'

const TabPane: FC<TabPaneProps> = () => null
TabPane.displayName = 'Tabs.TabPane'

interface ParsedPane extends TabPaneProps { key: React.Key; name: TabsValue; index: number }

const hasRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'
const requestFrame: (cb: (time?: number) => void) => number = hasRaf ? requestAnimationFrame : (cb) => setTimeout(cb, 16) as unknown as number
const cancelFrame = (id: number | null) => { if (id != null) (hasRaf ? cancelAnimationFrame : clearTimeout)(id) }
const isTabPaneElement = (child: React.ReactNode): child is React.ReactElement<TabPaneProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type === TabPane) return true
  return (child.type as unknown as { displayName?: string }).displayName === 'Tabs.TabPane'
}

interface UseTabsAnimationParams { type: 'line' | 'card' | 'jumbo' | 'capsule'; animated: boolean; scrollable: boolean; align: 'start' | 'center' | 'end'; panes: Array<{ name: TabsValue; index: number }>; nameIndexMap: Map<TabsValue, number>; resolvedLineWidth?: number; resolvedLineHeight: number; resolvedDuration: number; currentName?: TabsValue | null; layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>; navContainerWidthRef: React.MutableRefObject<number> }

const useTabsAnimation = ({ type, animated, scrollable, align, panes, nameIndexMap, resolvedLineWidth, resolvedDuration, currentName, layoutMap, navContainerWidthRef }: UseTabsAnimationParams) => {
  const indX = useRef(new Animated.Value(0)).current; const indW = useRef(new Animated.Value(0)).current; const indInitRef = useRef(false); const animRef = useRef<Animated.CompositeAnimation | null>(null)
  const animateIndicator = useCallback((name?: TabsValue, immediate?: boolean) => {
    if (name == null || type !== 'line') return false
    const eqW = !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0; const idx = nameIndexMap.get(name) ?? -1
    const eqTabW = eqW ? navContainerWidthRef.current / panes.length : 0; const lay = eqW ? { x: Math.max(idx, 0) * eqTabW, width: eqTabW } : layoutMap.current.get(name)
    if (!lay || idx < 0) return false; animRef.current?.stop()
    const timing = (v: Animated.Value, to: number) => Animated.timing(v, { toValue: to, duration: immediate || !animated ? 0 : resolvedDuration, useNativeDriver: false, isInteraction: false })
    const tW = resolvedLineWidth ?? lay.width; const tX = resolvedLineWidth ? lay.x + (lay.width - tW) / 2 : lay.x
    const anim = Animated.parallel([timing(indX, tX), timing(indW, tW)]); animRef.current = anim; anim.start(({ finished }) => { if (finished) animRef.current = null }); return true
  }, [align, animated, indW, indX, nameIndexMap, panes.length, resolvedDuration, resolvedLineWidth, scrollable, type, layoutMap, navContainerWidthRef])
  useEffect(() => { if (currentName == null) return; const should = indInitRef.current; const did = animateIndicator(currentName, !should); if (did && !indInitRef.current) indInitRef.current = true }, [animateIndicator, currentName])
  useEffect(() => () => { animRef.current?.stop(); animRef.current = null }, [])
  return { indicatorX: indX, indicatorWidth: indW, indicatorInitializedRef: indInitRef, animateIndicator }
}

interface UseTabsScrollParams { scrollable: boolean; animated: boolean; currentName?: TabsValue | null; resolvedDuration: number; layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>; navContainerWidthRef: React.MutableRefObject<number>; navContentWidthRef: React.MutableRefObject<number> }

const useTabsScroll = ({ scrollable, animated, currentName, resolvedDuration, layoutMap, navContainerWidthRef, navContentWidthRef }: UseTabsScrollParams) => {
  const navScrRef = useRef<ScrollView>(null); const navX = useRef(new Animated.Value(0)).current; const navAnimRef = useRef<Animated.CompositeAnimation | null>(null); const autoScrRef = useRef(false); const lastXRef = useRef(0); const frameRef = useRef<number | null>(null)
  const scrollIntoView = useCallback((immediate?: boolean) => {
    if (!scrollable || currentName == null) return; const lay = layoutMap.current.get(currentName); const ctrW = navContainerWidthRef.current; if (!lay || !ctrW) return
    const cntW = navContentWidthRef.current; const tX = lay.x - (ctrW - lay.width) / 2; const maxS = Math.max(cntW - ctrW, 0); const clampX = Math.max(0, Math.min(tX, maxS))
    if (maxS <= 0 || Math.abs(clampX - lastXRef.current) < 1) return; navAnimRef.current?.stop(); navAnimRef.current = null; cancelFrame(frameRef.current); frameRef.current = null
    if (immediate || !animated) { autoScrRef.current = true; navX.setValue(clampX); frameRef.current = requestFrame(() => { frameRef.current = null; autoScrRef.current = false }); return }
    navX.setValue(lastXRef.current); autoScrRef.current = true; navAnimRef.current = Animated.timing(navX, { toValue: clampX, duration: resolvedDuration, useNativeDriver: false, isInteraction: false }); navAnimRef.current.start(({ finished }) => { navAnimRef.current = null; autoScrRef.current = false; if (finished) lastXRef.current = clampX })
  }, [animated, currentName, navX, resolvedDuration, scrollable, layoutMap, navContainerWidthRef, navContentWidthRef])
  useEffect(() => { if (!scrollable) return; const id = navX.addListener(({ value }) => { const prev = lastXRef.current; lastXRef.current = value; if (Math.abs(value - prev) >= 0.5) navScrRef.current?.scrollTo({ x: value, y: 0, animated: false }) }); return () => navX.removeListener(id) }, [navX, scrollable])
  useEffect(() => () => { cancelFrame(frameRef.current); frameRef.current = null }, [])
  const onNavBeginDrag = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { autoScrRef.current = false; navAnimRef.current?.stop(); navAnimRef.current = null; lastXRef.current = e.nativeEvent.contentOffset.x }, [])
  const onNavScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { if (autoScrRef.current) return; lastXRef.current = e.nativeEvent.contentOffset.x }, [])
  return { navScrollRef: navScrRef, navScrollX: navX, scrollIntoView, handleNavScrollBeginDrag: onNavBeginDrag, handleNavScroll: onNavScroll }
}

interface TabItemProps { pane: ParsedPane; isActive: boolean; align: TabsProps['align']; scrollable: boolean; type: TabsProps['type']; ellipsis: boolean; tokens: ReturnType<typeof useTabsTokens>; color?: string; titleActiveColor?: string; titleInactiveColor?: string; tabStyle?: TabsProps['tabStyle']; titleStyle?: TabsProps['titleStyle']; descriptionStyle?: TabsProps['descriptionStyle']; onSelect: (pane: ParsedPane, index: number, event?: unknown) => void; onLayout: (name: TabsValue, event: LayoutChangeEvent) => void; isLast: boolean }

const TabBarItemInner: React.FC<TabItemProps> = ({ pane, isActive, align, scrollable, type, ellipsis, tokens, color, titleActiveColor, titleInactiveColor, tabStyle, titleStyle, descriptionStyle, onSelect, onLayout, isLast }) => {
  const dis = !!pane.disabled; const aria = useAriaPress({ onPress: e => onSelect(pane, pane.index, e), extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: isActive, disabled: dis }, testID: `rv-tabs-item-${pane.name}` } })
  const isCap = type === 'capsule'; const isJ = type === 'jumbo'; const isC = type === 'card'
  const rTitle = isFunction(pane.title) ? pane.title(isActive) : pane.title ?? pane.name; const rDesc = isFunction(pane.description) ? pane.description(isActive) : pane.description
  const actClr = titleActiveColor ?? (isC ? tokens.colors.cardActiveText : isCap ? tokens.colors.capsuleActiveText : color ?? tokens.colors.textActive); const inactClr = titleInactiveColor ?? (isC ? color ?? tokens.colors.cardBorder : isCap ? tokens.colors.capsuleText : tokens.colors.text)
  const txtClr = pane.disabled ? tokens.colors.textDisabled : isActive ? actClr : inactClr; const descClr = dis ? tokens.colors.textDisabled : isJ ? (isActive ? tokens.colors.jumboDescriptionActive : tokens.colors.jumboDescription) : (isActive ? tokens.colors.descriptionActive : tokens.colors.description)
  const flex = !scrollable && (align !== 'start' || isC); const compact = isC || isJ || isCap; const hPad = compact ? 0 : tokens.tabList.paddingHorizontal; const vPad = compact ? 0 : tokens.tabList.paddingVertical
  const lblWrap: ViewStyle[] = [S.lblW, isJ && S.lblWJ, isC && S.cardLbl, isC && { paddingHorizontal: tokens.card.paddingHorizontal, paddingVertical: tokens.card.paddingVertical }, isCap && { flex: 1, alignSelf: 'stretch', paddingHorizontal: tokens.capsule.paddingHorizontal, paddingVertical: tokens.capsule.paddingVertical }, isJ && { paddingHorizontal: tokens.jumbo.paddingHorizontal, paddingVertical: tokens.jumbo.paddingVertical, alignItems: 'center' }].filter(Boolean) as ViewStyle[]
  const lblTxtWrap: ViewStyle[] | null = isCap ? [{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRadius: tokens.capsule.radius, backgroundColor: isActive ? color ?? tokens.colors.capsuleActiveBackground : tokens.colors.capsuleBackground }] : null
  const titleStyleArr = [S.title, { color: txtClr, fontFamily: tokens.typography.fontFamily, fontSize: isJ ? tokens.typography.jumboTitleSize : tokens.typography.titleSize, fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight, lineHeight: isJ ? tokens.typography.jumboLineHeight : undefined, textAlign: 'center' as const }, ellipsis && !isJ ? S.ellipsis : null, titleStyle]
  const descMT = isJ ? tokens.spacing.jumboDescriptionMarginTop : tokens.spacing.descriptionMarginTop; const descJStyle = isJ ? { backgroundColor: isActive ? tokens.colors.jumboDescriptionActiveBackground : tokens.colors.jumboDescriptionBackground, paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal, paddingVertical: tokens.jumbo.descriptionPaddingVertical, borderRadius: tokens.jumbo.descriptionRadius } : null
  const onLay = useCallback((e: LayoutChangeEvent) => onLayout(pane.name, e), [onLayout, pane.name])
  return <Pressable {...aria.interactionProps} onLayout={onLay} style={[S.tabI, flex ? S.flexI : null, { paddingHorizontal: hPad, paddingVertical: vPad }, isC ? { backgroundColor: isActive ? color ?? tokens.colors.cardActiveBackground : tokens.colors.cardBackground } : null, tabStyle]}><View style={lblWrap}>{lblTxtWrap ? <View style={lblTxtWrap}><Text style={titleStyleArr} numberOfLines={ellipsis && !isJ ? 1 : undefined}>{rTitle}</Text></View> : <Text style={titleStyleArr} numberOfLines={ellipsis && !isJ ? 1 : undefined}>{rTitle}</Text>}{isRenderable(rDesc) && (isText(rDesc) ? <Text style={[S.descTxt, { color: descClr, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.descriptionSize, marginTop: descMT, textAlign: 'center' as const }, descJStyle, descriptionStyle]}>{rDesc}</Text> : <View style={[{ marginTop: descMT, alignItems: 'center' as const }, descJStyle]}>{rDesc}</View>)}{isRenderable(pane.badge) && <View style={{ marginTop: tokens.spacing.badgeMarginTop }}>{isText(pane.badge) ? <Text style={{ color: tokens.colors.badgeText, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.badgeTextSize }}>{pane.badge}</Text> : pane.badge}</View>}</View>{isC && !isLast && <View style={createHairlineView({ position: 'right', color: color ?? tokens.colors.cardBorder, top: 0, bottom: 0 })} />}</Pressable>
}

const TabBarItem = memo(TabBarItemInner)

const TabsBaseInner: ForwardRefRenderFunction<TabsRef, TabsProps> = (props, ref) => {
  const { tokensOverride, children, type: typeProp, align: alignProp, ellipsis: ellipsisProp, swipeThreshold: swipeThresholdProp, animated: animatedProp, duration: durationProp, lazyRender: lazyRenderProp, lazyRenderPlaceholder, scrollable: scrollableProp, swipeable, color, background: backgroundProp, border, navLeft, navRight, navBottom, tabBarStyle, tabStyle, titleStyle, descriptionStyle, contentStyle, lineWidth, lineHeight, titleActiveColor, titleInactiveColor, beforeChange, onClickTab, onChange, style, ...rest } = props
  const tokens = useTabsTokens(tokensOverride)
  const reducedMotion = useReducedMotion()
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
  const resDur = reducedMotion ? 0 : Math.max(0, parseNumberLike(duration) ?? tokens.defaults.duration)
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
        if (element.type === React.Fragment) { walk(element.props.children); return }
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
const TabsWithPane = Object.assign(React.memo(TabsBaseRef), { TabPane })
export { TabPane }
export default TabsWithPane
