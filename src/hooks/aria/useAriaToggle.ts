import * as React from 'react'
import { useMemo, useRef } from 'react'
import { useToggle } from '@react-native-aria/toggle'
import type { ToggleState } from '@react-stately/toggle'
import { useToggleState } from '@react-stately/toggle'
import type { AriaToggleProps } from '@react-types/checkbox'
export interface UseAriaToggleOptions extends AriaToggleProps { inputRef?: React.RefObject<unknown> }
export interface UseAriaToggleResult { state: ToggleState; inputProps: Record<string, unknown>; inputRef: React.RefObject<unknown> }
export const useAriaToggle = (props: UseAriaToggleOptions): UseAriaToggleResult => {
  const fallbackRef = useRef<unknown>(null)
  const inputRef = props.inputRef ?? fallbackRef
  const state = useToggleState(props)
  const { inputProps } = useToggle(props, state, inputRef as unknown as React.RefObject<HTMLInputElement>)
  return { state, inputProps: useMemo(() => inputProps as unknown as Record<string, unknown>, [inputProps]), inputRef }
}
