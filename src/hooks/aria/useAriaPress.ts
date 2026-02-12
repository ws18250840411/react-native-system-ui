import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useFocus, useFocusRing } from '@react-native-aria/focus'
import { useHover, usePress, type PressEvents } from '@react-native-aria/interactions'
import { mergeProps } from '@react-native-aria/utils'
const mp = (...args: Array<Record<string, unknown>>) => typeof mergeProps === 'function' ? mergeProps(...args) as Record<string, unknown> : Object.assign({}, ...args)
export interface UseAriaPressOptions extends PressEvents { disabled?: boolean; allowHover?: boolean; allowFocus?: boolean; extraProps?: Record<string, unknown> }
export interface AriaInteractionStates { hovered: boolean; pressed: boolean; focused: boolean; focusVisible: boolean; disabled: boolean }
export interface UseAriaPressResult { interactionProps: Record<string, unknown>; states: AriaInteractionStates }
export const useAriaPress = ({ disabled = false, allowHover = Platform.OS === 'web', allowFocus = Platform.OS === 'web', extraProps, ...pressEvents }: UseAriaPressOptions = {}): UseAriaPressResult => {
  const { pressProps, isPressed } = usePress({ ...pressEvents, isDisabled: disabled })
  const { isHovered, hoverProps } = useHover({ isDisabled: disabled || !allowHover })
  const { isFocused, focusProps } = (useFocus as any)({ isDisabled: disabled })
  const { focusProps: focusRingProps, isFocusVisible } = (useFocusRing as any)({ isDisabled: disabled })
  const interactionProps = useMemo(() => {
    let m = pressProps as unknown as Record<string, unknown>
    if (allowHover) m = mp(m, hoverProps as Record<string, unknown>)
    if (allowFocus && !disabled) m = mp(m, focusProps as Record<string, unknown>, focusRingProps as Record<string, unknown>)
    if (extraProps) m = mp(m, extraProps)
    return m
  }, [allowFocus, allowHover, disabled, extraProps, focusProps, focusRingProps, hoverProps, pressProps])
  const states = useMemo(() => ({ hovered: !!isHovered, pressed: !!isPressed, focused: !!isFocused, focusVisible: !!isFocusVisible, disabled: !!disabled }), [disabled, isFocusVisible, isFocused, isHovered, isPressed])
  return { interactionProps, states }
}
