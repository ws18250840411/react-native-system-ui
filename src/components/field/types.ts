import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

import type { DialogShowOptions } from '../dialog'
import type { CellArrowDirection, CellSize } from '../cell/types'

export type FieldClearTrigger = 'always' | 'focus'
export type FieldInputAlign = 'left' | 'center' | 'right'
export type FieldType =
  | 'text'
  | 'number'
  | 'digit'
  | 'password'
  | 'textarea'
  | 'tel'
  | 'search'

export type FieldFormatTrigger = 'onChange' | 'onBlur'

export type FieldAutosizeConfig = { minRows?: number; maxRows?: number }

export type FieldTooltip = React.ReactNode | (DialogShowOptions & { icon?: React.ReactNode })

export interface FieldProps extends Omit<TextInputProps, 'style'> {
  label?: React.ReactNode
  labelStyle?: StyleProp<TextStyle>
  labelWidth?: number
  labelAlign?: 'left' | 'right'
  required?: boolean
  colon?: boolean
  errorMessage?: React.ReactNode
  description?: React.ReactNode
  intro?: React.ReactNode
  tooltip?: FieldTooltip
  error?: boolean
  clearable?: boolean
  clearTrigger?: FieldClearTrigger
  inputAlign?: FieldInputAlign
  controlAlign?: 'flex-start' | 'center' | 'flex-end'
  center?: boolean
  border?: boolean
  size?: CellSize
  clickable?: boolean
  isLink?: boolean
  arrowDirection?: CellArrowDirection
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  button?: React.ReactNode
  extra?: React.ReactNode
  type?: FieldType
  rows?: number
  autosize?: FieldAutosizeConfig | boolean
  autoSize?: FieldAutosizeConfig | boolean
  showWordLimit?: boolean
  formatter?: (value: string) => string
  formatTrigger?: FieldFormatTrigger
  clearIcon?: React.ReactNode
  onClear?: () => void
  onClick?: () => void
  onPress?: () => void
  onClickInput?: () => void
  onClickLeftIcon?: () => void
  onClickRightIcon?: () => void
  onOverlimit?: (value: string) => void
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  readOnly?: boolean
  disabled?: boolean
  androidRipple?: PressableProps['android_ripple']
}
