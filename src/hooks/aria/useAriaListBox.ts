import * as React from 'react'
import { useListBox } from '@react-native-aria/listbox'
import { useListState, type ListState } from '@react-stately/list'
import type { AriaListBoxProps } from '@react-types/listbox'

export interface UseAriaListBoxOptions<T> extends AriaListBoxProps<T> {
  /**
   * 是否开启虚拟滚动
   */
  isVirtualized?: boolean
  /**
    * 自定义 label
    */
  label?: React.ReactNode
}

export interface UseAriaListBoxResult<T> {
  state: ListState<T>
  listBoxProps: Record<string, unknown>
  labelProps: Record<string, unknown>
  ref: React.RefObject<unknown>
}

export const useAriaListBox = <T extends object>(
  props: UseAriaListBoxOptions<T>
): UseAriaListBoxResult<T> => {
  const ref = React.useRef<unknown>(null)
  const state = useListState(props)
  const { listBoxProps, labelProps } = useListBox(props, state, ref as unknown as React.RefObject<HTMLElement>)

  return {
    state,
    listBoxProps: listBoxProps as unknown as Record<string, unknown>,
    labelProps: labelProps as unknown as Record<string, unknown>,
    ref,
  }
}
