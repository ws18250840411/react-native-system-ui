import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type SwitchSize = 'small' | 'medium'

export interface SwitchProps extends Omit<ViewProps, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  loading?: boolean
  size?: SwitchSize
  activeColor?: string
  inactiveColor?: string
  label?: React.ReactNode
  labelPosition?: 'left' | 'right'
  onChange?: (checked: boolean) => void
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
}
