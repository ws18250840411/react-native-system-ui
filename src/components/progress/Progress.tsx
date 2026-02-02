import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const showPivot = useMemo(
    () => showPivotProp ?? tokens.defaults.showPivot,
    [showPivotProp, tokens.defaults.showPivot]
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
    {
      height,
      backgroundColor: resolvedTrackColor,
      borderRadius: height / 2,
    },
  ]), [height, resolvedTrackColor, tokens.layout.track])

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

  const indicatorWidth = useMemo(() => animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  }), [animatedValue])

  const indicatorBaseStyle = useMemo(() => ([
    tokens.layout.indicator,
    {
      height,
      backgroundColor: resolvedIndicatorColor,
      borderRadius: height / 2,
      ...(isGradient && ({ backgroundImage: color } as unknown as ViewStyle)),
    },
    indicatorStyle,
    { width: indicatorWidth },
  ]), [color, height, indicatorStyle, indicatorWidth, isGradient, resolvedIndicatorColor, tokens.layout.indicator])

  return (
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
        <Animated.View
          style={indicatorBaseStyle}
        />
      </View>
      {pivotNode}
    </View>
  )
})

Progress.displayName = 'Progress'

export default Progress
