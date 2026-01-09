import React from 'react'
import { Animated, LayoutChangeEvent, Platform, Text, View, type ViewStyle } from 'react-native'

import { isString, isText } from '../../utils/validate'
import { clamp, parseNumberLike, parsePercentage } from '../../utils/number'
import { useProgressTokens } from './tokens'
import type { ProgressProps } from './types'

const isGradientColor = (color?: string) => {
  if (!isString(color)) return false
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

  const percentage = clamp(
    parsePercentage(percentageProp ?? tokens.defaults.percentage),
    0,
    100
  )
  const resolvedStrokeWidth =
    parseNumberLike(strokeWidth, tokens.sizing.height) ?? tokens.sizing.height
  const inactive = inactiveProp ?? tokens.defaults.inactive
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
  const safeDuration = Math.max(
    0,
    animationDurationProp ?? tokens.defaults.animationDuration
  )

  const showPivot = showPivotProp ?? tokens.defaults.showPivot
  const shouldShowPivot =
    showPivot && pivotContent !== null && pivotContent !== false

  const transition = transitionProp ?? tokens.defaults.transition
  const shouldAnimateWidth =
    (animated ?? transition ?? tokens.defaults.transition) && !useGradient

  const indicatorBaseStyle: ViewStyle = {
    ...tokens.layout.indicator,
    height: resolvedStrokeWidth,
    backgroundColor: useGradient ? undefined : resolvedIndicatorColor,
    borderRadius: resolvedStrokeWidth / 2,
  }
  const gradientStyle = useGradient ? ({ backgroundImage: color as any } as any) : null

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
    setTrackWidth(prev => (prev === width ? prev : width))
  }

  const pivotBaseStyle = React.useMemo(
    () => ({
      bottom: resolvedStrokeWidth + tokens.sizing.pivotPaddingVertical * 2,
      backgroundColor: resolvedPivotBackground,
      paddingHorizontal: tokens.sizing.pivotPaddingHorizontal,
      paddingVertical: tokens.sizing.pivotPaddingVertical,
      borderRadius: resolvedStrokeWidth,
    }),
    [
      resolvedPivotBackground,
      resolvedStrokeWidth,
      tokens.sizing.pivotPaddingHorizontal,
      tokens.sizing.pivotPaddingVertical,
    ],
  )

  const renderPivotContent = () =>
    isText(pivotContent) ? (
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
    )

  const renderPivot = () => {
    if (!shouldShowPivot) return null

    if (!trackWidth) {
      return (
        <View
          style={[tokens.layout.pivot, pivotBaseStyle, { right: 0 }]}
          pointerEvents="none"
        >
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
        style={[
          tokens.layout.pivot,
          pivotBaseStyle,
          { transform: [{ translateX }] },
        ]}
        pointerEvents="none"
        onLayout={event => {
          const nextWidth = event.nativeEvent.layout.width
          setPivotWidth(prev => (prev === nextWidth ? prev : nextWidth))
        }}
      >
        {renderPivotContent()}
      </Animated.View>
    )
  }

  const renderIndicator = () => {
    if (trackWidth > 0 && !useGradient) {
      return <Animated.View style={[indicatorBaseStyle, gradientStyle, indicatorStyle, { width: animatedWidth }]} />
    }
    return <View style={[indicatorBaseStyle, gradientStyle, indicatorStyle, { width: `${percentage}%` }]} />
  }

  return (
    <View
      style={style}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percentage }}
      {...rest}
    >
      <View
        style={[
          tokens.layout.track,
          {
            height: resolvedStrokeWidth,
            backgroundColor: resolvedTrackColor,
            borderRadius: resolvedStrokeWidth / 2,
          },
        ]}
        onLayout={handleTrackLayout}
      >
        {renderIndicator()}
      </View>
      {renderPivot()}
    </View>
  )
}

Progress.displayName = 'Progress'

export default Progress
