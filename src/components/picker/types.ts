import type React from 'react'
import type { ViewProps } from 'react-native'

export type PickerValue = string | number

export interface PickerOption {
  label: React.ReactNode
  value: PickerValue
  disabled?: boolean
  [key: string]: any
}

export interface PickerCascadeOption extends PickerOption {
  children?: PickerCascadeOption[]
}

export interface PickerOptionMultipleWithDefault {
  options: PickerOption[]
  defaultValue?: PickerValue
}

export type PickerColumn = PickerCascadeOption | PickerOption[] | PickerOptionMultipleWithDefault

export type PickerDataType = 'single' | 'multiple' | 'cascade'

export interface PickerViewProps extends Omit<ViewProps, 'onChange'> {
  columns: PickerColumn[]
  value?: PickerValue[]
  defaultValue?: PickerValue[]
  onChange?: (value: PickerValue[], options: PickerOption[]) => void
  itemHeight?: number
  visibleItemCount?: number
  loading?: boolean
  testID?: string
}

export interface PickerColumnProps {
  options: PickerOption[]
  value?: PickerValue
  itemHeight: number
  visibleItemCount: number
  onChange?: (option: PickerOption) => void
}

export interface PickerProps extends PickerViewProps {
  title?: React.ReactNode
  confirmButtonText?: React.ReactNode
  cancelButtonText?: React.ReactNode
  showToolbar?: boolean
  toolbarPosition?: 'top' | 'bottom'
  onConfirm?: (value: PickerValue[], options: PickerOption[]) => void
  onCancel?: () => void
}
