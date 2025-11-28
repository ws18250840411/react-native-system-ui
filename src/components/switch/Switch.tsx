import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableStateCallbackType,
} from 'react-native'

import { useAriaToggle } from '../../hooks'
import type { SwitchProps } from './types'
import { useSwitchTokens } from './tokens'

const AnimatedHandle = Animated.createAnimatedComponent(View)

export const Switch: React.FC<SwitchProps> = props => {
  const {
    checked,
    defaultChecked,
    disabled,
    loading = false,
    size,
    activeColor,
    inactiveColor,
    label,
    labelPosition,
    onChange,
    style,
    labelStyle,
    ...rest
  } = props

  const tokens = useSwitchTokens()
  const resolvedSize = size ?? tokens.defaults.size
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const sizeTokens = tokens.sizes[resolvedSize]

  const isDisabled = disabled || loading

  const ariaLabelFromProps =
    (rest as any)['aria-label'] ??
    (typeof rest.accessibilityLabel === 'string'
      ? (rest.accessibilityLabel as string)
      : undefined)
  const resolvedAriaLabel =
    ariaLabelFromProps ??
    (typeof label === 'string' ? label : undefined) ??
    'switch'

  const { state, inputProps, inputRef } = useAriaToggle({
    isSelected: checked,
    defaultSelected: defaultChecked,
    isDisabled,
    onChange,
    'aria-label': resolvedAriaLabel,
  })

  const progress = React.useRef(
    new Animated.Value(state.isSelected ? 1 : 0)
  ).current

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: state.isSelected ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }, [progress, state.isSelected])

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      sizeTokens.trackWidth -
        sizeTokens.handleSize -
        sizeTokens.padding * 2,
    ],
  })

  const trackColor = state.isSelected
    ? activeColor ?? tokens.colors.activeTrack
    : inactiveColor ?? tokens.colors.inactiveTrack

  const labelColor = isDisabled
    ? tokens.colors.labelDisabled
    : tokens.colors.label

  const renderLabel = () => {
    if (!label) return null
    if (React.isValidElement(label)) {
      return label
    }
    return (
      <Text style={[styles.label, { color: labelColor }, labelStyle]}>
        {label}
      </Text>
    )
  }

  const labelNode = renderLabel()

  const pressableStyle = React.useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      styles.container,
      resolvedLabelPosition === 'left' && styles.containerReverse,
      {
        opacity: isDisabled ? 0.45 : pressed ? 0.8 : 1,
      },
      style,
    ],
    [isDisabled, resolvedLabelPosition, style]
  )

  return (
    <Pressable
      ref={inputRef}
      {...inputProps}
      {...rest}
      disabled={isDisabled}
      style={pressableStyle}
    >
      {resolvedLabelPosition === 'left' && labelNode ? (
        <View style={{ marginRight: tokens.spacing.labelGap }}>{labelNode}</View>
      ) : null}
      <View
        style={[
          styles.track,
          {
            width: sizeTokens.trackWidth,
            height: sizeTokens.trackHeight,
            borderRadius: sizeTokens.trackHeight / 2,
            backgroundColor: isDisabled ? tokens.colors.disabledTrack : trackColor,
          },
        ]}
        pointerEvents="none"
      >
        <AnimatedHandle
          style={[
            styles.handle,
            {
              width: sizeTokens.handleSize,
              height: sizeTokens.handleSize,
              borderRadius: sizeTokens.handleSize / 2,
              top: sizeTokens.padding,
              left: sizeTokens.padding,
              transform: [{ translateX }],
              backgroundColor: state.isSelected
                ? tokens.colors.activeHandle
                : tokens.colors.handle,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={tokens.colors.loading} />
          ) : null}
        </AnimatedHandle>
      </View>
      {resolvedLabelPosition === 'right' && labelNode ? (
        <View style={{ marginLeft: tokens.spacing.labelGap }}>{labelNode}</View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerReverse: {
    flexDirection: 'row-reverse',
  },
  track: {
    position: 'relative',
  },
  handle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
  },
})

Switch.displayName = 'Switch'

export default Switch
