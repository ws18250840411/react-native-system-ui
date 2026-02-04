import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  type LayoutChangeEvent,
  Platform,
  Text,
  View,
  type ViewStyle,
} from 'react-native'

import { clamp, parseNumberLike, parsePercentage, isString, isText } from '../../utils'
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

  const indicatorSize = useMemo(() => context.animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  }), [context.animatedValue])

  const sizeStyle = useMemo(
    () =>
      context.orientation === 'vertical'
        ? ({
            width: context.height,
            height: indicatorSize,
            bottom: 0,
            left: 0,
            position: 'absolute',
          } as unknown as ViewStyle)
        : ({
            height: context.height,
            width: indicatorSize,
          } as unknown as ViewStyle),
    [context.height, context.orientation, indicatorSize],
  )

  const baseStyle = [
    context.orientation === 'vertical'
      ? ({ position: 'absolute', left: 0, bottom: 0 } as unknown as ViewStyle)
      : context.layoutIndicator,
    {
      backgroundColor: context.indicatorColor,
      borderRadius: context.height / 2,
      ...(context.isGradient && context.gradientColor
        ? ({ backgroundImage: context.gradientColor } as unknown as ViewStyle)
        : null),
    } as unknown as ViewStyle,
    sizeStyle,
    context.indicatorStyle,
    style,
  ] as unknown as Array<Animated.WithAnimatedValue<ViewStyle>>

  return (
    <Animated.View
      style={baseStyle}
    />
  )
}

export const Progress = memo((props: ProgressProps) => {
  const {
    tokensOverride,
    percentage: percentageProp,
    strokeWidth,
    color,
    trackColor,
    pivotText,
    pivotColor,
    textColor,
    inactive: inactiveProp,
    showPivot: showPivotProp,
    animated,
    transition: transitionProp,
    animationDuration: animationDurationProp,
    style,
    pivotStyle,
    indicatorStyle,
    orientation: orientationProp,
    children,
    ...rest
  } = props

  const tokens = useProgressTokens(tokensOverride)

  const percentage = useMemo(
    () => clamp(parsePercentage(percentageProp ?? tokens.defaults.percentage), 0, 100),
    [percentageProp, tokens.defaults.percentage]
  )
  const height = useMemo(
    () => parseNumberLike(strokeWidth, tokens.sizing.height) ?? tokens.sizing.height,
    [strokeWidth, tokens.sizing.height]
  )
  const inactive = useMemo(
    () => inactiveProp ?? tokens.defaults.inactive,
    [inactiveProp, tokens.defaults.inactive]
  )
  const orientation: ProgressOrientation = orientationProp ?? 'horizontal'
  const showPivot = useMemo(
    () => (orientation === 'vertical' ? false : (showPivotProp ?? tokens.defaults.showPivot)),
    [orientation, showPivotProp, tokens.defaults.showPivot]
  )
  const shouldAnimate = useMemo(
    () => (animated ?? transitionProp ?? tokens.defaults.transition) && !inactive,
    [animated, inactive, tokens.defaults.transition, transitionProp]
  )
  const duration = useMemo(
    () => Math.max(0, animationDurationProp ?? tokens.defaults.animationDuration),
    [animationDurationProp, tokens.defaults.animationDuration]
  )

  const isGradient = Platform.OS === 'web' && isString(color) && GRADIENT_REGEX.test(color)

  const resolvedTrackColor = useMemo(
    () => trackColor ?? tokens.colors.track,
    [tokens.colors.track, trackColor]
  )
  const resolvedIndicatorColor = useMemo(
    () => (inactive
      ? tokens.colors.track
      : !isGradient
        ? (color ?? tokens.colors.indicator)
        : undefined),
    [color, inactive, isGradient, tokens.colors.indicator, tokens.colors.track]
  )

  const resolvedPivotBg = useMemo(
    () =>
      pivotColor ??
      (isGradient
        ? inactive
          ? tokens.colors.track
          : tokens.colors.indicator
        : (resolvedIndicatorColor as string)),
    [inactive, isGradient, pivotColor, resolvedIndicatorColor, tokens.colors.indicator, tokens.colors.track]
  )
  const resolvedPivotTextColor = useMemo(
    () => textColor ?? tokens.colors.pivotText,
    [textColor, tokens.colors.pivotText]
  )

  const pivotContent = useMemo(
    () => pivotText ?? `${percentage}%`,
    [percentage, pivotText]
  )
  const hasPivot = useMemo(
    () => showPivot && pivotContent !== null && pivotContent !== false,
    [pivotContent, showPivot]
  )

  const animatedValue = useRef(new Animated.Value(percentage)).current

  useEffect(() => {
    if (shouldAnimate && duration > 0) {
      const animation = Animated.timing(animatedValue, {
        toValue: percentage,
        duration,
        useNativeDriver: false,
      })
      animation.start()
      return () => animation.stop()
    } else {
      animatedValue.setValue(percentage)
    }
  }, [percentage, shouldAnimate, duration, animatedValue])

  const [layout, setLayout] = useState({ track: 0, pivot: 0 })

  const onTrackLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width
      setLayout(prev => (prev.track === width ? prev : { ...prev, track: width }))
    },
    []
  )

  const onPivotLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width
      setLayout(prev => (prev.pivot === width ? prev : { ...prev, pivot: width }))
    },
    []
  )

  const trackStyle = useMemo(() => ([
    tokens.layout.track,
    orientation === 'vertical'
      ? ({
          width: height,
          height: '100%',
          backgroundColor: resolvedTrackColor,
          borderRadius: height / 2,
        } as unknown as ViewStyle)
      : ({
          height,
          backgroundColor: resolvedTrackColor,
          borderRadius: height / 2,
        } as ViewStyle),
  ]), [height, orientation, resolvedTrackColor, tokens.layout.track])

  const pivotNode = useMemo(() => {
    if (!hasPivot) return null
    const { track: trackW, pivot: pivotW } = layout
    const pivotContainerStyle = [
      tokens.layout.pivot,
      {
        bottom: height + tokens.sizing.pivotPaddingVertical * 2,
        backgroundColor: resolvedPivotBg,
        paddingHorizontal: tokens.sizing.pivotPaddingHorizontal,
        paddingVertical: tokens.sizing.pivotPaddingVertical,
        borderRadius: height,
        opacity: trackW > 0 ? 1 : 0,
      },
    ]

    let transformStyle = null
    if (trackW > 0 && pivotW > 0) {
      const p1 = (pivotW / 2 / trackW) * 100
      const p2 = ((trackW - pivotW / 2) / trackW) * 100

      if (p1 < p2) {
        transformStyle = {
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, p1, p2, 100],
                outputRange: [0, 0, trackW - pivotW, trackW - pivotW],
                extrapolate: 'clamp',
              }),
            },
          ],
        }
      } else {
        transformStyle = {
          transform: [{ translateX: (trackW - pivotW) / 2 }],
        }
      }
    }

    return (
      <Animated.View
        style={[pivotContainerStyle, transformStyle]}
        pointerEvents="none"
        onLayout={onPivotLayout}
      >
        {isText(pivotContent) ? (
          <Text
            style={[
              tokens.layout.pivotText,
              {
                color: resolvedPivotTextColor,
                fontSize: tokens.typography.pivotFontSize,
              },
              pivotStyle,
            ]}
          >
            {pivotContent}
          </Text>
        ) : (
          pivotContent
        )}
      </Animated.View>
    )
  }, [
    animatedValue,
    hasPivot,
    height,
    layout,
    onPivotLayout,
    pivotContent,
    pivotStyle,
    resolvedPivotBg,
    resolvedPivotTextColor,
    tokens.layout.pivot,
    tokens.layout.pivotText,
    tokens.sizing.pivotPaddingHorizontal,
    tokens.sizing.pivotPaddingVertical,
    tokens.typography.pivotFontSize,
  ])

  const progressContextValue = useMemo<ProgressContextValue>(() => ({
    animatedValue,
    orientation,
    height,
    indicatorColor: resolvedIndicatorColor,
    indicatorStyle: indicatorStyle as ViewStyle | ViewStyle[] | undefined,
    isGradient,
    gradientColor: isGradient ? color : undefined,
    layoutIndicator: tokens.layout.indicator,
  }), [
    animatedValue,
    color,
    height,
    indicatorStyle,
    isGradient,
    orientation,
    resolvedIndicatorColor,
    tokens.layout.indicator,
  ])

  return (
    <ProgressContext.Provider value={progressContextValue}>
      <View
        style={style}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: percentage }}
        {...rest}
      >
        <View
          style={trackStyle}
          onLayout={hasPivot ? onTrackLayout : undefined}
        >
          {children ?? <ProgressFilledTrack />}
        </View>
        {pivotNode}
      </View>
    </ProgressContext.Provider>
  )
})

Progress.displayName = 'Progress'

export default Progress
