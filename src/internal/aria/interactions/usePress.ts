import React, { RefObject } from 'react'
import { mergeProps } from '@react-aria/utils'
export interface PressEvents {
  onPress?: (e: any) => void
  onPressStart?: (e: any) => void
  onPressEnd?: (e: any) => void
  onPressChange?: (isPressed: boolean) => void
  onPressUp?: (e: any) => void
}
export interface PressProps extends PressEvents {
  isPressed?: boolean
  isDisabled?: boolean
  preventFocusOnPress?: boolean
}
export interface PressHookProps extends PressProps {
  ref?: RefObject<any>
}
export type PressResult = { isPressed: boolean; pressProps: any }
export function usePress({
  isDisabled,
  onPress,
  onPressStart,
  onPressEnd,
  onPressUp,
  onPressChange,
  isPressed: isPressedProp,
  ...restProps
}: PressHookProps): PressResult {
  const [isPressed, setPressed] = React.useState(false)
  let pressProps = {
    onPress: (e: any) => {
      if (isDisabled) return
      onPress?.(e)
    },
    onPressIn: (e: any) => {
      if (isDisabled) return
      onPressStart?.(e)
      setPressed(true)
      onPressChange?.(true)
    },
    onPressOut: (e: any) => {
      if (isDisabled) return
      onPressEnd?.(e)
      setPressed(false)
      onPressChange?.(false)
      onPressUp?.(e)
    },
  }
  pressProps = mergeProps(pressProps, restProps)
  return { isPressed: isPressedProp || isPressed, pressProps }
}
