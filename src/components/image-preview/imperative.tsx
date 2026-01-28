import React, { useCallback, useEffect, useState } from 'react'

import Portal from '../portal/Portal'
import ImagePreview from './ImagePreview'
import type { CloseParams, ImagePreviewDestroy, ImagePreviewOpenOptions } from './types'

const activeKeys = new Set<number>()
const closers = new Map<number, () => void>()

const removeInstance = (key: number) => {
  Portal.remove(key)
  activeKeys.delete(key)
  closers.delete(key)
}

const requestClose = (key: number) => {
  const close = closers.get(key)
  if (close) {
    close()
    return
  }
  removeInstance(key)
}

interface ImagePreviewPortalProps {
  id: number
  options: ImagePreviewOpenOptions
}

const ImagePreviewPortal: React.FC<ImagePreviewPortalProps> = ({ id, options }) => {
  const [visible, setVisible] = useState(true)

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    closers.set(id, close)
    return () => {
      const current = closers.get(id)
      if (current === close) {
        closers.delete(id)
      }
    }
  }, [close, id])

  const handleClose = useCallback(
    (params: CloseParams) => {
      options.onClose?.(params)
      setVisible(false)
    },
    [options],
  )

  const handleClosed = useCallback(() => {
    options.onClosed?.()
    removeInstance(id)
  }, [id, options])

  return (
    <ImagePreview
      {...options}
      visible={visible}
      onClose={handleClose}
      onClosed={handleClosed}
    />
  )
}

export const ImagePreviewImperative = {
  open: (options: ImagePreviewOpenOptions = {}): ImagePreviewDestroy => {
    activeKeys.forEach(key => requestClose(key))
    activeKeys.clear()

    const key = Portal.add(null)
    activeKeys.add(key)
    Portal.update(key, <ImagePreviewPortal id={key} options={options} />)

    return () => requestClose(key)
  },
  clear: () => {
    activeKeys.forEach(key => requestClose(key))
    activeKeys.clear()
  },
}
