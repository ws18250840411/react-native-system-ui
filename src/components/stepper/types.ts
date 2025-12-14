import type React from 'react'
import type {
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'

export type StepperTheme = 'default' | 'round'

export interface StepperProps extends Omit<ViewProps, 'onChange'> {
  value?: number | null
  defaultValue?: number | null
  min?: number
  max?: number
  step?: number
  integer?: boolean
  decimalLength?: number | string
  disabled?: boolean
  disablePlus?: boolean
  disableMinus?: boolean
  disableInput?: boolean
  allowEmpty?: boolean
  showPlus?: boolean
  showMinus?: boolean
  showInput?: boolean
  longPress?: boolean
  theme?: StepperTheme
  inputWidth?: number | string
  buttonSize?: number | string
  name?: string
  placeholder?: string
  onClick?: (event: GestureResponderEvent) => void
  onChange?: (value: number | null, detail?: { name?: string }) => void
  onPlus?: (event: GestureResponderEvent, value: number | null) => void
  onMinus?: (event: GestureResponderEvent, value: number | null) => void
  onOverlimit?: (type: 'plus' | 'minus') => void
  onFocus?: TextInputProps['onFocus']
  onBlur?: TextInputProps['onBlur']
  inputProps?: TextInputProps
  inputStyle?: StyleProp<TextStyle>
  buttonStyle?: StyleProp<ViewStyle>
}

export interface StepperInstance {
  focus: () => void
  blur: () => void
}
