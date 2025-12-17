import type React from 'react'

import type {
  ImagePreviewProps,
  ImagePreviewRef,
  ImagePreviewStatic,
  ImagePreviewOpenOptions,
  ImagePreviewDestroy,
  CloseParams as ImagePreviewCloseParams,
} from './types'
import ImagePreviewBase from './ImagePreview'
import { PortalHost } from '../portal'
import { ImagePreviewImperative } from './imperative'

const ImagePreviewWithStatics = Object.assign(ImagePreviewBase, {
  Host: PortalHost,
  open: ImagePreviewImperative.open,
  clear: ImagePreviewImperative.clear,
}) as React.FC<ImagePreviewProps> & ImagePreviewStatic

const ImagePreview = ImagePreviewWithStatics

export default ImagePreview
export { ImagePreview }
export type {
  ImagePreviewProps,
  ImagePreviewRef,
  ImagePreviewOpenOptions,
  ImagePreviewDestroy,
  ImagePreviewCloseParams,
}
