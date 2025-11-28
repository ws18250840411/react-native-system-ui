import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export interface RateProps extends Omit<ViewProps, 'onChange'> {
  value?: number
  defaultValue?: number
  count?: number
  allowHalf?: boolean
  size?: number
  gutter?: number
  color?: string
  voidColor?: string
  disabledColor?: string
  icon?: React.ReactNode
  voidIcon?: React.ReactNode
  character?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  touchable?: boolean
  onChange?: (value: number) => void
  onIconPress?: (value: number) => void
  iconStyle?: StyleProp<TextStyle>
  itemStyle?: StyleProp<ViewStyle>
}
