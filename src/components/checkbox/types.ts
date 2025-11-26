import type React from 'react'
import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type CheckboxShape = 'round' | 'square'
export type CheckboxLabelPosition = 'left' | 'right'
export type CheckboxGroupDirection = 'horizontal' | 'vertical'
export type CheckboxValue = string | number

export interface CheckboxProps extends Omit<PressableProps, 'onPress'> {
  name?: CheckboxValue
  value?: CheckboxValue
  shape?: CheckboxShape
  iconSize?: number
  checkedColor?: string
  labelPosition?: CheckboxLabelPosition
  labelDisabled?: boolean
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export interface CheckboxGroupProps extends ViewProps {
  value?: CheckboxValue[]
  defaultValue?: CheckboxValue[]
  disabled?: boolean
  max?: number
  direction?: CheckboxGroupDirection
  shape?: CheckboxShape
  iconSize?: number
  checkedColor?: string
  labelDisabled?: boolean
  gap?: number
  onChange?: (value: CheckboxValue[]) => void
  children?: React.ReactNode
}
