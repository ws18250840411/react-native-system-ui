import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ViewStyle } from 'react-native'
import { useAriaPress } from '../../hooks/aria/useAriaPress'
import { createHairlineView } from '../../utils/hairline'
import { isRenderable, isText } from '../../utils/base'
import type { TabPaneProps, TabsProps, TabsValue } from './types'
import { useTabsTokens } from './tokens'

export interface ParsedPane extends TabPaneProps { key: React.Key; name: TabsValue; index: number }
export const isTabPaneElement = (child: React.ReactNode, TabPane: React.FC<TabPaneProps>): child is React.ReactElement<TabPaneProps> => !React.isValidElement(child) ? false : child.type === TabPane ? true : (child.type as unknown as { displayName?: string }).displayName === 'Tabs.TabPane'

interface TabItemProps { pane: ParsedPane; isActive: boolean; align: TabsProps['align']; scrollable: boolean; type: TabsProps['type']; ellipsis: boolean; tokens: ReturnType<typeof useTabsTokens>; color?: string; titleActiveColor?: string; titleInactiveColor?: string; tabStyle?: TabsProps['tabStyle']; titleStyle?: TabsProps['titleStyle']; descriptionStyle?: TabsProps['descriptionStyle']; onSelect: (pane: ParsedPane, index: number, event?: unknown) => void; onLayout: (name: TabsValue, event: LayoutChangeEvent) => void; isLast: boolean }

const S = { lblW: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' } as ViewStyle, lblWJ: { alignItems: 'center' } as ViewStyle, cardLbl: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } as ViewStyle, tabI: { flexShrink: 0, height: '100%', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' } as ViewStyle, flexI: { flexGrow: 1 } as ViewStyle, title: { includeFontPadding: false } as any, descTxt: { includeFontPadding: false } as any, ellipsis: { maxWidth: '100%', flexShrink: 1 } as ViewStyle }

const TabBarItemInner: React.FC<TabItemProps> = ({ pane, isActive, align, scrollable, type, ellipsis, tokens, color, titleActiveColor, titleInactiveColor, tabStyle, titleStyle, descriptionStyle, onSelect, onLayout, isLast }) => {
  const dis = !!pane.disabled; const aria = useAriaPress({ onPress: e => onSelect(pane, pane.index, e), extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: isActive, disabled: dis }, testID: `rv-tabs-item-${pane.name}` } }); const isCap = type === 'capsule'; const isJ = type === 'jumbo'; const isC = type === 'card'; const rTitle = typeof pane.title === 'function' ? pane.title(isActive) : pane.title ?? pane.name; const rDesc = typeof pane.description === 'function' ? pane.description(isActive) : pane.description; const actClr = titleActiveColor ?? (isC ? tokens.colors.cardActiveText : isCap ? tokens.colors.capsuleActiveText : color ?? tokens.colors.textActive); const inactClr = titleInactiveColor ?? (isC ? color ?? tokens.colors.cardBorder : isCap ? tokens.colors.capsuleText : tokens.colors.text); const txtClr = pane.disabled ? tokens.colors.textDisabled : isActive ? actClr : inactClr; const descClr = dis ? tokens.colors.textDisabled : isJ ? (isActive ? tokens.colors.jumboDescriptionActive : tokens.colors.jumboDescription) : (isActive ? tokens.colors.descriptionActive : tokens.colors.description); const flex = !scrollable && (align !== 'start' || isC); const compact = isC || isJ || isCap; const hPad = compact ? 0 : tokens.tabList.paddingHorizontal; const vPad = compact ? 0 : tokens.tabList.paddingVertical; const lblWrap = [S.lblW, isJ ? S.lblWJ : null, isC ? S.cardLbl : null, isC ? { paddingHorizontal: tokens.card.paddingHorizontal, paddingVertical: tokens.card.paddingVertical } : null, isCap ? { flex: 1, alignSelf: 'stretch' as const, paddingHorizontal: tokens.capsule.paddingHorizontal, paddingVertical: tokens.capsule.paddingVertical } : null, isJ ? { paddingHorizontal: tokens.jumbo.paddingHorizontal, paddingVertical: tokens.jumbo.paddingVertical, alignItems: 'center' as const } : null]; const lblTxtWrap: ViewStyle[] | null = isCap ? [{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', borderRadius: tokens.capsule.radius, backgroundColor: isActive ? color ?? tokens.colors.capsuleActiveBackground : tokens.colors.capsuleBackground }] : null; const titleStyleArr = [S.title, { color: txtClr, fontFamily: tokens.typography.fontFamily, fontSize: isJ ? tokens.typography.jumboTitleSize : tokens.typography.titleSize, fontWeight: isActive ? tokens.typography.titleActiveWeight : tokens.typography.titleWeight, lineHeight: isJ ? tokens.typography.jumboLineHeight : undefined, textAlign: 'center' as const }, ellipsis && !isJ ? S.ellipsis : null, titleStyle]; const descMT = isJ ? tokens.spacing.jumboDescriptionMarginTop : tokens.spacing.descriptionMarginTop; const descJStyle = isJ ? { backgroundColor: isActive ? tokens.colors.jumboDescriptionActiveBackground : tokens.colors.jumboDescriptionBackground, paddingHorizontal: tokens.jumbo.descriptionPaddingHorizontal, paddingVertical: tokens.jumbo.descriptionPaddingVertical, borderRadius: tokens.jumbo.descriptionRadius } : null; const onLay = useCallback((e: LayoutChangeEvent) => onLayout(pane.name, e), [onLayout, pane.name])
  return <Pressable {...aria.interactionProps} onLayout={onLay} style={[S.tabI, flex ? S.flexI : null, { paddingHorizontal: hPad, paddingVertical: vPad }, isC ? { backgroundColor: isActive ? color ?? tokens.colors.cardActiveBackground : tokens.colors.cardBackground } : null, tabStyle]}><View style={lblWrap}>{lblTxtWrap ? <View style={lblTxtWrap}><Text style={titleStyleArr} numberOfLines={ellipsis && !isJ ? 1 : undefined}>{rTitle}</Text></View> : <Text style={titleStyleArr} numberOfLines={ellipsis && !isJ ? 1 : undefined}>{rTitle}</Text>}{isRenderable(rDesc) && (isText(rDesc) ? <Text style={[S.descTxt, { color: descClr, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.descriptionSize, marginTop: descMT, textAlign: 'center' as const }, descJStyle, descriptionStyle]}>{rDesc}</Text> : <View style={[{ marginTop: descMT, alignItems: 'center' as const }, descJStyle]}>{rDesc}</View>)}{isRenderable(pane.badge) && <View style={{ marginTop: tokens.spacing.badgeMarginTop }}>{isText(pane.badge) ? <Text style={{ color: tokens.colors.badgeText, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.badgeTextSize }}>{pane.badge}</Text> : pane.badge}</View>}</View>{isC && !isLast && <View style={createHairlineView({ position: 'right', color: color ?? tokens.colors.cardBorder, top: 0, bottom: 0 })} />}</Pressable>
}

export const TabBarItem = memo(TabBarItemInner)

const hasRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'
export const requestTabsFrame: (cb: (time?: number) => void) => number = hasRaf ? requestAnimationFrame : (cb) => setTimeout(cb, 16) as unknown as number
export const cancelTabsFrame = (id: number | null) => { if (id != null) (hasRaf ? cancelAnimationFrame : clearTimeout)(id) }

interface UseTabsAnimationParams {
  type: 'line' | 'card' | 'jumbo' | 'capsule'
  animated: boolean
  scrollable: boolean
  align: 'start' | 'center' | 'end'
  panes: Array<{ name: TabsValue; index: number }>
  resolvedLineWidth?: number
  resolvedDuration: number
  currentName?: TabsValue | null
  layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: React.MutableRefObject<number>
}

export const useTabsAnimation = ({ type, animated, scrollable, align, panes, resolvedLineWidth, resolvedDuration, currentName, layoutMap, navContainerWidthRef }: UseTabsAnimationParams) => {
  const indX = useRef(new Animated.Value(0)).current; const indW = useRef(new Animated.Value(0)).current; const indInitRef = useRef(false); const animRef = useRef<Animated.CompositeAnimation | null>(null)
  const animateIndicator = useCallback((name?: TabsValue, immediate?: boolean) => {
    if (name == null || type !== 'line') return false; const idx = panes.findIndex(p => p.name === name); const eqW = !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0; const eqTabW = eqW ? navContainerWidthRef.current / panes.length : 0; const lay = eqW ? { x: Math.max(idx, 0) * eqTabW, width: eqTabW } : layoutMap.current.get(name); if (!lay || idx < 0) return false; animRef.current?.stop(); const timing = (v: Animated.Value, to: number) => Animated.timing(v, { toValue: to, duration: immediate || !animated ? 0 : resolvedDuration, useNativeDriver: false, isInteraction: false }); const tW = resolvedLineWidth ?? lay.width; const tX = resolvedLineWidth ? lay.x + (lay.width - tW) / 2 : lay.x; const anim = Animated.parallel([timing(indX, tX), timing(indW, tW)]); animRef.current = anim; anim.start(({ finished }) => { if (finished) animRef.current = null }); return true
  }, [align, animated, indW, indX, panes, resolvedDuration, resolvedLineWidth, scrollable, type, layoutMap, navContainerWidthRef])
  useEffect(() => { if (currentName == null) return; const should = indInitRef.current; const did = animateIndicator(currentName, !should); if (did && !indInitRef.current) indInitRef.current = true }, [animateIndicator, currentName])
  useEffect(() => () => { animRef.current?.stop(); animRef.current = null }, [])
  return { indicatorX: indX, indicatorWidth: indW, indicatorInitializedRef: indInitRef, animateIndicator }
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

export const useTabsScroll = ({ scrollable, animated, currentName, resolvedDuration, layoutMap, navContainerWidthRef, navContentWidthRef }: UseTabsScrollParams) => {
  const navScrRef = useRef<any>(null); const navX = useRef(new Animated.Value(0)).current; const navAnimRef = useRef<Animated.CompositeAnimation | null>(null); const autoScrRef = useRef(false); const lastXRef = useRef(0); const frameRef = useRef<number | null>(null)
  const scrollIntoView = useCallback((immediate?: boolean) => {
    if (!scrollable || currentName == null) return; const lay = layoutMap.current.get(currentName); const ctrW = navContainerWidthRef.current; if (!lay || !ctrW) return; const cntW = navContentWidthRef.current; const tX = lay.x - (ctrW - lay.width) / 2; const maxS = Math.max(cntW - ctrW, 0); const clampX = Math.max(0, Math.min(tX, maxS)); if (maxS <= 0 || Math.abs(clampX - lastXRef.current) < 1) return; navAnimRef.current?.stop(); navAnimRef.current = null; cancelTabsFrame(frameRef.current); frameRef.current = null; if (immediate || !animated) { autoScrRef.current = true; navX.setValue(clampX); frameRef.current = requestTabsFrame(() => { frameRef.current = null; autoScrRef.current = false }); return }; navX.setValue(lastXRef.current); autoScrRef.current = true; navAnimRef.current = Animated.timing(navX, { toValue: clampX, duration: resolvedDuration, useNativeDriver: false, isInteraction: false }); navAnimRef.current.start(({ finished }) => { navAnimRef.current = null; autoScrRef.current = false; if (finished) lastXRef.current = clampX })
  }, [animated, currentName, navX, resolvedDuration, scrollable, layoutMap, navContainerWidthRef, navContentWidthRef])
  useEffect(() => { if (!scrollable) return; const id = navX.addListener(({ value }) => { const prev = lastXRef.current; lastXRef.current = value; if (Math.abs(value - prev) >= 0.5) navScrRef.current?.scrollTo({ x: value, y: 0, animated: false }) }); return () => navX.removeListener(id) }, [navX, scrollable])
  useEffect(() => () => { cancelTabsFrame(frameRef.current); frameRef.current = null }, [])
  const handleNavScrollBeginDrag = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { autoScrRef.current = false; navAnimRef.current?.stop(); navAnimRef.current = null; lastXRef.current = e.nativeEvent.contentOffset.x }, [])
  const handleNavScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => { if (autoScrRef.current) return; lastXRef.current = e.nativeEvent.contentOffset.x }, [])
  return { navScrollRef: navScrRef, scrollIntoView, handleNavScrollBeginDrag, handleNavScroll }
}
