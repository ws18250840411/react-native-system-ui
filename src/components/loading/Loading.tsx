import React from 'react'
import {
  Animated,
  Easing,
  Text,
  View,
} from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { withAlpha } from '../../utils/color'
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
    if (type === 'spinner' || type === 'circular' || type === 'ball') {
      spinValue.setValue(0)
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

  const rotateValue = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const renderCircular = () => {
    const thickness = Math.max(2, Math.min(size / 8, 6))
    const trackColor = withAlpha(color, 0.2)
    return (
      <Animated.View
        testID="rv-loading-circular"
        style={{
          width: size,
          height: size,
          transform: [{ rotate: rotateValue }],
        }}
      >
        <View
          pointerEvents="none"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: thickness,
            borderColor: trackColor,
            borderTopColor: color,
          }}
        />
      </Animated.View>
    )
  }

  const renderSpinner = () => {
    const innerGap = Math.min(
      size / 2 - 1,
      Math.max(0, tokens.sizing.spinner.innerGapRatio * size)
    )
    const lineWidth = Math.max(1, Math.min(size / 3, (size / tokens.defaults.size) * tokens.sizing.spinner.lineWidth))
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
        testID="rv-loading-spinner"
        style={{
          width: size,
          height: size,
          transform: [
            {
              rotate: rotateValue,
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
                    width: lineWidth,
                    height: lineLength,
                    borderRadius: lineWidth / 2,
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

  const renderBall = () => {
    const itemCount = tokens.sizing.ball.itemCount
    const dotSize = Math.max(
      2,
      Math.round(size * tokens.sizing.ball.dotSizeRatio)
    )
    const gap = Math.max(1, Math.round(size * tokens.sizing.ball.gapRatio))
    const totalWidth = dotSize * itemCount + gap * (itemCount - 1)
    const pulseWidth = 0.4 / itemCount

    return (
      <View
        testID="rv-loading-ball"
        style={{
          width: totalWidth,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Array.from({ length: itemCount }, (_, index) => {
            const center = (index + 0.5) / itemCount
            const left = Math.max(0, center - pulseWidth)
            const right = Math.min(1, center + pulseWidth)

            const scale = spinValue.interpolate({
              inputRange: [0, left, center, right, 1],
              outputRange: [
                tokens.sizing.ball.dotScaleMin,
                tokens.sizing.ball.dotScaleMin,
                1,
                tokens.sizing.ball.dotScaleMin,
                tokens.sizing.ball.dotScaleMin,
              ],
            })

            const opacity = spinValue.interpolate({
              inputRange: [0, left, center, right, 1],
              outputRange: [0.4, 0.4, 1, 0.4, 0.4],
            })

            return (
              <Animated.View
                key={index}
                pointerEvents="none"
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: color,
                  marginRight: index === itemCount - 1 ? 0 : gap,
                  opacity,
                  transform: [{ scale }],
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }

  const indicator =
    type === 'spinner' ? renderSpinner() : type === 'ball' ? renderBall() : renderCircular()

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
