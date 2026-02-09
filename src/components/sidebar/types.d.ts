import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface SidebarTokens {
  defaults: {
    disabled: boolean
  }
  layout: {
    container: ViewStyle
    side: ViewStyle
    content: ViewStyle
    item: ViewStyle
    indicatorWrapper: ViewStyle
    itemContent: ViewStyle
    indicator: ViewStyle
    titleRow: ViewStyle
    badge: ViewStyle
    dot: ViewStyle
    title: TextStyle
  }
  colors: {
    background: string
    border: string
    title: string
    titleActive: string
    disabled: string
    indicator: string
  }
  typography: {
    fontFamily: string
    fontSize: number
    fontWeight: NonNullable<TextStyle['fontWeight']>
    contentFontSize: number
  }
  sizing: {
    width: number
    itemHeight: number
    indicatorWidth: number
  }
  borders: {
    width: number
  }
}

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
