import type * as React from 'react'
import type { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { BadgeProps } from '../badge/types'

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
  onChange?: (name: T, index: number) => void
}

export interface TabbarItemProps<T = TabbarValue> extends ViewProps {
  name?: T
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode)
  /**
   * 徽标内容：
   * - 传入 number/string：内部会自动渲染 <Badge content={...} />
   * - 传入 BadgeProps：渲染 <Badge {...props} />
   * - 传入 ReactElement：直接渲染该节点
   */
  badge?: BadgeProps | React.ReactNode
  dot?: boolean
  onClick?: () => void
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode | ((active: boolean) => React.ReactNode)
  disabled?: boolean
  testID?: string
  /** @private */
  index?: number
  /** @private */
  iconSize?: number
}
