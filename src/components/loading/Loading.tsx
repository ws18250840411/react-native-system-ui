import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  Text,
  View,
} from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { isText } from '../../utils/validate'
import type { LoadingProps } from './types'
import { useLoadingTokens } from './tokens'

export const Loading: React.FC<LoadingProps> = props => {
  const {
    tokensOverride,
    color: colorProp,
    size: sizeProp,
    textSize: textSizeProp,
    textColor: textColorProp,
    type: typeProp,
    vertical: verticalProp,
    style,
    textStyle,
    contentStyle,
    children,
    ...rest
  } = props

  const tokens = useLoadingTokens(tokensOverride)
  const color = colorProp ?? tokens.colors.indicator
  const size = sizeProp ?? tokens.defaults.size
  const textSize = textSizeProp ?? tokens.defaults.textSize
  const textColor = textColorProp ?? tokens.colors.text
  const type = typeProp ?? tokens.defaults.type
  const vertical = verticalProp ?? tokens.defaults.vertical

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
      Math.max(0, tokens.sizing.spinner.innerGapRatio * size)
    )
    const scaledLength =
      (size / tokens.defaults.size) * tokens.sizing.spinner.lineLength
    const maxLength = Math.max(2, size / 2 - innerGap)
    const lineLength = Math.max(
      2,
      Math.min(
        maxLength,
        Math.max(tokens.sizing.spinner.lineLength, scaledLength)
      )
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
        {Array.from({ length: tokens.sizing.spinner.itemCount }, (_, index) => {
          const angle = (index * 360) / tokens.sizing.spinner.itemCount
          const opacity =
            0.2 + (index / tokens.sizing.spinner.itemCount) * 0.8
          return (
            <View
              key={index}
              pointerEvents="none"
              style={[
                tokens.layout.spinnerItem,
                {
                  transform: [{ rotate: `${angle}deg` }],
                },
              ]}
            >
              <View
                style={[
                  {
                    width: tokens.sizing.spinner.lineWidth,
                    height: lineLength,
                    borderRadius: tokens.sizing.spinner.lineWidth / 2,
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
          tokens.layout.text,
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
        tokens.layout.container,
        {
          flexDirection: vertical ? 'column' : 'row',
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
