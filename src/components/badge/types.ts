import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type BadgeOffset = [number | string, number | string]

export interface BadgeProps extends ViewProps {
  children?: React.ReactNode
  content?: React.ReactNode
  color?: string
  textColor?: string
  dot?: boolean
  max?: number | string
  offset?: BadgeOffset
  showZero?: boolean
  badgeStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: PressableProps['onPress']
}
