import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Platform, Text, View, type ViewStyle } from 'react-native'
import Svg, { Circle as SvgCircle } from 'react-native-svg'
import { isText, clamp, parseNumber, parsePercentage } from '../../utils'
import { useCircleTokens } from './tokens'
import type { CircleProps, CircleStartPosition } from './types'

const SVG_ROTATION: Record<CircleStartPosition, number> = { top: -90, right: 0, bottom: 90, left: 180 }
const WEB_ROTATION: Record<CircleStartPosition, number> = { top: 0, right: 90, bottom: 180, left: 270 }

const isTransparentColor = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (!normalized || normalized === 'transparent') return true
  const rgbaMatch = normalized.match(/^rgba\(([^)]*)\)$/)
  if (rgbaMatch) { const alpha = Number(rgbaMatch[1].split(',')[3]?.trim()); return Number.isFinite(alpha) && alpha === 0 }
  return false
}

type WebRingStyle = ViewStyle & { backgroundImage?: string; WebkitMaskImage?: string; maskImage?: string; WebkitMaskRepeat?: string; maskRepeat?: string; WebkitMaskSize?: string; maskSize?: string }

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle)

const CircleImpl: React.FC<CircleProps> = props => {
  const { tokensOverride, rate: rateProp, size, strokeWidth, color, layerColor, fill: fillProp, clockwise: clockwiseProp, startPosition: startPositionProp, lineCap: lineCapProp, animated: animatedProp, animationDuration, style, textStyle, children } = props
  const tokens = useCircleTokens(tokensOverride)
  const fill = fillProp ?? tokens.defaults.fill
  const clockwise = clockwiseProp ?? tokens.defaults.clockwise
  const startPosition = startPositionProp ?? tokens.defaults.startPosition
  const lineCap = lineCapProp ?? tokens.defaults.lineCap
  const animated = animatedProp ?? tokens.defaults.animated
  const resolvedSize = Math.max(0, parseNumber(size, tokens.defaults.size))
  const resolvedStrokeWidth = Math.max(0, parseNumber(strokeWidth, tokens.defaults.strokeWidth))
  const rate = clamp(parsePercentage(rateProp ?? tokens.defaults.rate), 0, 100)
  const resolvedColor = color ?? tokens.colors.color
  const resolvedLayerColor = layerColor ?? tokens.colors.layerColor
  const baseStyle = useMemo(() => [tokens.layout.root, { width: resolvedSize, height: resolvedSize }, style], [resolvedSize, style, tokens.layout.root])
  const contentStyle = useMemo(() => [tokens.layout.content, { width: resolvedSize, height: resolvedSize }], [resolvedSize, tokens.layout.content])

  const content = useMemo(() => {
    if (children == null || children === false) return null
    const childArray = React.Children.toArray(children)
    if (childArray.every(isText)) return <Text style={[tokens.layout.text, { color: tokens.colors.text, fontSize: tokens.typography.fontSize, lineHeight: tokens.typography.lineHeight }, textStyle]}>{childArray.map(String).join('')}</Text>
    return children
  }, [children, textStyle, tokens.colors.text, tokens.layout.text, tokens.typography.fontSize, tokens.typography.lineHeight])

  if (Platform.OS === 'web') {
    const safeStroke = Math.min(resolvedStrokeWidth, resolvedSize / 2)
    const innerSize = Math.max(0, resolvedSize - safeStroke * 2)
    const progressAngle = (rate / 100) * 360
    const rotation = WEB_ROTATION[startPosition]
    const shouldRenderInner = innerSize > 0 && !isTransparentColor(fill)
    const gradient = clockwise
      ? `conic-gradient(from ${rotation}deg, ${resolvedColor} 0deg ${progressAngle}deg, ${resolvedLayerColor} ${progressAngle}deg 360deg)`
      : `conic-gradient(from ${rotation}deg, ${resolvedLayerColor} 0deg ${360 - progressAngle}deg, ${resolvedColor} ${360 - progressAngle}deg 360deg)`
    const webRingStyle: WebRingStyle = { width: resolvedSize, height: resolvedSize, borderRadius: resolvedSize / 2, backgroundImage: gradient }
    if (safeStroke > 0) {
      const mask = `radial-gradient(farthest-side, transparent calc(100% - ${safeStroke}px), #000 calc(100% - ${safeStroke}px))`
      Object.assign(webRingStyle, { WebkitMaskImage: mask, maskImage: mask, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: '100% 100%', maskSize: '100% 100%' })
    }
    return (
      <View style={baseStyle}>
        <View style={[tokens.layout.webRing, webRingStyle]} />
        {shouldRenderInner ? <View style={[tokens.layout.webInner, { width: innerSize, height: innerSize, borderRadius: innerSize / 2, backgroundColor: fill, left: safeStroke, top: safeStroke }]} /> : null}
        <View pointerEvents="box-none" style={contentStyle}>{content}</View>
      </View>
    )
  }

  const radius = Math.max(0, (resolvedSize - resolvedStrokeWidth) / 2)
  const circumference = 2 * Math.PI * radius
  const rotation = SVG_ROTATION[startPosition]
  const safeDuration = Math.max(0, animationDuration ?? tokens.defaults.animationDuration)
  const dashOffsetTarget = (clockwise ? 1 : -1) * circumference * (1 - rate / 100)
  const dashOffset = useRef(new Animated.Value(dashOffsetTarget)).current

  useEffect(() => {
    if (!animated || safeDuration <= 0) { dashOffset.setValue(dashOffsetTarget); return }
    const animation = Animated.timing(dashOffset, { toValue: dashOffsetTarget, duration: safeDuration, useNativeDriver: false })
    animation.start()
    return () => animation.stop()
  }, [animated, dashOffset, dashOffsetTarget, safeDuration])

  const center = resolvedSize / 2
  return (
    <View style={baseStyle}>
      <Svg width={resolvedSize} height={resolvedSize}>
        <SvgCircle cx={center} cy={center} r={radius} stroke={resolvedLayerColor} strokeWidth={resolvedStrokeWidth} fill={fill} />
        <AnimatedSvgCircle cx={center} cy={center} r={radius} stroke={resolvedColor} strokeWidth={resolvedStrokeWidth} fill="transparent" strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={dashOffset} strokeLinecap={lineCap} rotation={rotation} originX={center} originY={center} />
      </Svg>
      <View pointerEvents="box-none" style={contentStyle}>{content}</View>
    </View>
  )
}

export const Circle = React.memo(CircleImpl)
Circle.displayName = 'Circle'
export type { CircleLineCap, CircleProps, CircleStartPosition, CircleTokens } from './types'
export default Circle
