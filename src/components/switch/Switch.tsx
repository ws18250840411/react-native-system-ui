import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  View,
  type PressableStateCallbackType,
  type GestureResponderEvent,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

const AnimatedHandle = Animated.createAnimatedComponent(View)

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export const Switch: React.FC<SwitchProps> = props => {
  const {
    checked,
    defaultChecked,
    disabled = false,
    loading = false,
    size,
    activeColor,
    inactiveColor,
    activeValue = true,
    inactiveValue = false,
    onClick,
    onChange,
    style,
    ...rest
  } = props

  const tokens = useSwitchTokens()
  const resolvedSize = Math.max(0, parseNumber(size, tokens.defaults.size))

  const padding = Math.max(2, Math.round(resolvedSize * 0.07))
  const trackHeight = resolvedSize
  const trackWidth = resolvedSize * 2
  const handleSize = Math.max(0, trackHeight - padding * 2)
  const translateDistance = Math.max(0, trackWidth - handleSize - padding * 2)

  const [value, triggerChange] = useControllableValue<any>(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
    defaultValue: inactiveValue,
    trigger: 'onChange',
  })

  const isChecked = React.useMemo(() => value === activeValue, [activeValue, value])

  const progress = React.useRef(new Animated.Value(isChecked ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: isChecked ? 1 : 0,
      duration: tokens.animation.duration,
      useNativeDriver: true,
    }).start()
  }, [isChecked, progress, tokens.animation.duration])

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      translateDistance,
    ],
  })

  const resolvedActiveColor = activeColor ?? tokens.colors.activeTrack
  const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactiveTrack
  const trackColor = isChecked ? resolvedActiveColor : resolvedInactiveColor

  const pressableStyle = React.useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      styles.container,
      {
        opacity: disabled ? tokens.opacity.disabled : pressed ? tokens.opacity.pressed : 1,
      },
      style,
    ],
    [disabled, style, tokens.opacity.disabled, tokens.opacity.pressed]
  )

  const handlePress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) return
      onClick?.(event)
      if (loading) return

      const next = isChecked ? inactiveValue : activeValue
      if (Object.is(next, value)) return
      triggerChange(next)
    },
    [
      activeValue,
      disabled,
      inactiveValue,
      isChecked,
      loading,
      onClick,
      triggerChange,
      value,
    ],
  )

  return (
    <Pressable
      {...rest}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      disabled={disabled}
      style={pressableStyle}
      onPress={handlePress}
    >
      <View
        style={[
          styles.track,
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: trackColor,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: tokens.colors.border,
          },
        ]}
        pointerEvents="none"
      >
        <AnimatedHandle
          style={[
            styles.handle,
            {
              width: handleSize,
              height: handleSize,
              borderRadius: handleSize / 2,
              top: padding,
              left: padding,
              transform: [{ translateX }],
              backgroundColor: tokens.colors.handle,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={trackColor} />
          ) : null}
        </AnimatedHandle>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    position: 'relative',
  },
  handle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
})

Switch.displayName = 'Switch'

export default Switch
