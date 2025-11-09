import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

import type {
  ButtonIconPosition,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
} from './tokens'

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
  disabled?: boolean
  autoInsertSpace?: boolean
  contentStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
}
