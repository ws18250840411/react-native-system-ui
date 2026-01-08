import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { isText } from '../../utils/validate'
import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { LoadingProps, LoadingTokens } from './types'

const createLoadingTokens = (foundations: Foundations): LoadingTokens => ({
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
})

const useLoadingTokens = createComponentTokensHook('loading', createLoadingTokens)

export const Loading: React.FC<LoadingProps> = props => {
  const tokens = useLoadingTokens(props.tokensOverride)
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

  const spinValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (type === 'spinner') {
      const animation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: nativeDriverEnabled,
        }),
      )
      animation.start()
      return () => animation.stop()
    }
    return undefined
  }, [type])

  const renderSpinner = () => {
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
      <Animated.View
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
        {Array.from({ length: tokens.spinner.itemCount }, (_, index) => {
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
      </Animated.View>
    )
  }

  const indicator =
    type === 'spinner' ? renderSpinner() : <ActivityIndicator size={size} color={color} />

  const hasChildren = children !== undefined && children !== null && children !== false
  const textSpacingStyle = {
    marginLeft: vertical ? 0 : tokens.spacing.gap,
    marginTop: vertical ? tokens.spacing.gap : 0,
  }
  const textNode = hasChildren ? (
    isText(children) ? (
      <Text
        style={[
          textSpacingStyle,
          {
            fontSize: textSize,
            color: textColor,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    ) : (
      <View style={textSpacingStyle}>{children}</View>
    )
  ) : null

  return (
    <View
      style={[
        {
          flexDirection: vertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: vertical ? 'center' : 'flex-start',
        },
        style,
      ]}
      {...rest}
    >
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
})
