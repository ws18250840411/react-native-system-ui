import type * as React from 'react'
import type { ImageProps as RNImageProps, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

export interface ImageProps extends Omit<RNImageProps, 'source'> {
  src?: string
  source?: ImageSourcePropType
  width?: number
  height?: number
  radius?: number
  round?: boolean
  fit?: ImageFit
  showLoading?: boolean
  showError?: boolean
  loadingText?: React.ReactNode
  errorText?: React.ReactNode
  fallback?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
}
