import type * as React from 'react'
import type { ImageProps as RNImageProps, ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

export interface ImageTokens {
  defaults: {
    fit: ImageFit
    showLoading: boolean
    showError: boolean
    loadingText: React.ReactNode
    errorText: React.ReactNode
    iconSize: number
    loadingIndicatorBaseSize: number
    loadingLabelMarginTop: number
    roundRadius: number
  }
  layout: {
    container: ViewStyle
    overlay: ViewStyle
    label: TextStyle
    iconContainer: ViewStyle
    absoluteFill: ViewStyle
  }
  colors: {
    background: string
    text: string
    error: string
  }
}

export interface ImageProps extends Omit<RNImageProps, 'source' | 'width' | 'height'> {
  src?: string
  source?: ImageSourcePropType
  width?: number | string
  height?: number | string
  radius?: number
  round?: boolean
  fit?: ImageFit
  showLoading?: boolean
  showError?: boolean
  loadingText?: React.ReactNode
  loadingIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  iconSize?: number
  loadingSize?: 'small' | 'large' | number
  errorText?: React.ReactNode
  fallback?: React.ReactNode
  onPress?: (event: any) => void
  alt?: string
  containerStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  tokensOverride?: DeepPartial<ImageTokens>
}
