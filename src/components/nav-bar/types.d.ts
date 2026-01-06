import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { NavBarTokens } from './tokens'

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
