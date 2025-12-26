import type React from 'react'
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native'

export type CellArrowDirection = 'left' | 'right' | 'up' | 'down'
export type CellSize = 'normal' | 'large'

export interface CellProps extends Omit<PressableProps, 'style' | 'children'> {
  title?: React.ReactNode
  value?: React.ReactNode
  label?: React.ReactNode
  extra?: React.ReactNode
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  border?: boolean
  clickable?: boolean
  isLink?: boolean
  required?: boolean
  center?: boolean
  size?: CellSize
  arrowDirection?: CellArrowDirection
  children?: React.ReactNode
  titleStyle?: StyleProp<TextStyle>
  valueStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
}

export interface CellGroupProps {
  children?: React.ReactNode
  title?: React.ReactNode
  border?: boolean
  inset?: boolean
  card?: boolean
  style?: StyleProp<ViewStyle>
  bodyStyle?: StyleProp<ViewStyle>
}
