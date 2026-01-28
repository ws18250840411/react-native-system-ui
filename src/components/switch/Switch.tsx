import React, { useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  View,
  type GestureResponderEvent,
  type PressableStateCallbackType,
} from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { useAriaPress, useControllableValue } from '../../hooks'
import { parseNumber } from '../../utils'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

const AnimatedHandle = Animated.createAnimatedComponent(View)
const switchEasing = Easing.bezier(0.25, 0.1, 0.25, 1)

type SwitchComponent = (<V = boolean>(props: SwitchProps<V>) => React.ReactElement) & {
  displayName?: string
}

const SwitchImpl = <V,>(props: SwitchProps<V>) => {
  const {
    disabled: disabledProp,
    loading: loadingProp,
    size,
    activeColor,
    inactiveColor,
    activeValue: activeValueProp,
    inactiveValue: inactiveValueProp,
    tokensOverride,
    onClick,
    style,
    ...rest
  } = props

  const tokens = useSwitchTokens(tokensOverride)
  const disabled = disabledProp ?? tokens.defaults.disabled
  const loading = loadingProp ?? tokens.defaults.loading
  const activeValue = (activeValueProp ?? tokens.defaults.activeValue) as V
  const inactiveValue = (inactiveValueProp ?? tokens.defaults.inactiveValue) as V
  const resolvedSize = Math.max(0, parseNumber(size, tokens.defaults.size))

  const borderWidth = tokens.borders.width
  const inset = Math.max(0, tokens.spacing.inset)

  const trackHeight = resolvedSize
  const trackWidth = trackHeight * 2
  const trackRadius = trackHeight / 2

  const innerHeight = Math.max(0, trackHeight - borderWidth * 2)
  const innerWidth = Math.max(0, trackWidth - borderWidth * 2)

  const handleSize = Math.max(0, innerHeight - inset * 2)
  const handleRadius = handleSize / 2
  const translateDistance = Math.max(0, innerWidth - handleSize - inset * 2)

  const [value, triggerChange] = useControllableValue<V>(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
    defaultValue: inactiveValue,
    trigger: 'onChange',
  })

  const isChecked = Object.is(value, activeValue)

  const progress = useRef(new Animated.Value(isChecked ? 1 : 0)).current
  const colorProgress = useRef(new Animated.Value(isChecked ? 1 : 0)).current

  useEffect(() => {
    const toValue = isChecked ? 1 : 0
    progress.stopAnimation()
    colorProgress.stopAnimation()

    const animation = Animated.parallel([
      Animated.timing(progress, {
        toValue,
        duration: tokens.animation.duration,
        easing: switchEasing,
        useNativeDriver: nativeDriverEnabled,
      }),
      Animated.timing(colorProgress, {
        toValue,
        duration: tokens.animation.duration,
        easing: switchEasing,
        useNativeDriver: false,
      }),
    ])
    animation.start()
    return () => animation.stop()
  }, [colorProgress, isChecked, progress, tokens.animation.duration])

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateDistance],
  })

  const resolvedActiveColor = activeColor ?? tokens.colors.activeTrack
  const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactiveTrack
  const trackColor = isChecked ? resolvedActiveColor : resolvedInactiveColor
  const animatedTrackColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [resolvedInactiveColor, resolvedActiveColor],
  })

  const handlePress = (event: GestureResponderEvent) => {
    if (disabled) return
    onClick?.(event)
    if (loading) return
    const next = isChecked ? inactiveValue : activeValue
    if (Object.is(next, value)) return
    triggerChange(next)
  }
  const { interactionProps } = useAriaPress({
    disabled,
    onPress: handlePress,
    extraProps: rest as Record<string, unknown>,
  })

  return (
    <Pressable
      {...interactionProps}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      disabled={disabled}
      style={({ pressed }: PressableStateCallbackType) => [
        tokens.layout.container,
        { opacity: disabled ? tokens.opacity.disabled : pressed ? tokens.opacity.pressed : 1 },
        style,
      ]}
    >
      <Animated.View
        style={[
          tokens.layout.track,
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackRadius,
            backgroundColor: animatedTrackColor,
            borderWidth,
            borderColor: tokens.colors.border,
          },
          { pointerEvents: 'none' },
        ]}
      >
        <AnimatedHandle
          style={[
            tokens.layout.handleOuter,
            tokens.layout.handleInner,
            {
              width: handleSize,
              height: handleSize,
              borderRadius: handleRadius,
              top: inset,
              left: inset,
              transform: [{ translateX }],
              backgroundColor: tokens.colors.handle,
              borderWidth,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          {loading && <ActivityIndicator size={tokens.loader.size} color={trackColor} />}
        </AnimatedHandle>
      </Animated.View>
    </Pressable>
  )
}

export const Switch = React.memo(SwitchImpl) as unknown as SwitchComponent

Switch.displayName = 'Switch'

export default Switch
