import type React from 'react'
import type { ViewProps } from 'react-native'

export type PickerValue = string | number

export interface PickerOption {
  label: React.ReactNode
  value: PickerValue
  disabled?: boolean
  children?: PickerOption[]
}

export interface PickerColumnProps {
  options: PickerOption[]
  value?: PickerValue
  onChange?: (option: PickerOption) => void
  columnHeight: number
  itemHeight: number
}

export interface PickerProps extends Omit<ViewProps, 'onChange'> {
  columns: PickerOption[][] | PickerOption[]
  value?: PickerValue[]
  defaultValue?: PickerValue[]
  onChange?: (value: PickerValue[], options: PickerOption[]) => void
  onConfirm?: (value: PickerValue[], options: PickerOption[]) => void
  onCancel?: () => void
  title?: React.ReactNode
  showToolbar?: boolean
  itemHeight?: number
  visibleItemCount?: number
}
