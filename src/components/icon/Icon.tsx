import React from 'react'
import { Animated, Easing, Platform, Pressable, View } from 'react-native'

import type { IconProps, BuiltInIconName } from './types'
import { useIconTokens } from './tokens'
import { BUILTIN_ICONS } from './builtins'

const AnimatedView = Animated.createAnimatedComponent(View)

const renderBuiltInIcon = (name: BuiltInIconName, size: number, color: string) => {
  const definition = BUILTIN_ICONS[name]
  if (!definition) return null

  if (Platform.OS === 'web') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={definition.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {definition.paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill={color}
            fillRule={path.fillRule}
          />
        ))}
      </svg>
    )
  }

  // Native 端依赖 react-native-svg；为避免 Web 打包额外引入，这里使用运行时 require
  let svg: any
  try {
    svg = require('react-native-svg')
  } catch {
    return null
  }
  const Svg = (svg.default ?? svg.Svg) as React.ComponentType<any>
  const Path = svg.Path as React.ComponentType<any>

  return (
    <Svg width={size} height={size} viewBox={definition.viewBox}>
      {definition.paths.map((path, index) => (
        <Path
          key={index}
          d={path.d}
          fill={color}
          fillRule={path.fillRule}
        />
      ))}
    </Svg>
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
      const builtInIcon = renderBuiltInIcon(name, resolvedSize, resolvedColor)
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
