import React from 'react'
import { Animated, LayoutChangeEvent, Platform, StyleSheet, Text, View, type ViewStyle } from 'react-native'

import { useProgressTokens } from './tokens'
import type { ProgressProps } from './types'

const clampPercentage = (value: number) => {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return value
}

const parseStrokeWidth = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const parsePercentage = (percentage?: number | string) => {
  if (typeof percentage === 'number') return percentage
  if (typeof percentage === 'string') {
    const normalized = percentage.trim().replace('%', '')
    const parsed = Number(normalized)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const isGradientColor = (color?: string) => {
  if (typeof color !== 'string') return false
  const lower = color.toLowerCase()
  return ['linear-gradient', 'radial-gradient', 'conic-gradient'].some(key => lower.includes(key))
}

const useAnimatedWidth = (
  percentage: number,
  trackWidth: number,
  animated: boolean,
  duration: number,
) => {
  const value = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (!trackWidth) return
    const target = (percentage / 100) * trackWidth
    if (!animated || duration <= 0) {
      value.setValue(target)
      return
    }
    const animation = Animated.timing(value, {
      toValue: target,
      duration,
      useNativeDriver: false,
    })
    animation.start()
    return () => animation.stop()
  }, [percentage, trackWidth, animated, duration, value])

  return value
}

export const Progress: React.FC<ProgressProps> = props => {
  const tokens = useProgressTokens()
  const {
    percentage: percentageProp = 0,
    strokeWidth,
    color,
    trackColor,
    pivotText,
    pivotColor,
    textColor,
    inactive = false,
    showPivot = true,
    animated,
    transition = true,
    animationDuration = 300,
    style,
    pivotStyle,
    indicatorStyle,
    ...rest
  } = props

  const percentage = clampPercentage(parsePercentage(percentageProp))
  const resolvedStrokeWidth = React.useMemo(
    () => parseStrokeWidth(strokeWidth, tokens.sizes.height),
    [strokeWidth, tokens.sizes.height],
  )
  const isGradient = isGradientColor(color)
  const useGradient = isGradient && Platform.OS === 'web'

  const resolvedTrackColor = trackColor ?? tokens.colors.track
  const resolvedIndicatorColor = inactive
    ? tokens.colors.track
    : !useGradient && isGradient
      ? tokens.colors.indicator
      : color ?? tokens.colors.indicator
  const resolvedPivotBackground = pivotColor ?? resolvedIndicatorColor
  const resolvedPivotTextColor = textColor ?? tokens.colors.pivotText
  const pivotContent = pivotText ?? `${percentage}%`
  const safeDuration = Math.max(0, animationDuration)

  const shouldShowPivot = showPivot && pivotContent !== null && pivotContent !== false

  const shouldAnimateWidth =
    ((typeof animated === 'boolean' ? animated : undefined) ?? transition ?? true) && !useGradient

  const indicatorBaseStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          position: 'absolute' as const,
          left: 0,
          top: 0,
          height: resolvedStrokeWidth,
          backgroundColor: useGradient ? undefined : resolvedIndicatorColor,
          borderRadius: resolvedStrokeWidth / 2,
        },
        useGradient
          ? {
              backgroundImage: color as any,
            }
          : null,
        indicatorStyle,
      ]) as ViewStyle,
    [color, indicatorStyle, resolvedIndicatorColor, resolvedStrokeWidth, useGradient],
  )

  const [trackWidth, setTrackWidth] = React.useState(0)
  const [pivotWidth, setPivotWidth] = React.useState(0)

  const animatedWidth = useAnimatedWidth(
    percentage,
    trackWidth,
    shouldAnimateWidth,
    safeDuration,
  )

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width === trackWidth) return
    setTrackWidth(width)
    if (!shouldAnimateWidth) {
      animatedWidth.setValue((percentage / 100) * width)
    }
  }

  const pivotBaseStyle = React.useMemo(
    () => ({
      bottom: resolvedStrokeWidth + tokens.sizes.pivotPaddingVertical * 2,
      backgroundColor: resolvedPivotBackground,
      paddingHorizontal: tokens.sizes.pivotPaddingHorizontal,
      paddingVertical: tokens.sizes.pivotPaddingVertical,
      borderRadius: resolvedStrokeWidth,
    }),
    [
      resolvedPivotBackground,
      resolvedStrokeWidth,
      tokens.sizes.pivotPaddingHorizontal,
      tokens.sizes.pivotPaddingVertical,
    ],
  )

  const renderPivotContent = () =>
    typeof pivotContent === 'string' || typeof pivotContent === 'number' ? (
      <Text
        style={[
          styles.pivotText,
          {
            color: resolvedPivotTextColor,
            fontSize: tokens.sizes.pivotFont,
          },
          pivotStyle,
        ]}
      >
        {pivotContent}
      </Text>
    ) : (
      pivotContent
    )

  const renderPivot = () => {
    if (!shouldShowPivot) return null

    if (!trackWidth) {
      return (
        <View style={[styles.pivot, pivotBaseStyle, { right: 0 }]} pointerEvents="none">
          {renderPivotContent()}
        </View>
      )
    }

    const translateX = Animated.diffClamp(
      Animated.add(animatedWidth, -pivotWidth / 2),
      0,
      Math.max(trackWidth - pivotWidth, 0),
    )

    return (
      <Animated.View
        style={[styles.pivot, pivotBaseStyle, { transform: [{ translateX }] }]}
        pointerEvents="none"
        onLayout={event => {
          const nextWidth = event.nativeEvent.layout.width
          if (nextWidth !== pivotWidth) setPivotWidth(nextWidth)
        }}
      >
        {renderPivotContent()}
      </Animated.View>
    )
  }

  const renderIndicator = () => {
    if (trackWidth > 0 && !useGradient) {
      return <Animated.View style={[indicatorBaseStyle, { width: animatedWidth }]} />
    }
    return <View style={[indicatorBaseStyle, { width: `${percentage}%` }]} />
  }

  return (
    <View
      style={style}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percentage }}
      {...rest}
    >
      <View
        style={{
          height: resolvedStrokeWidth,
          backgroundColor: resolvedTrackColor,
          borderRadius: resolvedStrokeWidth / 2,
          overflow: 'hidden',
        }}
        onLayout={handleTrackLayout}
      >
        {renderIndicator()}
      </View>
      {renderPivot()}
    </View>
  )
}

const styles = StyleSheet.create({
  pivot: {
    position: 'absolute',
  },
  pivotText: {
    textAlign: 'center',
  },
})

Progress.displayName = 'Progress'

export default Progress
