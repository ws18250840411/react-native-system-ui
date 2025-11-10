import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import type { ProgressProps } from './types'
import { useProgressTokens } from './useProgressTokens'

const clampPercentage = (value: number) => {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return value
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
    style,
    pivotStyle,
    indicatorStyle,
    ...rest
  } = props

  const rawValue = parsePercentage(percentageProp)
  const percentage = clampPercentage(rawValue)

  const resolvedStrokeWidth = strokeWidth ?? tokens.sizes.height

  const resolvedTrackColor = trackColor ?? tokens.colors.track
  const resolvedIndicatorColor = inactive
    ? tokens.colors.track
    : color ?? tokens.colors.indicator

  const resolvedPivotBackground = pivotColor ?? resolvedIndicatorColor
  const resolvedPivotTextColor = textColor ?? tokens.colors.pivotText

  const pivotContent = pivotText ?? `${percentage}%`

  const shouldShowPivot = showPivot && pivotContent !== null && pivotContent !== false

  const useGradient = typeof color === 'string' && color.includes('gradient') && Platform.OS === 'web'

  const indicatorStyles = StyleSheet.flatten([
    {
      height: resolvedStrokeWidth,
      width: `${percentage}%`,
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

  const pivotNode = shouldShowPivot ? (
    <View
      style={[
        styles.pivot,
        {
          bottom: resolvedStrokeWidth + tokens.sizes.pivotPaddingVertical * 2,
          backgroundColor: resolvedPivotBackground,
          paddingHorizontal: tokens.sizes.pivotPaddingHorizontal,
          paddingVertical: tokens.sizes.pivotPaddingVertical,
          borderRadius: resolvedStrokeWidth,
        },
      ]}
    >
      {typeof pivotContent === 'string' || typeof pivotContent === 'number' ? (
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
      )}
    </View>
  ) : null

  return (
    <View style={style} {...rest}>
      <View
        style={{
          height: resolvedStrokeWidth,
          backgroundColor: resolvedTrackColor,
          borderRadius: resolvedStrokeWidth / 2,
          overflow: 'hidden',
        }}
      >
        <View style={indicatorStyles}>{pivotNode}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pivot: {
    position: 'absolute',
    right: 0,
  },
  pivotText: {
    color: '#ffffff',
    textAlign: 'center',
  },
})

Progress.displayName = 'Progress'
