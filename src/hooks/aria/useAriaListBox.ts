import * as React from 'react'
import { useMemo, useRef } from 'react'
import { useListBox } from '@react-native-aria/listbox'
import { useListState, type ListState } from '@react-stately/list'
import type { AriaListBoxProps } from '@react-types/listbox'
export interface UseAriaListBoxOptions<T> extends AriaListBoxProps<T> { isVirtualized?: boolean; label?: React.ReactNode }
export interface UseAriaListBoxResult<T> { state: ListState<T>; listBoxProps: Record<string, unknown>; labelProps: Record<string, unknown>; ref: React.RefObject<unknown> }
export const useAriaListBox = <T extends object>(props: UseAriaListBoxOptions<T>): UseAriaListBoxResult<T> => {
  const ref = useRef<unknown>(null)
  const { label, ...rest } = props
  const resolved = typeof label === 'string' ? { ...rest, 'aria-label': label } : rest
  const state = useListState(resolved)
  const { listBoxProps, labelProps } = useListBox(resolved, state, ref as unknown as React.RefObject<HTMLElement>)
  return { state, listBoxProps: useMemo(() => listBoxProps as unknown as Record<string, unknown>, [listBoxProps]), labelProps: useMemo(() => labelProps as unknown as Record<string, unknown>, [labelProps]), ref }
}
