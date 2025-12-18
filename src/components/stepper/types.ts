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
  /** 是否自动将输入值修正到 min/max 范围内（对齐 Vant：auto-fixed，默认 true） */
  autoFixed?: boolean
  /** 值变更前的拦截回调，返回 false 可阻止变更，支持 Promise（对齐 Vant：before-change） */
  beforeChange?: (value: number | null) => boolean | Promise<boolean>
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
