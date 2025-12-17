import type { StyleProp, TextStyle, ViewProps } from 'react-native'

export interface WaterMarkProps extends ViewProps {
  content?: string
  gapX?: number
  gapY?: number
  rotate?: number
  fontSize?: number
  color?: string
  opacity?: number
  zIndex?: number
  fullPage?: boolean
  onLayoutCalculated?: (size: { width: number; height: number }) => void
  textStyle?: StyleProp<TextStyle>
}
