import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type EmptyImage = 'default' | 'error' | 'network' | 'search'

export interface EmptyTokens {
  defaults: {
    image: EmptyImage
    gap: number
  }
  layout: {
    container: ViewStyle
    imageWrapper: ViewStyle
    descriptionText: TextStyle
    footer: ViewStyle
  }
  colors: {
    description: string
    icon: string
    imageBackground: string
  }
  typography: {
    descriptionSize: number
    descriptionLineHeight: number
    descriptionFontFamily: string
    descriptionFontWeight: TextStyle['fontWeight']
  }
  sizing: {
    image: number
    iconScale: number
  }
  spacing: {
    descriptionPaddingHorizontal: number
    footerMarginTop: number
  }
}

export interface EmptyProps extends ViewProps {
  image?: EmptyImage | string | React.ReactNode
  imageSize?: number
  imageStyle?: StyleProp<ViewStyle>
  description?: React.ReactNode
  descriptionStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  gap?: number
  tokensOverride?: DeepPartial<EmptyTokens>
}
