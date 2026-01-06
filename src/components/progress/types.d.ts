import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { ProgressTokens } from './tokens'

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
  /** @deprecated use `transition` instead */
  animated?: boolean
  transition?: boolean
  animationDuration?: number
  tokensOverride?: DeepPartial<ProgressTokens>
  style?: StyleProp<ViewStyle>
  pivotStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
}
