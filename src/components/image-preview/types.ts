import React from 'react'
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

import type { PopupCloseIconPosition } from '../popup'

export type ImagePreviewCloseReason = 'overlay' | 'close-icon' | 'content' | 'close'

export type ImagePreviewImage = ImageSourcePropType | string

export interface ImagePreviewProps {
  visible: boolean
  images?: ImagePreviewImage[]
  startPosition?: number
  showIndex?: boolean
  indexRender?: (ctx: { index: number; len: number }) => React.ReactNode
  showIndicators?: boolean
  closeable?: boolean
  closeIcon?: React.ReactNode
  closeIconPosition?: PopupCloseIconPosition
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnBackPress?: boolean
  closeOnPopstate?: boolean
  zIndex?: number
  duration?: number
  closeOnlyClickCloseIcon?: boolean
  onChange?: (index: number) => void
  onClose?: (params: CloseParams) => void
  onClosed?: () => void
  beforeClose?: (context: CloseContext) => boolean | Promise<boolean>
}

export interface CloseParams {
  index: number
  image?: ImagePreviewImage
}

export interface CloseContext extends CloseParams {
  reason: ImagePreviewCloseReason
}

export type ImagePreviewRef = {
  swipeTo: (index: number, animated?: boolean) => void
}
