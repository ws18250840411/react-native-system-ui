import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface ProgressTokens {
  defaults: {
    percentage: number
    inactive: boolean
    showPivot: boolean
    transition: boolean
    animationDuration: number
  }
  layout: {
    track: ViewStyle
    indicator: ViewStyle
    pivot: ViewStyle
    pivotText: TextStyle
  }
  colors: {
    track: string
    indicator: string
    pivotText: string
  }
  typography: {
    pivotFontSize: number
  }
  sizing: {
    height: number
    pivotPaddingHorizontal: number
    pivotPaddingVertical: number
  }
}

export interface ProgressProps extends ViewProps {
  percentage?: number | string
  strokeWidth?: number | string
  color?: string
  trackColor?: string
  pivotText?: React.ReactNode
  pivotColor?: string
  textColor?: string
  inactive?: boolean
  showPivot?: boolean
  orientation?: 'horizontal' | 'vertical'
  
  animated?: boolean
  transition?: boolean
  animationDuration?: number
  tokensOverride?: DeepPartial<ProgressTokens>
  style?: StyleProp<ViewStyle>
  pivotStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
}
