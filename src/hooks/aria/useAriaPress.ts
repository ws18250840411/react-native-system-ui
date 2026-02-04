import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useFocus, useFocusRing } from '@react-native-aria/focus'
import { useHover, usePress, type PressEvents } from '@react-native-aria/interactions'
import { mergeProps } from '@react-native-aria/utils'

const mergePropsCompat = (...args: Array<Record<string, unknown>>) => {
  if (typeof mergeProps === 'function') {
    return mergeProps(...args) as Record<string, unknown>
  }
  return Object.assign({}, ...args)
}

export interface UseAriaPressOptions extends PressEvents {
  
  disabled?: boolean
  
  allowHover?: boolean
  
  allowFocus?: boolean
  
  extraProps?: Record<string, unknown>
}

export interface AriaInteractionStates {
  hovered: boolean
  pressed: boolean
  focused: boolean
  focusVisible: boolean
  disabled: boolean
}

export interface UseAriaPressResult {
  
  interactionProps: Record<string, unknown>
  
  states: AriaInteractionStates
}

export const useAriaPress = ({
  disabled = false,
  allowHover = Platform.OS === 'web',
  allowFocus = Platform.OS === 'web',
  extraProps,
  ...pressEvents
}: UseAriaPressOptions = {}): UseAriaPressResult => {
  const { pressProps, isPressed } = usePress({
    ...pressEvents,
    isDisabled: disabled,
  })

  const { isHovered, hoverProps } = useHover({
    isDisabled: disabled || !allowHover,
  })

  const useFocusCompat = useFocus as unknown as (props: { isDisabled?: boolean }) => {
    isFocused: boolean
    focusProps: Record<string, unknown>
  }
  const { isFocused, focusProps } = useFocusCompat({ isDisabled: disabled })

  const useFocusRingCompat = useFocusRing as unknown as (props: { isDisabled?: boolean }) => {
    isFocusVisible: boolean
    focusProps: Record<string, unknown>
  }
  const { focusProps: focusRingProps, isFocusVisible } = useFocusRingCompat({ isDisabled: disabled })

  const interactionProps = useMemo(() => {
    let merged: Record<string, unknown> = pressProps as unknown as Record<string, unknown>
    if (allowHover) {
      merged = mergePropsCompat(merged, hoverProps as Record<string, unknown>)
    }
    if (allowFocus && !disabled) {
      merged = mergePropsCompat(
        merged,
        focusProps as Record<string, unknown>,
        focusRingProps as Record<string, unknown>,
      )
    }
    if (extraProps) {
      merged = mergePropsCompat(merged, extraProps)
    }
    return merged
  }, [allowFocus, allowHover, disabled, extraProps, focusProps, focusRingProps, hoverProps, pressProps])

  const states = useMemo(
    () => ({
      hovered: !!isHovered,
      pressed: !!isPressed,
      focused: !!isFocused,
      focusVisible: !!isFocusVisible,
      disabled: !!disabled,
    }),
    [disabled, isFocusVisible, isFocused, isHovered, isPressed],
  )

  return {
    interactionProps,
    states,
  }
}
