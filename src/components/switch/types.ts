import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from 'react-native'

export interface SwitchProps extends Omit<ViewProps, 'onChange'> {
  checked?: any
  defaultChecked?: any
  disabled?: boolean
  loading?: boolean
  size?: number | string
  activeColor?: string
  inactiveColor?: string
  activeValue?: any
  inactiveValue?: any
  onChange?: (val: any) => void
  onClick?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
}
