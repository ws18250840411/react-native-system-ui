import { useMemo } from 'react'
import { usePress, type PressEvents } from '../../internal/aria/interactions'
import { mergeProps } from '@react-aria/utils'
export interface UseAriaPressOptions extends PressEvents { disabled?: boolean; extraProps?: Record<string, unknown> }
export interface AriaInteractionStates { hovered: boolean; pressed: boolean; focused: boolean; focusVisible: boolean; disabled: boolean }
export interface UseAriaPressResult { interactionProps: Record<string, unknown>; states: AriaInteractionStates }
export const useAriaPress = ({ disabled = false, extraProps, ...pressEvents }: UseAriaPressOptions = {}): UseAriaPressResult => {
  const { pressProps, isPressed } = usePress({ ...pressEvents, isDisabled: disabled })
  const interactionProps = useMemo(() => mergeProps(pressProps as Record<string, unknown>, ...(extraProps ? [extraProps] : [])) as Record<string, unknown>, [extraProps, pressProps])
  const states = useMemo(
    () => ({ hovered: false, pressed: !!isPressed, focused: false, focusVisible: false, disabled: !!disabled }),
    [disabled, isPressed]
  )
  return { interactionProps, states }
}
