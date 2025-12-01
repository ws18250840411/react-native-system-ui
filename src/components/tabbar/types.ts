import type * as React from 'react'
import type { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type TabbarValue = string | number

export interface TabbarProps<T = TabbarValue> extends Omit<ViewProps, 'children'> {
  children?: React.ReactNode
  value?: T
  defaultValue?: T
  fixed?: boolean
  border?: boolean
  zIndex?: number
  activeColor?: string
  inactiveColor?: string
  background?: string
  placeholder?: boolean
  safeAreaInsetBottom?: boolean
  iconSize?: number
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  onChange?: (name: T) => void
}

export interface TabbarItemProps<T = TabbarValue> extends ViewProps {
  name?: T
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode)
  badge?: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode | ((active: boolean) => React.ReactNode)
  disabled?: boolean
  testID?: string
  /** @private */
  index?: number
}
