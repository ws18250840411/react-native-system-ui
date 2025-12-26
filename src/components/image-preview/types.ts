import React from 'react'
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

import type { PopupCloseIconPosition } from '../popup'

export type ImagePreviewCloseReason = 'overlay' | 'close-icon' | 'content' | 'close'

export type ImagePreviewImage = ImageSourcePropType | string

export interface ImagePreviewProps {
  visible: boolean
  images?: ImagePreviewImage[]
  startPosition?: number
  /** 图片切换动画时长（ms），内部透传给 Swiper.duration */
  swipeDuration?: number
  /**
   * 按需渲染图片（性能优化）：仅渲染当前页及其附近的图片，降低内存和首屏压力
   * - `false`: 渲染全部（默认）
   * - `true`: 仅渲染当前页 ± `lazyRenderBuffer`
   */
  lazyRender?: boolean
  /** `lazyRender` 开启时，额外渲染的前后页数量 */
  lazyRenderBuffer?: number
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

export type ImagePreviewOpenOptions = Omit<ImagePreviewProps, 'visible'>

export type ImagePreviewDestroy = () => void

export interface ImagePreviewStatic {
  Host: React.ComponentType<any>
  open: (options: ImagePreviewOpenOptions) => ImagePreviewDestroy
  clear: () => void
}
