import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type EmptyImage = 'default' | 'error' | 'network' | 'search'

export interface EmptyTokens {
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionMargin: number
    descriptionPaddingHorizontal: number
    footerMargin: number
  }
  colors: {
    description: string
    icon: string
  }
  sizes: {
    image: number
  }
  typography: {
    descriptionSize: number
    descriptionLineHeight: number
    descriptionFontFamily: string
    descriptionFontWeight: TextStyle['fontWeight']
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
