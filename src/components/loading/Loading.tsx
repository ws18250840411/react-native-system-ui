import React from 'react'
import { ActivityIndicator, Animated, Easing, Text, View } from 'react-native'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { LoadingProps } from './types'
import { useLoadingTokens } from './useLoadingTokens'

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
          useNativeDriver: true,
        }),
      )
      animation.start()
      return () => animation.stop()
    }
    return undefined
  }, [spinValue, type])

  const renderSpinner = () => {
    const lines = spinnerArray(tokens.spinner.itemCount)
    const lineStyleBase: ViewStyle = {
      position: 'absolute',
      width: tokens.spinner.lineWidth,
      height: tokens.spinner.lineLength,
      borderRadius: tokens.spinner.lineWidth / 2,
      backgroundColor: color,
      top: size / 2 - tokens.spinner.lineLength,
      left: size / 2 - tokens.spinner.lineWidth / 2,
      opacity: 0.2,
    }

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
              style={[
                lineStyleBase,
                {
                  transform: [
                    { translateY: -size / 2 + tokens.spinner.lineLength },
                    { rotate: `${angle}deg` },
                    { translateY: size / 2 - tokens.spinner.lineLength },
                  ],
                  opacity,
                },
              ]}
            />
          )
        })}
      </AnimatedView>
    )
  }

  const indicator = type === 'spinner' ? renderSpinner() : renderCircular()

  const textNode = children ? (
    <Text
      style={[
        {
          marginLeft: vertical ? 0 : tokens.spacing.gap,
          marginTop: vertical ? tokens.spacing.gap : 0,
          fontSize: textSize,
          color: textColor,
        },
        textStyle as TextStyle,
      ]}
    >
      {children}
    </Text>
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
