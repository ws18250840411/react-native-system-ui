import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, type LayoutChangeEvent, Platform, Text, View, type ViewStyle } from 'react-native'
import { clamp, parseNumberLike, parsePercentage } from '../../utils/number'
import { isString, isText } from '../../utils/base'
import { useReducedMotion } from '../../hooks/animation'
import { useProgressTokens } from './tokens'
import type { ProgressProps } from './types'

const GRADIENT_REGEX = /linear-gradient|radial-gradient|conic-gradient/i
type ProgressOrientation = 'horizontal' | 'vertical'

type ProgressContextValue = {
  animatedValue: Animated.Value
  orientation: ProgressOrientation
  height: number
  indicatorColor?: string
  indicatorStyle?: ViewStyle | ViewStyle[]
  isGradient: boolean
  gradientColor?: string
  layoutIndicator: ViewStyle
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null)

export const ProgressFilledTrack: React.FC<{ style?: ViewStyle | ViewStyle[] }> = ({ style }) => {
  const context = useContext(ProgressContext)
  if (!context) return null
  const size = context.animatedValue.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] })
  const sizeStyle = context.orientation === 'vertical' ? ({ width: context.height, height: size, bottom: 0, left: 0, position: 'absolute' } as unknown as ViewStyle) : ({ height: context.height, width: size } as unknown as ViewStyle)
  const baseStyle = [context.orientation === 'vertical' ? ({ position: 'absolute', left: 0, bottom: 0 } as unknown as ViewStyle) : context.layoutIndicator, { backgroundColor: context.indicatorColor, borderRadius: context.height / 2, ...(context.isGradient && context.gradientColor ? ({ backgroundImage: context.gradientColor } as unknown as ViewStyle) : null) } as unknown as ViewStyle, sizeStyle, context.indicatorStyle, style] as unknown as Array<Animated.WithAnimatedValue<ViewStyle>>
  return <Animated.View style={baseStyle} />
}

export const Progress = memo((props: ProgressProps) => {
  const { tokensOverride, percentage: pctP, strokeWidth, color, trackColor, pivotText, pivotColor, textColor, inactive: inactP, showPivot: showPivotP, animated, transition: transP, animationDuration: durP, style, pivotStyle, indicatorStyle, orientation: oriP, children, ...rest } = props; const tokens = useProgressTokens(tokensOverride); const reducedMotion = useReducedMotion(); const pct = clamp(parsePercentage(pctP ?? tokens.defaults.percentage), 0, 100); const h = parseNumberLike(strokeWidth, tokens.sizing.height) ?? tokens.sizing.height; const inact = inactP ?? tokens.defaults.inactive; const ori: ProgressOrientation = oriP ?? 'horizontal'; const showPivot = ori === 'vertical' ? false : showPivotP ?? tokens.defaults.showPivot; const doAnim = (animated ?? transP ?? tokens.defaults.transition) && !inact; const dur = Math.max(0, durP ?? tokens.defaults.animationDuration); const isGrad = Platform.OS === 'web' && isString(color) && GRADIENT_REGEX.test(color); const trackClr = trackColor ?? tokens.colors.track; const indClr = inact ? tokens.colors.track : !isGrad ? (color ?? tokens.colors.indicator) : undefined; const pivotBg = pivotColor ?? (isGrad ? inact ? tokens.colors.track : tokens.colors.indicator : (indClr as string)); const pivotTxtClr = textColor ?? tokens.colors.pivotText; const pivotCnt = pivotText ?? `${pct}%`; const hasPiv = showPivot && pivotCnt !== null && pivotCnt !== false
  const animVal = useRef(new Animated.Value(pct)).current; useEffect(() => { if (doAnim && dur > 0 && !reducedMotion) { const anim = Animated.timing(animVal, { toValue: pct, duration: dur, useNativeDriver: false, isInteraction: false }); anim.start(); return () => anim.stop() } else animVal.setValue(pct) }, [pct, doAnim, dur, animVal, reducedMotion]); const [lay, setLay] = useState({ track: 0, pivot: 0 }); const onTrackLay = useCallback((e: LayoutChangeEvent) => { const w = e.nativeEvent.layout.width; setLay(prev => prev.track === w ? prev : { ...prev, track: w }) }, []); const onPivotLay = useCallback((e: LayoutChangeEvent) => { const w = e.nativeEvent.layout.width; setLay(prev => prev.pivot === w ? prev : { ...prev, pivot: w }) }, [])
  const trackStyle = [tokens.layout.track, ori === 'vertical' ? ({ width: h, height: '100%', backgroundColor: trackClr, borderRadius: h / 2 } as unknown as ViewStyle) : ({ height: h, backgroundColor: trackClr, borderRadius: h / 2 } as ViewStyle)]; const pivotNode = useMemo(() => { if (!hasPiv) return null; const { track: tw, pivot: pw } = lay; const ctrStyle = [tokens.layout.pivot, { bottom: h + tokens.sizing.pivotPaddingVertical * 2, backgroundColor: pivotBg, paddingHorizontal: tokens.sizing.pivotPaddingHorizontal, paddingVertical: tokens.sizing.pivotPaddingVertical, borderRadius: h, opacity: tw > 0 ? 1 : 0 }]; let transStyle: { transform: { translateX: number }[] } | { transform: { translateX: Animated.AnimatedInterpolation<number> }[] } | null = null; if (tw > 0 && pw > 0) { const p1 = (pw / 2 / tw) * 100; const p2 = ((tw - pw / 2) / tw) * 100; transStyle = p1 < p2 ? { transform: [{ translateX: animVal.interpolate({ inputRange: [0, p1, p2, 100], outputRange: [0, 0, tw - pw, tw - pw], extrapolate: 'clamp' }) }] } : { transform: [{ translateX: (tw - pw) / 2 }] } } else transStyle = { transform: [{ translateX: (tw - pw) / 2 }] }; return <Animated.View style={[ctrStyle, transStyle, { pointerEvents: 'none' }]} onLayout={onPivotLay}>{isText(pivotCnt) ? <Text style={[tokens.layout.pivotText, { color: pivotTxtClr, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.pivotFontSize }, pivotStyle]}>{pivotCnt}</Text> : pivotCnt}</Animated.View> }, [animVal, hasPiv, h, lay, onPivotLay, pivotCnt, pivotStyle, pivotBg, pivotTxtClr, tokens.layout.pivot, tokens.layout.pivotText, tokens.sizing.pivotPaddingHorizontal, tokens.sizing.pivotPaddingVertical, tokens.typography.fontFamily, tokens.typography.pivotFontSize]); const ctxVal = useMemo<ProgressContextValue>(() => ({ animatedValue: animVal, orientation: ori, height: h, indicatorColor: indClr, indicatorStyle: indicatorStyle as ViewStyle | ViewStyle[] | undefined, isGradient: isGrad, gradientColor: isGrad ? color : undefined, layoutIndicator: tokens.layout.indicator }), [animVal, color, h, indicatorStyle, isGrad, ori, indClr, tokens.layout.indicator]); return <ProgressContext.Provider value={ctxVal}><View style={style} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: pct }} {...rest}><View style={trackStyle} onLayout={hasPiv ? onTrackLay : undefined}>{children ?? <ProgressFilledTrack />}</View>{pivotNode}</View></ProgressContext.Provider>
})

Progress.displayName = 'Progress'

export default Progress
