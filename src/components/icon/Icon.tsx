import React from 'react'
import { Animated, Easing, Platform, Pressable, View } from 'react-native'
import { Circle as RNCircle, G as RNG, Path as RNPath, Svg as RNSvg } from 'react-native-svg'

import type { IconProps, BuiltInIconName } from './types'
import { useIconTokens } from './tokens'
import { BUILTIN_ICONS } from './builtins'
import type { BuiltInIconNode } from './builtins'

const AnimatedView = Animated.createAnimatedComponent(View)

const renderBuiltInIcon = (
  name: BuiltInIconName,
  size: number,
  color: string,
  strokeWidth?: number,
) => {
  const definition = BUILTIN_ICONS[name]
  if (!definition) return null

  if (Platform.OS === 'web') {
    const renderNode = (node: BuiltInIconNode, key: string): React.ReactNode => {
      if (node.type === 'g') {
        return (
          <g
            key={key}
            fillRule={node.fillRule}
            transform={node.transform}
            opacity={node.opacity}
          >
            {node.children.map((child, index) => renderNode(child, `${key}-${index}`))}
          </g>
        )
      }

      if (node.type === 'circle') {
        return (
          <circle
            key={key}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={color}
            transform={node.transform}
            opacity={node.opacity}
          />
        )
      }

      return (
        <path
          key={key}
          d={node.d}
          fill={color}
          fillRule={node.fillRule}
          transform={node.transform}
          opacity={node.opacity}
          stroke={node.stroke ? color : undefined}
          strokeWidth={node.stroke ? (strokeWidth ?? 2) : undefined}
        />
      )
    }

    return (
      <svg
        width={size}
        height={size}
        viewBox={definition.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {definition.nodes.map((node, index) => renderNode(node, String(index)))}
      </svg>
    )
  }

  // Native 端使用 react-native-svg（通过 Vite alias 自动选择平台特定模块）
  const renderNode = (node: BuiltInIconNode, key: string): React.ReactNode => {
    if (node.type === 'g') {
      return (
        <RNG
          key={key}
          fillRule={node.fillRule}
          transform={node.transform}
          opacity={node.opacity}
        >
          {node.children.map((child, index) => renderNode(child, `${key}-${index}`))}
        </RNG>
      )
    }

    if (node.type === 'circle') {
      return (
        <RNCircle
          key={key}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={color}
          transform={node.transform}
          opacity={node.opacity}
        />
      )
    }

    return (
      <RNPath
        key={key}
        d={node.d}
        fill={color}
        fillRule={node.fillRule}
        transform={node.transform}
        opacity={node.opacity}
        stroke={node.stroke ? color : undefined}
        strokeWidth={node.stroke ? (strokeWidth ?? 2) : undefined}
      />
    )
  }

  return (
    <RNSvg width={size} height={size} viewBox={definition.viewBox}>
      {definition.nodes.map((node, index) => renderNode(node, String(index)))}
    </RNSvg>
  )
}

export const Icon = React.forwardRef<View, IconProps>((props, ref) => {
  const {
    name,
    component,
    size,
    color,
    strokeWidth,
    spin = false,
    rotate,
    style,
    children,
    onPress,
    ...rest
  } = props

  const tokens = useIconTokens()
  const resolvedSize = size ?? tokens.defaults.size

  const spinValue = React.useRef(new Animated.Value(0)).current
  const loopRef = React.useRef<Animated.CompositeAnimation | null>(null)

  React.useEffect(() => {
    if (spin) {
      loopRef.current = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: tokens.defaults.spinDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      )
      loopRef.current.start()
    } else {
      loopRef.current?.stop()
      spinValue.setValue(0)
    }

    return () => {
      loopRef.current?.stop()
    }
  }, [spin, spinValue])

  const colorInput = color ?? tokens.defaults.color
  const resolvedColor = Array.isArray(colorInput) ? colorInput[0] ?? tokens.defaults.color : colorInput

  const renderIconNode = () => {
    if (component) {
      const Component = component
      return <Component size={resolvedSize} color={colorInput} strokeWidth={strokeWidth} />
    }

    if (name) {
      const builtInIcon = renderBuiltInIcon(name, resolvedSize, resolvedColor, strokeWidth)
      if (builtInIcon) return builtInIcon
    }

    if (React.isValidElement(children)) {
      return children
    }

    return null
  }

  const spinRotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const transforms: Array<{ rotate: string }> = []
  if (spin) {
    transforms.push({ rotate: spinRotate })
  }
  if (typeof rotate === 'number' && rotate !== 0) {
    transforms.push({ rotate: `${rotate}deg` })
  }

  const transformStyle = transforms.length ? { transform: transforms } : null

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [style, pressed ? { opacity: 0.85 } : null]}
        onPress={onPress}
        {...rest}
      >
        <AnimatedView ref={ref} style={transformStyle}>
          {renderIconNode()}
        </AnimatedView>
      </Pressable>
    )
  }

  return (
    <AnimatedView ref={ref} style={[style, transformStyle]} {...rest}>
      {renderIconNode()}
    </AnimatedView>
  )
})

Icon.displayName = 'Icon'

export default Icon
