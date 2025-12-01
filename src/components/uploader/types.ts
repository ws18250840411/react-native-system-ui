import type { ImageSourcePropType, ViewProps } from 'react-native'
import React from 'react'

import type { ImageFit } from '../image'
import type { ImagePreviewProps } from '../image-preview'

export type UploaderItemStatus = 'pending' | 'failed'

export interface UploaderValueItem {
  key?: string | number
  url?: string
  thumbnail?: string
  source?: ImageSourcePropType
  status?: UploaderItemStatus
  message?: string
  [key: string]: any
}

export interface UploaderProps extends ViewProps {
  value?: UploaderValueItem[]
  defaultValue?: UploaderValueItem[]
  maxCount?: number
  previewSize?: number | string
  imageFit?: ImageFit
  previewImage?: boolean
  previewFullImage?: boolean
  previewOptions?: Omit<ImagePreviewProps, 'visible' | 'images'>
  previewCoverRender?: (item: UploaderValueItem) => React.ReactNode
  showUpload?: boolean
  uploadText?: string
  uploadIcon?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  deletable?: boolean
  statusTextRender?: (status: UploaderItemStatus, item: UploaderValueItem) => React.ReactNode
  children?: React.ReactNode
  onUpload?: () => Promise<UploaderValueItem | UploaderValueItem[] | void> | UploaderValueItem | UploaderValueItem[] | void
  onChange?: (items: UploaderValueItem[]) => void
  onDelete?: (item: UploaderValueItem, index: number) => boolean | Promise<boolean> | void
  onClickPreview?: (item: UploaderValueItem, index: number) => void
  onClosePreview?: () => void
  onClickUpload?: () => void
}
