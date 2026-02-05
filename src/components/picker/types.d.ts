import type React from 'react'
import type { ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { PickerTokens } from './tokens'

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
  tokensOverride?: DeepPartial<PickerTokens>
  showToolbar?: boolean
  toolbarPosition?: PickerToolbarPosition
  confirmButtonText?: React.ReactNode
  cancelButtonText?: React.ReactNode
  itemHeight?: number
  visibleItemCount?: number
  loading?: boolean
  readOnly?: boolean
  decelerationRate?: 'normal' | 'fast' | number
  maskColor?: string
  emitConfirmOnAutoSelect?: boolean
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
  readOnly?: boolean
  decelerationRate?: PickerProps['decelerationRate']
  onSelect: (option: PickerOption, columnIndex: number, optionIndex: number) => void
}
