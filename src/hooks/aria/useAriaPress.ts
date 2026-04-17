import { useMemo } from 'react'
import { usePress, type PressEvents } from '../../internal/aria/interactions'
import { mergeProps } from '../../internal/aria/utils'
const mp = (...args: Array<Record<string, unknown>>) => (typeof mergeProps === 'function' ? mergeProps(...args) : Object.assign({}, ...args)) as Record<string, unknown>
export interface UseAriaPressOptions extends PressEvents { disabled?: boolean; extraProps?: Record<string, unknown> }
export interface AriaInteractionStates { hovered: boolean; pressed: boolean; focused: boolean; focusVisible: boolean; disabled: boolean }
export interface UseAriaPressResult { interactionProps: Record<string, unknown>; states: AriaInteractionStates }
export const useAriaPress = ({ disabled = false, extraProps, ...pressEvents }: UseAriaPressOptions = {}): UseAriaPressResult => {
  const { pressProps, isPressed } = usePress({ ...pressEvents, isDisabled: disabled })
  const interactionProps = useMemo(() => mp(pressProps as Record<string, unknown>, ...(extraProps ? [extraProps] : [])), [extraProps, pressProps])
  const states = useMemo(
    () => ({ hovered: false, pressed: !!isPressed, focused: false, focusVisible: false, disabled: !!disabled }),
    [disabled, isPressed]
  )
  return { interactionProps, states }
}
