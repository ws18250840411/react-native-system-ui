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
  extraProps?: Record<string, any>
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
  interactionProps: Record<string, any>
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

  const { isFocused, focusProps } = (useFocus as any)({ isDisabled: disabled })

  const { focusProps: focusRingProps, isFocusVisible } = (useFocusRing as any)({ isDisabled: disabled })

  let interactionProps = pressProps
  if (allowHover) {
    interactionProps = mergeProps(interactionProps, hoverProps)
  }
  if (allowFocus && !disabled) {
    interactionProps = mergeProps(interactionProps, focusProps, focusRingProps)
  }
  if (extraProps) {
    interactionProps = mergeProps(interactionProps, extraProps)
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
