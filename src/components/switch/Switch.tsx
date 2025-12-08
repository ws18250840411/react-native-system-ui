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
  // 防御性兜底，避免自定义 size 导致缺少尺寸配置
  const safeSizeTokens =
    tokens.sizes[resolvedSize] ??
    tokens.sizes[tokens.defaults.size] ??
    tokens.sizes.medium
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
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
      safeSizeTokens.trackWidth -
        safeSizeTokens.handleSize -
        safeSizeTokens.padding * 2,
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
            width:  safeSizeTokens.trackWidth,
            height:  safeSizeTokens.trackHeight,
            borderRadius:  safeSizeTokens.trackHeight / 2,
            backgroundColor: isDisabled ? tokens.colors.disabledTrack : trackColor,
          },
        ]}
        pointerEvents="none"
      >
        <AnimatedHandle
          style={[
            styles.handle,
            {
              width:  safeSizeTokens.handleSize,
              height:  safeSizeTokens.handleSize,
              borderRadius:  safeSizeTokens.handleSize / 2,
              top:  safeSizeTokens.padding,
              left:  safeSizeTokens.padding,
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
