import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, type LayoutChangeEvent, Platform, Text, View, type ViewStyle } from 'react-native'
import { clamp, parseNumberLike, parsePercentage, isString, isText } from '../../utils'
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
  const size = useMemo(() => context.animatedValue.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }), [context.animatedValue])
  const sizeStyle = useMemo(() => context.orientation === 'vertical' ? ({ width: context.height, height: size, bottom: 0, left: 0, position: 'absolute' } as unknown as ViewStyle) : ({ height: context.height, width: size } as unknown as ViewStyle), [context.height, context.orientation, size])
  const baseStyle = [context.orientation === 'vertical' ? ({ position: 'absolute', left: 0, bottom: 0 } as unknown as ViewStyle) : context.layoutIndicator, { backgroundColor: context.indicatorColor, borderRadius: context.height / 2, ...(context.isGradient && context.gradientColor ? ({ backgroundImage: context.gradientColor } as unknown as ViewStyle) : null) } as unknown as ViewStyle, sizeStyle, context.indicatorStyle, style] as unknown as Array<Animated.WithAnimatedValue<ViewStyle>>
  return <Animated.View style={baseStyle} />
}

export const Progress = memo((props: ProgressProps) => {
  const { tokensOverride, percentage: percentageProp, strokeWidth, color, trackColor, pivotText, pivotColor, textColor, inactive: inactiveProp, showPivot: showPivotProp, animated, transition: transitionProp, animationDuration: animationDurationProp, style, pivotStyle, indicatorStyle, orientation: orientationProp, children, ...rest } = props
  const tokens = useProgressTokens(tokensOverride)
  const reducedMotion = useReducedMotion()
  const percentageClamped = clamp(parsePercentage(percentageProp ?? tokens.defaults.percentage), 0, 100)
  const height = parseNumberLike(strokeWidth, tokens.sizing.height) ?? tokens.sizing.height
  const inactive = inactiveProp ?? tokens.defaults.inactive
  const orientation: ProgressOrientation = orientationProp ?? 'horizontal'
  const showPivotValue = orientation === 'vertical' ? false : showPivotProp ?? tokens.defaults.showPivot
  const shouldAnimate = (animated ?? transitionProp ?? tokens.defaults.transition) && !inactive
  const duration = Math.max(0, animationDurationProp ?? tokens.defaults.animationDuration)
  const isGradient = Platform.OS === 'web' && isString(color) && GRADIENT_REGEX.test(color)
  const resolvedTrackColor = trackColor ?? tokens.colors.track
  const resolvedIndicatorColor = inactive ? tokens.colors.track : !isGradient ? (color ?? tokens.colors.indicator) : undefined
  const resolvedPivotBackground = pivotColor ?? (isGradient ? inactive ? tokens.colors.track : tokens.colors.indicator : (resolvedIndicatorColor as string))
  const resolvedPivotTextColor = textColor ?? tokens.colors.pivotText
  const pivotContentText = pivotText ?? `${percentageClamped}%`
  const hasPivot = showPivotValue && pivotContentText !== null && pivotContentText !== false
  const animatedValue = useRef(new Animated.Value(percentageClamped)).current
  useEffect(() => { if (shouldAnimate && duration > 0 && !reducedMotion) { const animation = Animated.timing(animatedValue, { toValue: percentageClamped, duration, useNativeDriver: false, isInteraction: false }); animation.start(); return () => animation.stop() } else { animatedValue.setValue(percentageClamped) } }, [percentageClamped, shouldAnimate, duration, animatedValue, reducedMotion])
  const [layout, setLayout] = useState({ track: 0, pivot: 0 })
  const onTrackLayout = useCallback((event: LayoutChangeEvent) => { const width = event.nativeEvent.layout.width; setLayout(prev => (prev.track === width ? prev : { ...prev, track: width })) }, [])
  const onPivotLayout = useCallback((event: LayoutChangeEvent) => { const width = event.nativeEvent.layout.width; setLayout(prev => (prev.pivot === width ? prev : { ...prev, pivot: width })) }, [])
  const trackStyle = [tokens.layout.track, orientation === 'vertical' ? ({ width: height, height: '100%', backgroundColor: resolvedTrackColor, borderRadius: height / 2 } as unknown as ViewStyle) : ({ height: height, backgroundColor: resolvedTrackColor, borderRadius: height / 2 } as ViewStyle)]
  const pivotNode = useMemo(() => {
    if (!hasPivot) return null
    const { track: trackWidth, pivot: pivotWidth } = layout
    const pivotContainerStyle = [tokens.layout.pivot, { bottom: height + tokens.sizing.pivotPaddingVertical * 2, backgroundColor: resolvedPivotBackground, paddingHorizontal: tokens.sizing.pivotPaddingHorizontal, paddingVertical: tokens.sizing.pivotPaddingVertical, borderRadius: height, opacity: trackWidth > 0 ? 1 : 0 }]
    let transformStyle = null
    if (trackWidth > 0 && pivotWidth > 0) {
      const pivotPosition1 = (pivotWidth / 2 / trackWidth) * 100
      const pivotPosition2 = ((trackWidth - pivotWidth / 2) / trackWidth) * 100
      if (pivotPosition1 < pivotPosition2) { transformStyle = { transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, pivotPosition1, pivotPosition2, 100], outputRange: [0, 0, trackWidth - pivotWidth, trackWidth - pivotWidth], extrapolate: 'clamp' }) }] } } else { transformStyle = { transform: [{ translateX: (trackWidth - pivotWidth) / 2 }] } }
    }
    return <Animated.View style={[pivotContainerStyle, transformStyle]} pointerEvents="none" onLayout={onPivotLayout}>{isText(pivotContentText) ? <Text style={[tokens.layout.pivotText, { color: resolvedPivotTextColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.pivotFontSize }, pivotStyle]}>{pivotContentText}</Text> : pivotContentText}</Animated.View>
  }, [animatedValue, hasPivot, height, layout, onPivotLayout, pivotContentText, pivotStyle, resolvedPivotBackground, resolvedPivotTextColor, tokens.layout.pivot, tokens.layout.pivotText, tokens.sizing.pivotPaddingHorizontal, tokens.sizing.pivotPaddingVertical, tokens.typography.fontFamily, tokens.typography.pivotFontSize])
  const progressContextValue = useMemo<ProgressContextValue>(() => ({ animatedValue: animatedValue, orientation: orientation, height: height, indicatorColor: resolvedIndicatorColor, indicatorStyle: indicatorStyle as ViewStyle | ViewStyle[] | undefined, isGradient: isGradient, gradientColor: isGradient ? color : undefined, layoutIndicator: tokens.layout.indicator }), [animatedValue, color, height, indicatorStyle, isGradient, orientation, resolvedIndicatorColor, tokens.layout.indicator])
  return <ProgressContext.Provider value={progressContextValue}><View style={style} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: percentageClamped }} {...rest}><View style={trackStyle} onLayout={hasPivot ? onTrackLayout : undefined}>{children ?? <ProgressFilledTrack />}</View>{pivotNode}</View></ProgressContext.Provider>
})

Progress.displayName = 'Progress'

export default Progress
