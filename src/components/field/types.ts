import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import type { FieldTokens } from './tokens'
import type { DialogShowOptions } from '../dialog/types'
import type { CellArrowDirection, CellGroupProps, CellSize } from '../cell/types'

export type FieldType =
  | 'tel'
  | 'text'
  | 'digit'
  | 'number'
  | 'search'
  | 'password'
  | 'textarea'

export type FieldInputAlign = 'left' | 'center' | 'right'

export type FieldControlAlign = 'left' | 'center' | 'right'

export type FieldClearTrigger = 'always' | 'focus'

export type FieldFormatTrigger = 'onBlur' | 'onChange'

export type FieldAutosizeConfig = {
  maxRows?: number
  minRows?: number
}

export type FieldTooltipProps = DialogShowOptions & {
  icon?: React.ReactNode
}

export type FieldShowWordLimit =
  | boolean
  | ((params: { currentCount: number; maxLength?: number }) => React.ReactNode)

export interface FieldProps
  extends Omit<TextInputProps, 'style' | 'value' | 'defaultValue' | 'editable' | 'onChange' | 'onChangeText'> {
  label?: React.ReactNode
  labelWidth?: number
  labelAlign?: FieldInputAlign
  inputAlign?: FieldInputAlign
  controlAlign?: FieldControlAlign
  required?: boolean
  colon?: boolean
  intro?: React.ReactNode
  description?: React.ReactNode
  tooltip?: React.ReactNode | FieldTooltipProps
  error?: boolean
  errorMessage?: React.ReactNode
  errorMessageAlign?: FieldInputAlign
  errorMessagePosition?: 'inner' | 'outer'
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  clearTrigger?: FieldClearTrigger
  clearIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  button?: React.ReactNode
  extra?: React.ReactNode
  value?: string
  defaultValue?: string
  type?: FieldType
  rows?: number
  autoSize?: boolean | FieldAutosizeConfig
  formatter?: (value: string) => string
  formatTrigger?: FieldFormatTrigger
  showWordLimit?: FieldShowWordLimit
  onOverlimit?: (value: string) => void
  onChangeText?: (value: string) => void
  onClear?: () => void
  onClick?: () => void
  onClickInput?: () => void
  onClickLeftIcon?: () => void
  onClickRightIcon?: () => void
  border?: boolean
  center?: boolean
  clickable?: boolean
  isLink?: boolean
  arrowDirection?: CellArrowDirection
  size?: CellSize
  titleStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  introStyle?: StyleProp<TextStyle>
  errorMessageStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<FieldTokens>
  style?: StyleProp<ViewStyle>
  androidRipple?: PressableProps['android_ripple']
  children?: React.ReactNode
}

export interface FieldInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  nativeElement: TextInput | null
}

export type FieldGroupProps = CellGroupProps
