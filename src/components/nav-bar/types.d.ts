import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface NavBarTokens {
  defaults: {
    fixed: boolean
    placeholder: boolean
    border: boolean
    safeAreaInsetTop: boolean
    leftArrow: boolean
    zIndex: number
  }
  layout: {
    container: ViewStyle
    bar: ViewStyle
    center: ViewStyle
    side: ViewStyle
    rightAlign: ViewStyle
    sidePlaceholder: ViewStyle
    titleWrapper: ViewStyle
    title: TextStyle
    description: TextStyle
    sideText: TextStyle
    fixed: ViewStyle
  }
  colors: {
    background: string
    text: string
    description: string
    border: string
    icon: string
  }
  typography: {
    titleSize: number
    titleWeight: string | number
    descriptionSize: number
  }
  sizing: {
    height: number
  }
}

export interface NavBarProps extends Omit<ViewProps, 'children'> {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  leftText?: React.ReactNode
  rightText?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftArrow?: boolean | React.ReactNode
  fixed?: boolean
  placeholder?: boolean
  zIndex?: number
  border?: boolean
  safeAreaInsetTop?: boolean
  background?: string
  tintColor?: string
  tokensOverride?: DeepPartial<NavBarTokens>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  sideStyle?: StyleProp<ViewStyle>
  onPressLeft?: () => void
  onClickLeft?: () => void
  onPressRight?: () => void
  onClickRight?: () => void
}
