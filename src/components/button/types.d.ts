import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import type { ButtonTokens } from './tokens'

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonShadowLevel = 1 | 2 | 3
export type ButtonMode = 'contained' | 'text' | 'outlined' | 'contained-tonal' | 'elevated'

export type ButtonIconRender = (
  color: string,
  size: number
) => React.ReactNode

export type ButtonLoadingType = 'circular' | 'spinner'

export interface ButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  text?: React.ReactNode
  children?: React.ReactNode
  icon?: React.ReactNode | ButtonIconRender
  iconPosition?: ButtonIconPosition
  type?: ButtonType
  size?: ButtonSize
  color?: string
  textColor?: string
  plain?: boolean
  block?: boolean
  round?: boolean
  square?: boolean
  hairline?: boolean
  shadow?: boolean | ButtonShadowLevel
  loading?: boolean
  loadingText?: React.ReactNode
  loadingIndicator?: React.ReactNode
  loadingType?: ButtonLoadingType
  loadingSize?: number | 'small' | 'large'
  disabled?: boolean
  autoInsertSpace?: boolean
  mode?: ButtonMode
  uppercase?: boolean
  buttonColor?: string
  dark?: boolean
  contentStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<ButtonTokens>
  style?: StyleProp<ViewStyle>
  rippleColor?: string
  allowFontScaling?: boolean
  maxFontSizeMultiplier?: number
}
