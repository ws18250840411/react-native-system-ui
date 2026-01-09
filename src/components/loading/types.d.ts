import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type LoadingType = 'circular' | 'spinner'

export interface LoadingTokens {
  defaults: {
    type: LoadingType
    size: number
    textSize: number
    vertical: boolean
  }
  layout: {
    container: ViewStyle
    spinnerItem: ViewStyle
    text: TextStyle
  }
  colors: {
    indicator: string
    text: string
  }
  sizing: {
    spinner: {
      lineWidth: number
      lineLength: number
      itemCount: number
      innerGapRatio: number
    }
  }
  spacing: {
    gap: number
  }
}

export interface LoadingProps extends ViewProps {
  color?: string
  size?: number
  textSize?: number
  textColor?: string
  type?: LoadingType
  vertical?: boolean
  children?: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  tokensOverride?: DeepPartial<LoadingTokens>
}
