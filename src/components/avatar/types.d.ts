import type React from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'

export type AvatarShape = 'circle' | 'square'
export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarTokens {
  defaults: {
    size: AvatarSize
    shape: AvatarShape
  }
  layout: {
    container: ViewStyle
    text: TextStyle
    image: ImageStyle
    iconWrapper: ViewStyle
  }
  colors: {
    background: string
    text: string
  }
  typography: {
    fontWeight: TextStyle['fontWeight']
    fallbackTextScale: number
  }
  sizing: {
    sizes: Record<AvatarSize, number>
    iconMaxSize: number
    loadingSize: number
  }
  radii: {
    squareMin: number
    squareDivisor: number
  }
}

import type { ImageFit } from '../image/types'

export interface AvatarProps extends Omit<PressableProps, 'style'> {
  src?: string
  source?: ImageSourcePropType
  fit?: ImageFit
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
