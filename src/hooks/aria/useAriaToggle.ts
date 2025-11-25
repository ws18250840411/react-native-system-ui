import * as React from 'react'
import { useToggle } from '@react-native-aria/toggle'
import type { ToggleState } from '@react-stately/toggle'
import { useToggleState } from '@react-stately/toggle'
import type { AriaToggleProps } from '@react-types/checkbox'

export interface UseAriaToggleOptions extends AriaToggleProps {
  /**
   * Ref to the internal pressable element
   */
  inputRef?: React.RefObject<any>
}

export interface UseAriaToggleResult {
  state: ToggleState
  inputProps: any
  inputRef: React.RefObject<any>
}

export const useAriaToggle = (
  props: UseAriaToggleOptions
): UseAriaToggleResult => {
  const inputRef = props.inputRef ?? React.useRef<any>(null)
  const state = useToggleState(props)
  const { inputProps } = useToggle(props, state, inputRef)

  return {
    state,
    inputProps,
    inputRef,
  }
}
