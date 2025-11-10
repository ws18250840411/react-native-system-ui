import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type LoadingType = 'circular' | 'spinner'

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
}
