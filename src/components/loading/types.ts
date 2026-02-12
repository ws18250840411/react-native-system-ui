import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface LoadingTokens {
  defaults: {
    size: number
    textSize: number
    vertical: boolean
  }
  layout: {
    container: ViewStyle
    text: TextStyle
  }
  colors: {
    indicator: string
    text: string
  }
  spacing: {
    gap: number
  }
}

export interface LoadingProps extends ViewProps {
  
  ['aria-label']?: string
  color?: string
  size?: number
  textSize?: number
  textColor?: string
  vertical?: boolean
  children?: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  tokensOverride?: DeepPartial<LoadingTokens>
}
