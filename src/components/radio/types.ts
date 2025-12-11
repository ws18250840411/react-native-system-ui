import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type RadioValue = string | number
export type RadioLabelPosition = 'left' | 'right'
export type RadioGroupDirection = 'horizontal' | 'vertical'
export type RadioShape = 'round' | 'square'

export interface RadioProps extends Omit<ViewProps, 'children'> {
  name?: RadioValue
  value?: RadioValue
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  iconSize?: number | string
  checkedColor?: string
  shape?: RadioShape
  labelPosition?: RadioLabelPosition
  labelDisabled?: boolean
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export interface RadioGroupProps extends ViewProps {
  value?: RadioValue
  defaultValue?: RadioValue
  onChange?: (value: RadioValue) => void
  disabled?: boolean
  direction?: RadioGroupDirection
  iconSize?: number | string
  checkedColor?: string
  labelDisabled?: boolean
  gap?: number
  name?: string
  children?: React.ReactNode
}
