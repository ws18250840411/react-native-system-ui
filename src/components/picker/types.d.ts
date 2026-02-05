import type React from 'react'
import type { TextStyle, ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'

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

export interface PickerTokens {
  defaults: {
    itemHeight: number
    visibleItemCount: number
    showToolbar: boolean
    toolbarPosition: PickerToolbarPosition
    swipeDuration: number
    maskType: 'gradient' | 'solid'
  }
  colors: {
    background: string
    indicator: string
    text: string
    textMuted: string
    textDisabled: string
    confirm: string
    cancel: string
    mask: string
    loadingMask: string
  }
  spacing: {
    toolbarHeight: number
    actionPadding: number
  }
  typography: {
    optionSize: number
    toolbarSize: number
    fontFamily: string
    optionWeight: TextStyle['fontWeight']
    toolbarWeight: TextStyle['fontWeight']
  }
  radius: {
    toolbar: number
    container: number
  }
}

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
  scrollEventThrottle?: number
  maskColor?: string
  maskType?: 'gradient' | 'solid'
  swipeDuration?: number
  columnsTop?: React.ReactNode
  columnsBottom?: React.ReactNode
  emitConfirmOnAutoSelect?: boolean
  optionRender?: (option: PickerOption, context: { columnIndex: number; active: boolean }) => React.ReactNode
  getOptionTestID?: (option: PickerOption, context: { columnIndex: number; active: boolean }) => string | undefined
  getOptionA11yLabel?: (option: PickerOption, context: { columnIndex: number; active: boolean }) => string | undefined
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
  getOptionTestID?: PickerProps['getOptionTestID']
  getOptionA11yLabel?: PickerProps['getOptionA11yLabel']
  readOnly?: boolean
  decelerationRate?: PickerProps['decelerationRate']
  scrollEventThrottle?: PickerProps['scrollEventThrottle']
  swipeDuration?: number
  onSelect: (option: PickerOption, columnIndex: number, optionIndex: number) => void
}
