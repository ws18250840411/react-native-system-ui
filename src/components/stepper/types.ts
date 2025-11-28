import type React from 'react'
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'

export type StepperSize = 'small' | 'medium'
export type StepperTheme = 'default' | 'round'

export interface StepperProps extends Omit<ViewProps, 'onChange'> {
  value?: number | null
  defaultValue?: number | null
  min?: number
  max?: number
  step?: number
  integer?: boolean
  decimalLength?: number
  disabled?: boolean
  disablePlus?: boolean
  disableMinus?: boolean
  disableInput?: boolean
  allowEmpty?: boolean
  showPlus?: boolean
  showMinus?: boolean
  showInput?: boolean
  longPress?: boolean
  size?: StepperSize
  theme?: StepperTheme
  inputWidth?: number
  buttonSize?: number
  name?: string
  onChange?: (value: number | null) => void
  onPlus?: (value: number | null) => void
  onMinus?: (value: number | null) => void
  onOverlimit?: (type: 'plus' | 'minus') => void
  onFocus?: (value: number | null) => void
  onBlur?: (value: number | null) => void
  inputProps?: TextInputProps
  inputStyle?: StyleProp<TextStyle>
  buttonStyle?: StyleProp<ViewStyle>
}
