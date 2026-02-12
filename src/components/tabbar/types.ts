import type * as React from 'react'
import type { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { BadgeProps } from '../badge/types'
import type { DeepPartial } from '../../types'
import type { TabbarTokens } from './tokens'

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
  tokensOverride?: DeepPartial<TabbarTokens>
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  onChange?: (name: T, index: number) => void
}

export interface TabbarItemProps<T = TabbarValue> extends Omit<ViewProps, 'children'> {
  name?: T
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode)
  
  badge?: BadgeProps | React.ReactNode
  dot?: boolean
  onClick?: () => void
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode | ((active: boolean) => React.ReactNode)
  disabled?: boolean
  testID?: string
  tokensOverride?: DeepPartial<TabbarTokens>
  
  index?: number
  
  iconSize?: number
}
