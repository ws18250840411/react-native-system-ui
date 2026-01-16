import * as React from 'react'
import { useFocus, useFocusRing } from '@react-native-aria/focus'
import { useHover, usePress, type PressEvents } from '@react-native-aria/interactions'
import { mergeProps } from '@react-native-aria/utils'

export interface UseAriaPressOptions extends PressEvents {
  /**
   * 是否禁用交互
   */
  disabled?: boolean
  /**
   * 是否开启 hover 监听（Web）
   * @default true
   */
  allowHover?: boolean
  /**
   * 是否处理聚焦态（Web）
   * @default true
   */
  allowFocus?: boolean
  /**
   * 透传到交互元素上的附加属性
   */
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
  /**
   * 需要挂载在交互元素上的属性集合
   */
  interactionProps: Record<string, unknown>
  /**
   * 统一的交互状态，便于组件快速渲染
   */
  states: AriaInteractionStates
}

export const useAriaPress = ({
  disabled = false,
  allowHover = true,
  allowFocus = true,
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

  let interactionProps: Record<string, unknown> = pressProps as unknown as Record<string, unknown>
  if (allowHover) {
    interactionProps = mergeProps(interactionProps, hoverProps) as unknown as Record<string, unknown>
  }
  if (allowFocus && !disabled) {
    interactionProps = mergeProps(interactionProps, focusProps, focusRingProps) as unknown as Record<string, unknown>
  }
  if (extraProps) {
    interactionProps = mergeProps(interactionProps, extraProps) as unknown as Record<string, unknown>
  }

  return {
    interactionProps,
    states: {
      hovered: !!isHovered,
      pressed: !!isPressed,
      focused: !!isFocused,
      focusVisible: !!isFocusVisible,
      disabled: !!disabled,
    },
  }
}
