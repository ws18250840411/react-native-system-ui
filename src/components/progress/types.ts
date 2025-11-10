import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export interface ProgressProps extends ViewProps {
  percentage?: number | string
  strokeWidth?: number
  color?: string
  trackColor?: string
  pivotText?: React.ReactNode
  pivotColor?: string
  textColor?: string
  inactive?: boolean
  showPivot?: boolean
  style?: StyleProp<ViewStyle>
  pivotStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
}
