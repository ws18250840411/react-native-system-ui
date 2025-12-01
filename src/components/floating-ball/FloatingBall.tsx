import React from 'react'
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'

import { useFloatingBallTokens } from './tokens'
import type { FloatingBallProps, FloatingBallPosition } from './types'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const FloatingBall = React.forwardRef<View, FloatingBallProps>((props, ref) => {
  const {
    defaultPosition,
    position,
    magnetic = true,
    draggable = true,
    disabled = false,
    size: sizeProp,
    padding,
    onChange,
    onPress,
    children,
    style,
    ...rest
  } = props

  const tokens = useFloatingBallTokens()
  const size = sizeProp ?? tokens.size
  const paddingValue = padding ?? tokens.padding
  const { width, height } = useWindowDimensions()

  const bounds = React.useMemo(() => ({
    minX: paddingValue,
    maxX: Math.max(paddingValue, width - size - paddingValue),
    minY: paddingValue,
    maxY: Math.max(paddingValue, height - size - paddingValue - 24),
  }), [paddingValue, width, height, size])

  const initial = React.useMemo(() => {
    const target = position ?? defaultPosition ?? { x: bounds.maxX, y: height * 0.4 }
    return {
      x: clamp(target.x, bounds.minX, bounds.maxX),
      y: clamp(target.y, bounds.minY, bounds.maxY),
    }
  }, [bounds.maxX, bounds.minX, bounds.maxY, bounds.minY, defaultPosition, height, position])

  const lastPosition = React.useRef<FloatingBallPosition>(initial)
  const animated = React.useRef(new Animated.ValueXY(initial)).current

  React.useEffect(() => {
    lastPosition.current = initial
    animated.setValue(initial)
  }, [initial, animated])

  React.useEffect(() => {
    if (position) {
      const next = {
        x: clamp(position.x, bounds.minX, bounds.maxX),
        y: clamp(position.y, bounds.minY, bounds.maxY),
      }
      lastPosition.current = next
      Animated.timing(animated, {
        toValue: next,
        duration: 150,
        useNativeDriver: false,
      }).start()
    }
  }, [animated, bounds.maxX, bounds.minX, bounds.maxY, bounds.minY, position])

  const emitChange = React.useCallback((value: FloatingBallPosition) => {
    onChange?.(value)
  }, [onChange])

  const settlePosition = React.useCallback((next: FloatingBallPosition) => {
    const clamped = {
      x: clamp(next.x, bounds.minX, bounds.maxX),
      y: clamp(next.y, bounds.minY, bounds.maxY),
    }
    if (magnetic) {
      const snapX = clamped.x + size / 2 > width / 2 ? bounds.maxX : bounds.minX
      clamped.x = snapX
    }
    lastPosition.current = clamped
    Animated.timing(animated, {
      toValue: clamped,
      duration: 180,
      useNativeDriver: false,
    }).start()
    emitChange(clamped)
  }, [animated, bounds.maxX, bounds.minX, bounds.maxY, bounds.minY, emitChange, magnetic, size, width])

  const startRef = React.useRef<FloatingBallPosition>(lastPosition.current)

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => draggable && !disabled,
    onMoveShouldSetPanResponder: (_, gesture) => draggable && !disabled && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),
    onPanResponderGrant: () => {
      startRef.current = lastPosition.current
    },
    onPanResponderMove: (_, gesture) => {
      if (!draggable || disabled) return
      const next = {
        x: clamp(startRef.current.x + gesture.dx, bounds.minX, bounds.maxX),
        y: clamp(startRef.current.y + gesture.dy, bounds.minY, bounds.maxY),
      }
      animated.setValue(next)
    },
    onPanResponderRelease: (_, gesture) => {
      if (!draggable || disabled) return
      const next = {
        x: startRef.current.x + gesture.dx,
        y: startRef.current.y + gesture.dy,
      }
      settlePosition(next)
    },
  }), [animated, bounds.maxX, bounds.minX, bounds.maxY, bounds.minY, disabled, draggable, settlePosition])

  const handlePress = React.useCallback(() => {
    if (disabled) return
    onPress?.()
  }, [disabled, onPress])

  const shadowStyle = {
    shadowColor: tokens.colors.shadow,
    shadowOpacity: tokens.shadow.opacity,
    shadowRadius: tokens.shadow.radius,
    shadowOffset: { width: 0, height: tokens.shadow.offsetY },
    elevation: 6,
  }

  return (
    <Animated.View
      ref={ref}
      style={[styles.container, shadowStyle, {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tokens.colors.background,
        transform: [{ translateX: animated.x }, { translateY: animated.y }],
      }, style]}
      {...rest}
      {...panResponder.panHandlers}
    >
      <Pressable
        style={styles.pressable}
        onPress={handlePress}
        testID="rv-floating-ball"
      >
        {children ?? <Text style={{ color: tokens.colors.text, fontWeight: '600' }}>+</Text>}
      </Pressable>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

FloatingBall.displayName = 'FloatingBall'

export default FloatingBall
