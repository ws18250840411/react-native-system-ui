import React from 'react'
import { Animated, Platform, Text, View, type ViewStyle } from 'react-native'
import Svg, { Circle as SvgCircle } from 'react-native-svg'
import { isText, clamp, parseNumber, parsePercentage } from '../../utils'
import { useCircleTokens } from './tokens'
import type { CircleProps, CircleStartPosition } from './types'

const resolveSvgRotation = (position: CircleStartPosition) => {
  switch (position) {
    case 'right':
      return 0
    case 'bottom':
      return 90
    case 'left':
      return 180
    case 'top':
    default:
      return -90
  }
}

// CSS conic-gradient 默认起点是 12 点方向（north）
const resolveWebRotation = (position: CircleStartPosition) => {
  switch (position) {
    case 'top':
      return 0
    case 'right':
      return 90
    case 'bottom':
      return 180
    case 'left':
    default:
      return 270
  }
}

const isTransparentColor = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return true
  if (normalized === 'transparent') return true
  const rgbaMatch = normalized.match(/^rgba\(([^)]*)\)$/)
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(',').map(part => part.trim())
    const alpha = Number(parts[3])
    return Number.isFinite(alpha) && alpha === 0
  }
  return false
}

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle)

export const Circle: React.FC<CircleProps> = props => {
  const {
    tokensOverride,
    rate: rateProp,
    size,
    strokeWidth,
    color,
    layerColor,
    fill: fillProp,
    clockwise: clockwiseProp,
    startPosition: startPositionProp,
    lineCap: lineCapProp,
    animated: animatedProp,
    animationDuration,
    style,
    textStyle,
    children,
  } = props
  const tokens = useCircleTokens(tokensOverride)
  const rateValue = rateProp ?? tokens.defaults.rate
  const fill = fillProp ?? tokens.defaults.fill
  const clockwise = clockwiseProp ?? tokens.defaults.clockwise
  const startPosition = startPositionProp ?? tokens.defaults.startPosition
  const lineCap = lineCapProp ?? tokens.defaults.lineCap
  const animated = animatedProp ?? tokens.defaults.animated

  const resolvedSize = Math.max(0, parseNumber(size, tokens.defaults.size))
  const resolvedStrokeWidth = Math.max(0, parseNumber(strokeWidth, tokens.defaults.strokeWidth))
  const rate = clamp(parsePercentage(rateValue), 0, 100)

  const resolvedColor = color ?? tokens.colors.color
  const resolvedLayerColor = layerColor ?? tokens.colors.layerColor

  const content = React.useMemo(() => {
    if (children == null || children === false) return null
    const childArray = React.Children.toArray(children)
    if (childArray.every(isText)) {
      return (
        <Text
          style={[
            tokens.layout.text,
            {
              color: tokens.colors.text,
              fontSize: tokens.typography.fontSize,
              lineHeight: tokens.typography.lineHeight,
            },
            textStyle,
          ]}
        >
          {childArray.map(String).join('')}
        </Text>
      )
    }
    return children
  }, [children, textStyle, tokens.colors.text, tokens.layout.text, tokens.typography.fontSize, tokens.typography.lineHeight])

  if (Platform.OS === 'web') {
    const safeStroke = Math.min(resolvedStrokeWidth, resolvedSize / 2)
    const innerSize = Math.max(0, resolvedSize - safeStroke * 2)
    const progressAngle = (rate / 100) * 360
    const rotation = resolveWebRotation(startPosition)
    const shouldRenderInner = innerSize > 0 && !isTransparentColor(fill)

    const gradient = clockwise
      ? `conic-gradient(from ${rotation}deg, ${resolvedColor} 0deg ${progressAngle}deg, ${resolvedLayerColor} ${progressAngle}deg 360deg)`
      : `conic-gradient(from ${rotation}deg, ${resolvedLayerColor} 0deg ${360 - progressAngle}deg, ${resolvedColor} ${360 - progressAngle}deg 360deg)`

    const webMask =
      safeStroke > 0
        ? `radial-gradient(farthest-side, transparent calc(100% - ${safeStroke}px), #000 calc(100% - ${safeStroke}px))`
        : undefined
    const webMaskStyle: Record<string, string> | undefined = webMask
      ? {
        WebkitMaskImage: webMask,
        maskImage: webMask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
      }
      : undefined

    const webRingStyle = {
      width: resolvedSize,
      height: resolvedSize,
      borderRadius: resolvedSize / 2,
      backgroundImage: gradient,
      ...(webMaskStyle ?? {}),
    } as unknown as ViewStyle

    return (
      <View
        style={[
          tokens.layout.root,
          {
            width: resolvedSize,
            height: resolvedSize,
          },
          style,
        ]}
      >
        <View
          style={[
            tokens.layout.webRing,
            webRingStyle,
          ]}
        />
        {shouldRenderInner ? (
          <View
            style={[
              tokens.layout.webInner,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
                backgroundColor: fill,
                left: safeStroke,
                top: safeStroke,
              },
            ]}
          />
        ) : null}
        <View pointerEvents="box-none" style={[tokens.layout.content, { width: resolvedSize, height: resolvedSize }]}>
          {content}
        </View>
      </View>
    )
  }

  const radius = Math.max(0, (resolvedSize - resolvedStrokeWidth) / 2)
  const circumference = 2 * Math.PI * radius
  const rotation = resolveSvgRotation(startPosition)
  const safeDuration = Math.max(0, animationDuration ?? tokens.defaults.animationDuration)
  const dashOffsetTarget = (clockwise ? 1 : -1) * circumference * (1 - rate / 100)

  const dashOffset = React.useRef(new Animated.Value(dashOffsetTarget)).current

  React.useEffect(() => {
    if (!animated || safeDuration <= 0) {
      dashOffset.setValue(dashOffsetTarget)
      return
    }
    const animation = Animated.timing(dashOffset, {
      toValue: dashOffsetTarget,
      duration: safeDuration,
      useNativeDriver: false,
    })
    animation.start()
    return () => animation.stop()
  }, [animated, dashOffset, dashOffsetTarget, safeDuration])

  return (
    <View style={[tokens.layout.root, { width: resolvedSize, height: resolvedSize }, style]}>
      <Svg width={resolvedSize} height={resolvedSize}>
        <SvgCircle
          cx={resolvedSize / 2}
          cy={resolvedSize / 2}
          r={radius}
          stroke={resolvedLayerColor}
          strokeWidth={resolvedStrokeWidth}
          fill={fill}
        />
        <AnimatedSvgCircle
          cx={resolvedSize / 2}
          cy={resolvedSize / 2}
          r={radius}
          stroke={resolvedColor}
          strokeWidth={resolvedStrokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap={lineCap}
          rotation={rotation}
          originX={resolvedSize / 2}
          originY={resolvedSize / 2}
        />
      </Svg>
      <View pointerEvents="box-none" style={[tokens.layout.content, { width: resolvedSize, height: resolvedSize }]}>
        {content}
      </View>
    </View>
  )
}

Circle.displayName = 'Circle'

export type { CircleLineCap, CircleProps, CircleStartPosition, CircleTokens } from './types'

export default Circle
