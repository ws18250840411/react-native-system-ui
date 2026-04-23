import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface WaterMarkTokens {
  defaults: {
    content: string
    width: number
    height: number
    gapX: number
    gapY: number
    rotate: number
    fontSize: number
    opacity: number
    zIndex: number
    fullPage: boolean
  }
  layout: {
    absoluteFill: ViewStyle
    wrapper: ViewStyle
    row: ViewStyle
    cell: ViewStyle
    mark: ViewStyle
  }
  colors: {
    mark: string
  }
}

export interface WaterMarkImage {
  src: string
  width: number
  height: number
}

export interface WaterMarkFont {
  color?: string
  size?: number | string
  family?: string
  weight?: TextStyle['fontWeight']
}

export interface WaterMarkProps extends ViewProps {
  content?: string
  width?: number
  height?: number
  gapX?: number
  gapY?: number
  rotate?: number
  image?: WaterMarkImage
  font?: WaterMarkFont
  fontSize?: number
  color?: string
  opacity?: number
  zIndex?: number
  fullPage?: boolean
  tokensOverride?: DeepPartial<WaterMarkTokens>
  onLayoutCalculated?: (size: { width: number; height: number }) => void
  textStyle?: StyleProp<TextStyle>
}
