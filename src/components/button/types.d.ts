import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'

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
export type ButtonLoadingSize = number | 'small' | 'large'

export interface ButtonTokens {
  defaults: {
    type: ButtonType
    size: ButtonSize
    plain: boolean
    block: boolean
    round: boolean
    square: boolean
    hairline: boolean
    iconPosition: ButtonIconPosition
    mode: ButtonMode
    loading: boolean
    loadingType: ButtonLoadingType
    loadingSize: ButtonLoadingSize
    disabled: boolean
    autoInsertSpace: boolean
    uppercase: boolean
    allowFontScaling: boolean
  }
  layout: {
    base: ViewStyle
    block: ViewStyle
    content: ViewStyle
    iconWrapper: ViewStyle
    text: TextStyle
  }
  colors: {
    ripple: string
    backgroundTransparent: string
    backgroundPlain: string
    textDark: string
    textLight: string
    tones: Record<
      ButtonType,
      {
        background: string
        border: string
        text: string
        tonalBackground: string
        tonalBorder: string
        tonalText: string
      }
    >
  }
  typography: {
    fontFamily: string
    lineHeightMultiplier: number
    fontWeight: TextStyle['fontWeight']
  }
  sizing: {
    sizes: Record<
      ButtonSize,
      {
        height: number
        fontSize: number
        paddingHorizontal: number
        iconSize: number
        radius: number
      }
    >
  }
  borders: {
    width: number
    hairlineWidth: number
  }
  spacing: {
    iconGap: number
    groupGap: number
  }
  states: {
    disabledOpacity: number
    loadingOpacity: number
    pressedOpacity: number
  }
  shadows: Record<
    ButtonShadowLevel,
    {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  >
}

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
  loadingSize?: ButtonLoadingSize
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
