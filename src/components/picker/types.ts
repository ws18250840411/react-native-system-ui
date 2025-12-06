import type React from 'react'
import type { ViewProps } from 'react-native'

export type PickerValue = string | number

export interface PickerOption {
  label?: React.ReactNode
  value: PickerValue
  disabled?: boolean
  children?: PickerOption[]
}

export interface PickerColumnWithDefault {
  options: PickerOption[]
  defaultValue?: PickerValue
}

export type PickerColumn = PickerOption[] | PickerColumnWithDefault
export type PickerColumns = PickerColumn[] | PickerOption[]

export type PickerToolbarPosition = 'top' | 'bottom'

export interface PickerProps extends ViewProps {
  columns?: PickerColumns
  value?: PickerValue[] | PickerValue
  defaultValue?: PickerValue[] | PickerValue
  title?: React.ReactNode
  showToolbar?: boolean
  toolbarPosition?: PickerToolbarPosition
  confirmButtonText?: React.ReactNode
  cancelButtonText?: React.ReactNode
  itemHeight?: number
  visibleItemCount?: number
  loading?: boolean
  readOnly?: boolean
  optionRender?: (option: PickerOption, context: { columnIndex: number; active: boolean }) => React.ReactNode
  onChange?: (value: PickerValue[], options: (PickerOption | undefined)[]) => void
  onConfirm?: (value: PickerValue[], options: (PickerOption | undefined)[]) => void
  onCancel?: () => void
}

export interface PickerColumnProps {
  columnIndex: number
  options: PickerOption[]
  value?: PickerValue
  itemHeight: number
  visibleItemCount: number
  optionRender?: PickerProps['optionRender']
  readOnly?: boolean
  onSelect: (option: PickerOption, columnIndex: number, optionIndex: number) => void
}
