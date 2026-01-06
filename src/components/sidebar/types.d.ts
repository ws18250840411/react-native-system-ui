import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { SidebarTokens } from './tokens'

export interface SidebarProps extends Omit<ViewProps, 'children'> {
  value?: number
  defaultValue?: number
  sideStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onChange?: (value: number) => void
  tokensOverride?: DeepPartial<SidebarTokens>
}

export interface SidebarItemProps extends ViewProps {
  title?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  dot?: boolean
  onClick?: (value: number) => void
  textStyle?: StyleProp<TextStyle>
  badgeStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  index?: number
  tokensOverride?: DeepPartial<SidebarTokens>
}
