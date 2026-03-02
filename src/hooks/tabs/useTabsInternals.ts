import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native'
import type { TabsValue } from '../../components/tabs/types'

const hasRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'
export const requestTabsFrame: (cb: (time?: number) => void) => number = hasRaf ? requestAnimationFrame : (cb) => setTimeout(cb, 16) as unknown as number
export const cancelTabsFrame = (id: number | null) => { if (id != null) (hasRaf ? cancelAnimationFrame : clearTimeout)(id) }

interface UseTabsAnimationParams {
  type: 'line' | 'card' | 'jumbo' | 'capsule'
  animated: boolean
  scrollable: boolean
  align: 'start' | 'center' | 'end'
  panes: Array<{ name: TabsValue; index: number }>
  nameIndexMap: Map<TabsValue, number>
  resolvedLineWidth?: number
  resolvedLineHeight?: number
  resolvedDuration: number
  currentName?: TabsValue | null
  layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: React.MutableRefObject<number>
}

export const useTabsAnimation = ({ type, animated, scrollable, align, panes, nameIndexMap, resolvedLineWidth, resolvedDuration, currentName, layoutMap, navContainerWidthRef }: UseTabsAnimationParams) => {
  const indX = useRef(new Animated.Value(0)).current; const indW = useRef(new Animated.Value(0)).current; const indInitRef = useRef(false); const animRef = useRef<Animated.CompositeAnimation | null>(null)
  const animateIndicator = useCallback((name?: TabsValue, immediate?: boolean) => {
    if (name == null || type !== 'line') return false; const eqW = !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0; const idx = nameIndexMap.get(name) ?? -1; const eqTabW = eqW ? navContainerWidthRef.current / panes.length : 0; const lay = eqW ? { x: Math.max(idx, 0) * eqTabW, width: eqTabW } : layoutMap.current.get(name); if (!lay || idx < 0) return false; animRef.current?.stop(); const timing = (v: Animated.Value, to: number) => Animated.timing(v, { toValue: to, duration: immediate || !animated ? 0 : resolvedDuration, useNativeDriver: false, isInteraction: false }); const tW = resolvedLineWidth ?? lay.width; const tX = resolvedLineWidth ? lay.x + (lay.width - tW) / 2 : lay.x; const anim = Animated.parallel([timing(indX, tX), timing(indW, tW)]); animRef.current = anim; anim.start(({ finished }) => { if (finished) animRef.current = null }); return true
  }, [align, animated, indW, indX, nameIndexMap, panes.length, resolvedDuration, resolvedLineWidth, scrollable, type, layoutMap, navContainerWidthRef])
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
