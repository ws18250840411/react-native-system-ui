import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps extends Omit<PressableProps, 'style'> {
  src?: string | ImageSourcePropType
  icon?: React.ReactNode
  text?: string
  size?: AvatarSize | number
  width?: number
  height?: number
  shape?: AvatarShape
  color?: string
  backgroundColor?: string
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
}
