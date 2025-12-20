import React from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { Circle as SvgCircle, Svg } from 'react-native-system-icon'
import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export type CircleStartPosition = 'top' | 'right' | 'bottom' | 'left'
export type CircleLineCap = 'round' | 'butt' | 'square'

export interface CircleProps {
  /**
   * 进度百分比（0-100）
   */
  rate?: number | string
  /**
   * 圆环尺寸，默认 100
   */
  size?: number | string
  /**
   * 圆环宽度，默认 6
   */
  strokeWidth?: number | string
  /**
   * 进度条颜色
   */
  color?: string
  /**
   * 轨道颜色
   */
  layerColor?: string
  /**
   * 圆环内部填充色
   */
  fill?: string
  /**
   * 是否顺时针
   * @default true
   */
  clockwise?: boolean
  /**
   * 起始位置
   * @default 'top'
   */
  startPosition?: CircleStartPosition
  /**
   * 线帽
   * @default 'round'
   */
  lineCap?: CircleLineCap
  /**
   * 是否开启过渡动画（Native 端生效）
   * @default true
   */
  animated?: boolean
  /**
   * 动画时长（ms）
   * @default 300
   */
  animationDuration?: number
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
}

interface CircleTokens {
  colors: {
    color: string
    layerColor: string
    text: string
  }
  fontSize: number
  lineHeight: number
  size: number
  strokeWidth: number
  animationDuration: number
}

const createCircleTokens = (foundations: Foundations): CircleTokens => ({
  colors: {
    color: foundations.palette.primary[500],
    layerColor: foundations.palette.default[200],
    text: foundations.palette.default[800],
  },
  fontSize: foundations.fontSize.sm,
  lineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
  size: 100,
  strokeWidth: 6,
  animationDuration: 300,
})

const useCircleTokens = (overrides?: DeepPartial<CircleTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createCircleTokens(foundations)
    const globalOverrides = components?.circle as DeepPartial<CircleTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

const clampPercentage = (value: number) => {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return value
}

const parseNumberLike = (value: number | string | undefined, fallback: number) => {
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
  if (typeof percentage === 'number') return percentage
  if (typeof percentage === 'string') {
    const normalized = percentage.trim().replace('%', '')
    const parsed = Number(normalized)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

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

export const Circle: React.FC<CircleProps> = props => {
  const {
    rate: rateProp = 0,
    size,
    strokeWidth,
    color,
    layerColor,
    fill = 'transparent',
    clockwise = true,
    startPosition = 'top',
    lineCap = 'round',
    animated = true,
    animationDuration,
    style,
    textStyle,
    children,
  } = props

  const tokens = useCircleTokens()
  const resolvedSize = Math.max(0, parseNumberLike(size, tokens.size))
  const resolvedStrokeWidth = Math.max(0, parseNumberLike(strokeWidth, tokens.strokeWidth))
  const rate = clampPercentage(parsePercentage(rateProp))

  const resolvedColor = color ?? tokens.colors.color
  const resolvedLayerColor = layerColor ?? tokens.colors.layerColor

  const renderContent = () => {
    if (children === undefined || children === null || children === false) return null
    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <Text
          style={[
            styles.text,
            { color: tokens.colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )
    }
    return children
  }

  if (Platform.OS === 'web') {
    const safeStroke = Math.min(resolvedStrokeWidth, resolvedSize / 2)
    const innerSize = Math.max(0, resolvedSize - safeStroke * 2)
    const progressAngle = (rate / 100) * 360
    const rotation = resolveWebRotation(startPosition)
    const shouldRenderInner = innerSize > 0 && !isTransparentColor(fill)

    const gradient = clockwise
      ? `conic-gradient(from ${rotation}deg, ${resolvedColor} 0deg ${progressAngle}deg, ${resolvedLayerColor} ${progressAngle}deg 360deg)`
      : `conic-gradient(from ${rotation}deg, ${resolvedLayerColor} 0deg ${360 - progressAngle}deg, ${resolvedColor} ${360 - progressAngle}deg 360deg)`

    const webMask = safeStroke > 0
      ? (`radial-gradient(farthest-side, transparent calc(100% - ${safeStroke}px), #000 calc(100% - ${safeStroke}px))`)
      : undefined

    return (
      <View
        style={[
          styles.root,
          {
            width: resolvedSize,
            height: resolvedSize,
          },
          style,
        ]}
      >
        <View
          style={[
            styles.webRing,
            {
              width: resolvedSize,
              height: resolvedSize,
              borderRadius: resolvedSize / 2,
              backgroundImage: gradient as any,
              ...(webMask
                ? ({
                    WebkitMaskImage: webMask,
                    maskImage: webMask,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                  } as any)
                : null),
            },
          ]}
        />
        {shouldRenderInner ? (
          <View
            style={[
              styles.webInner,
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
        <View pointerEvents="box-none" style={[styles.content, { width: resolvedSize, height: resolvedSize }]}>
          {renderContent()}
        </View>
      </View>
    )
  }

  const AnimatedCircle = React.useMemo(() => Animated.createAnimatedComponent(SvgCircle), [SvgCircle])

  const radius = Math.max(0, (resolvedSize - resolvedStrokeWidth) / 2)
  const circumference = 2 * Math.PI * radius
  const rotation = resolveSvgRotation(startPosition)
  const safeDuration = Math.max(0, animationDuration ?? tokens.animationDuration)
  const dashOffsetTarget = (clockwise ? 1 : -1) * circumference * (1 - rate / 100)

  const dashOffset = React.useRef(new Animated.Value(dashOffsetTarget)).current
  const dashAnimationRef = React.useRef<Animated.CompositeAnimation | null>(null)

  React.useEffect(() => {
    dashAnimationRef.current?.stop()
    if (!animated || safeDuration <= 0) {
      dashOffset.setValue(dashOffsetTarget)
      return
    }
    const animation = Animated.timing(dashOffset, {
      toValue: dashOffsetTarget,
      duration: safeDuration,
      useNativeDriver: false,
    })
    dashAnimationRef.current = animation
    animation.start()
    return () => animation.stop()
  }, [animated, dashOffset, dashOffsetTarget, safeDuration])

  return (
    <View style={[styles.root, { width: resolvedSize, height: resolvedSize }, style]}>
      <Svg width={resolvedSize} height={resolvedSize}>
        <SvgCircle
          cx={resolvedSize / 2}
          cy={resolvedSize / 2}
          r={radius}
          stroke={resolvedLayerColor}
          strokeWidth={resolvedStrokeWidth}
          fill={fill}
        />
        <AnimatedCircle
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
      <View pointerEvents="box-none" style={[styles.content, { width: resolvedSize, height: resolvedSize }]}>
        {renderContent()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  webRing: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  webInner: {
    position: 'absolute',
  },
})

Circle.displayName = 'Circle'

export default Circle
