import * as React from 'react'
import { useMemo, useRef } from 'react'
import { useToggle } from '@react-native-aria/toggle'
import type { ToggleState } from '@react-stately/toggle'
import { useToggleState } from '@react-stately/toggle'
import type { AriaToggleProps } from '@react-types/checkbox'

export interface UseAriaToggleOptions extends AriaToggleProps {
  inputRef?: React.RefObject<unknown>
}

export interface UseAriaToggleResult {
  state: ToggleState
  inputProps: Record<string, unknown>
  inputRef: React.RefObject<unknown>
}

export const useAriaToggle = (
  props: UseAriaToggleOptions
): UseAriaToggleResult => {
  const inputRef = props.inputRef ?? useRef<unknown>(null)
  const state = useToggleState(props)
  const { inputProps } = useToggle(
    props,
    state,
    inputRef as unknown as React.RefObject<HTMLInputElement>
  )
  const resolvedInputProps = useMemo(
    () => inputProps as unknown as Record<string, unknown>,
    [inputProps],
  )

  return {
    state,
    inputProps: resolvedInputProps,
    inputRef,
  }
}
