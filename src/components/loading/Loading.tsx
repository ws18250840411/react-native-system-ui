import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { LoadingProps } from './types'

interface LoadingTokens {
  defaults: {
    type: 'circular' | 'spinner'
    size: number
    textSize: number
    vertical: boolean
  }
  colors: {
    indicator: string
    text: string
  }
  spinner: {
    lineWidth: number
    lineLength: number
    itemCount: number
    innerGapRatio: number
  }
  spacing: {
    gap: number
  }
}

const createLoadingTokens = (foundations: Foundations): LoadingTokens => {
  return {
    defaults: {
      type: 'circular',
      size: 30,
      textSize: foundations.fontSize.sm,
      vertical: false,
    },
    colors: {
      indicator: foundations.palette.default[400],
      text: foundations.palette.default[500],
    },
    spinner: {
      lineWidth: 2,
      lineLength: 8,
      itemCount: 12,
      innerGapRatio: 0.25,
    },
    spacing: {
      gap: foundations.spacing.sm,
    },
  }
}

const useLoadingTokens = (overrides?: DeepPartial<LoadingTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createLoadingTokens(foundations)
    const globalOverrides = components?.loading as DeepPartial<LoadingTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

const AnimatedView = Animated.createAnimatedComponent(View)

const spinnerArray = (count: number) => Array.from({ length: count }, (_, index) => index)

export const Loading: React.FC<LoadingProps> = props => {
  const tokens = useLoadingTokens()
  const {
    color = tokens.colors.indicator,
    size = tokens.defaults.size,
    textSize = tokens.defaults.textSize,
    textColor = tokens.colors.text,
    type = tokens.defaults.type,
    vertical = tokens.defaults.vertical,
    style,
    textStyle,
    contentStyle,
    children,
    ...rest
  } = props

  const renderCircular = () => (
    <ActivityIndicator size={size} color={color} />
  )

  const spinValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (type === 'spinner') {
      const animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        }),
      )
      animation.start()
      return () => animation.stop()
    }
    return undefined
  }, [spinValue, type])

  const renderSpinner = () => {
    const lines = spinnerArray(tokens.spinner.itemCount)
    const innerGap = Math.min(
      size / 2 - 1,
      Math.max(0, tokens.spinner.innerGapRatio * size)
    )
    const scaledLength =
      (size / tokens.defaults.size) * tokens.spinner.lineLength
    const maxLength = Math.max(2, size / 2 - innerGap)
    const lineLength = Math.max(
      2,
      Math.min(maxLength, Math.max(tokens.spinner.lineLength, scaledLength))
    )

    return (
      <AnimatedView
        style={{
          width: size,
          height: size,
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        {lines.map(index => {
          const angle = (index * 360) / tokens.spinner.itemCount
          const opacity = 0.2 + (index / tokens.spinner.itemCount) * 0.8
          return (
            <View
              key={index}
              pointerEvents="none"
              style={[
                styles.spinnerItem,
                {
                  transform: [{ rotate: `${angle}deg` }],
                },
              ]}
            >
              <View
                style={[
                  styles.spinnerLine,
                  {
                    width: tokens.spinner.lineWidth,
                    height: lineLength,
                    borderRadius: tokens.spinner.lineWidth / 2,
                    backgroundColor: color,
                    opacity,
                    marginTop: size / 2 - lineLength - innerGap,
                  },
                ]}
              />
            </View>
          )
        })}
      </AnimatedView>
    )
  }

  const indicator = type === 'spinner' ? renderSpinner() : renderCircular()

  const hasChildren = children !== undefined && children !== null && children !== false
  const textSpacingStyle = {
    marginLeft: vertical ? 0 : tokens.spacing.gap,
    marginTop: vertical ? tokens.spacing.gap : 0,
  }
  const textNode = hasChildren ? (
    typeof children === 'string' || typeof children === 'number' ? (
      <Text
        style={[
          textSpacingStyle,
          {
            fontSize: textSize,
            color: textColor,
          },
          textStyle as TextStyle,
        ]}
      >
        {children}
      </Text>
    ) : (
      <View style={textSpacingStyle}>{children}</View>
    )
  ) : null

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: vertical ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: vertical ? 'center' : 'flex-start',
    },
    style,
  ]

  return (
    <View style={containerStyle} {...rest}>
      <View style={contentStyle}>{indicator}</View>
      {textNode}
    </View>
  )
}

Loading.displayName = 'Loading'

const styles = StyleSheet.create({
  spinnerItem: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spinnerLine: {},
})
