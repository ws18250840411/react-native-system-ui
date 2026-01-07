import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'

import type { DeepPartial } from '../../types'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarTokens {
  defaults: {
    size: AvatarSize
    shape: AvatarShape
  }
  sizing: {
    sizes: Record<AvatarSize, number>
    iconMaxSize: number
  }
  colors: {
    background: string
    text: string
  }
  typography: {
    fontWeight: TextStyle['fontWeight']
    fallbackTextScale: number
  }
  radii: {
    squareMin: number
    squareDivisor: number
  }
}

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
  tokensOverride?: DeepPartial<AvatarTokens>
}
