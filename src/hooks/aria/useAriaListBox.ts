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
  listBoxProps: any
  labelProps: any
  ref: React.RefObject<any>
}

export const useAriaListBox = <T extends object>(
  props: UseAriaListBoxOptions<T>
): UseAriaListBoxResult<T> => {
  const ref = React.useRef<any>(null)
  const state = useListState(props)
  const { listBoxProps, labelProps } = useListBox(props, state, ref)

  return {
    state,
    listBoxProps,
    labelProps,
    ref,
  }
}
