import React from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native'

import type { IconProps, BuiltInIconName } from './types'

const BUILTIN_GLYPHS: Record<BuiltInIconName, string> = {
  close: '×',
  check: '✓',
  info: 'ℹ',
  warning: '⚠',
  star: '★',
  'arrow-left': '←',
  'arrow-right': '→',
  loading: '⟳',
}

const AnimatedView = Animated.createAnimatedComponent(View)

const styles = StyleSheet.create({
  glyph: {
    textAlign: 'center',
    includeFontPadding: false,
  },
})

export const Icon = React.forwardRef<View, IconProps>((props, ref) => {
  const {
    name,
    component,
    size = 24,
    color = '#111827',
    strokeWidth,
    spin = false,
    rotate,
    style,
    children,
    onPress,
    ...rest
  } = props

  const spinValue = React.useRef(new Animated.Value(0)).current
  const loopRef = React.useRef<Animated.CompositeAnimation | null>(null)

  React.useEffect(() => {
    if (spin) {
      loopRef.current = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
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

  const resolvedColor = Array.isArray(color) ? color[0] ?? '#111827' : color

  const renderIconNode = () => {
    if (component) {
      const Component = component
      return <Component size={size} color={color} strokeWidth={strokeWidth} />
    }

    if (name && BUILTIN_GLYPHS[name]) {
      return (
        <Text
          style={[
            styles.glyph,
            {
              fontSize: size,
              color: resolvedColor,
            },
          ]}
        >
          {BUILTIN_GLYPHS[name]}
        </Text>
      )
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
