import React, { useCallback } from 'react'
import { createImperativePortalRegistry, type ImperativePortalRenderProps } from '../../internal/imperativePortal'
import ImagePreview from './ImagePreview'
import type { CloseParams, ImagePreviewDestroy, ImagePreviewOpenOptions } from './types'

const ImagePreviewPortal: React.FC<ImperativePortalRenderProps<ImagePreviewOpenOptions>> = ({ options, visible, close, remove }) => {
  const handleClose = useCallback((params: CloseParams) => { options.onClose?.(params); close() }, [close, options])
  const handleClosed = useCallback(() => { options.onClosed?.(); remove() }, [options, remove])
  return <ImagePreview {...options} visible={visible} onClose={handleClose} onClosed={handleClosed} />
}
const imagePreviewRegistry = createImperativePortalRegistry<ImagePreviewOpenOptions>(props => <ImagePreviewPortal {...props} />)

export const ImagePreviewImperative = {
  open: (options: ImagePreviewOpenOptions = {}): ImagePreviewDestroy => {
    imagePreviewRegistry.clear()
    const key = imagePreviewRegistry.mount(options)
    return () => imagePreviewRegistry.close(key)
  },
  clear: () => { imagePreviewRegistry.clear() },
}
