import React from 'react'
import { Animated, LayoutChangeEvent, Platform, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { ProgressProps } from './types'

interface ProgressTokens {
  colors: {
    track: string
    indicator: string
    pivotText: string
  }
  sizes: {
    height: number
    pivotFont: number
    pivotPaddingHorizontal: number
    pivotPaddingVertical: number
  }
}

const createProgressTokens = (foundations: ReturnType<typeof useTheme>['foundations']): ProgressTokens => ({
  colors: {
    track: foundations.palette.default[100],
    indicator: foundations.palette.primary[500],
    pivotText: '#ffffff',
  },
  sizes: {
    height: 4,
    pivotFont: foundations.fontSize.xs,
    pivotPaddingHorizontal: foundations.spacing.xs,
    pivotPaddingVertical: 2,
  },
})

const useProgressTokens = (overrides?: DeepPartial<ProgressTokens>): ProgressTokens => {
  const { foundations, components } = useTheme()
  const base = React.useMemo(() => createProgressTokens(foundations), [foundations])
  const componentOverrides = components?.progress as DeepPartial<ProgressTokens> | undefined
  const merged = componentOverrides
    ? overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides
    : overrides
  return merged ? deepMerge(base, merged) : base
}

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
  if (typeof percentage === 'number') {
    return percentage
  }
  if (typeof percentage === 'string') {
    const parsed = Number(percentage)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const useAnimatedWidth = (
  percentage: number,
  trackWidth: number,
  animated: boolean,
  duration: number
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
    [strokeWidth, tokens.sizes.height]
  )
  const resolvedTrackColor = trackColor ?? tokens.colors.track
  const resolvedIndicatorColor = inactive
    ? tokens.colors.track
    : color ?? tokens.colors.indicator
  const resolvedPivotBackground = pivotColor ?? resolvedIndicatorColor
  const resolvedPivotTextColor = textColor ?? tokens.colors.pivotText
  const pivotContent = pivotText ?? `${percentage}%`

  const shouldShowPivot = showPivot && pivotContent !== null && pivotContent !== false
  const useGradient = typeof color === 'string' && color.includes('gradient') && Platform.OS === 'web'

  const indicatorBaseStyle = StyleSheet.flatten([
    {
      position: 'absolute',
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
  ])

  const [trackWidth, setTrackWidth] = React.useState(0)
  const [pivotWidth, setPivotWidth] = React.useState(0)

  const enableAnimation = (typeof animated === 'boolean' ? animated : undefined) ?? transition ?? true
  const animatedWidth = useAnimatedWidth(
    percentage,
    trackWidth,
    enableAnimation && !useGradient,
    animationDuration
  )

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTrackWidth(width)
    animatedWidth.setValue((percentage / 100) * width)
  }

  const pivotBaseStyle = {
    bottom: resolvedStrokeWidth + tokens.sizes.pivotPaddingVertical * 2,
    backgroundColor: resolvedPivotBackground,
    paddingHorizontal: tokens.sizes.pivotPaddingHorizontal,
    paddingVertical: tokens.sizes.pivotPaddingVertical,
    borderRadius: resolvedStrokeWidth,
  }

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
      Math.max(trackWidth - pivotWidth, 0)
    )

    return (
      <Animated.View
        style={[styles.pivot, pivotBaseStyle, { transform: [{ translateX }] }]}
        pointerEvents="none"
        onLayout={event => setPivotWidth(event.nativeEvent.layout.width)}
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
    <View style={style} {...rest}>
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
    color: '#ffffff',
    textAlign: 'center',
  },
})

Progress.displayName = 'Progress'
