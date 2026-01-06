import type { GestureResponderEvent, ImageSourcePropType, ViewProps } from 'react-native'
import React from 'react'

import type { DeepPartial } from '../../types'
import type { ImageFit } from '../image'
import type { ImagePreviewProps } from '../image-preview'
import type { UploaderTokens } from './tokens'

export type UploaderItemStatus = 'pending' | 'failed'

export type UploaderResultType = 'dataUrl' | 'text' | 'file'

export type UploaderFile = {
  name?: string
  type?: string
  size?: number
  [key: string]: any
}

type BivariantCallback<T extends (...args: any[]) => any> = { bivarianceHack: T }['bivarianceHack']

export type UploaderMaxSize =
  | number
  | string
  | BivariantCallback<(file: UploaderFile) => boolean>

export type UploaderBeforeRead = BivariantCallback<
  (
    file: UploaderFile,
    files: UploaderFile[],
  ) => Promise<UploaderFile | false | undefined> | UploaderFile | false | undefined
>

export type UploaderInstance = {
  chooseFile: () => void
  closeImagePreview: () => void
}

export interface UploaderValueItem {
  key?: string | number
  url?: string
  thumbnail?: string
  source?: ImageSourcePropType
  file?: UploaderFile
  status?: UploaderItemStatus
  message?: string
  [key: string]: any
}

export interface UploaderProps extends ViewProps {
  value?: UploaderValueItem[]
  defaultValue?: UploaderValueItem[]
  tokensOverride?: DeepPartial<UploaderTokens>
  accept?: string
  name?: number | string
  isImageUrl?: (file: UploaderValueItem) => boolean
  multiple?: boolean
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
  deleteRender?: (del: () => void) => React.ReactNode
  capture?: string
  maxSize?: UploaderMaxSize
  maxCount?: number | string
  resultType?: UploaderResultType
  statusTextRender?: (status: UploaderItemStatus) => React.ReactNode
  children?: React.ReactNode
  beforeRead?: UploaderBeforeRead
  onOversize?: BivariantCallback<(files: UploaderFile[]) => void>
  onClickUpload?: (event: GestureResponderEvent) => void
  onUpload?: () =>
    | Promise<UploaderValueItem | UploaderValueItem[] | void>
    | UploaderValueItem
    | UploaderValueItem[]
    | void
  upload?: BivariantCallback<(file: UploaderFile) => Promise<UploaderValueItem>>
  onChange?: (items: UploaderValueItem[]) => void
  onDelete?: (item: UploaderValueItem) => boolean | Promise<boolean> | void
  onClickPreview?: (item: UploaderValueItem, index: number) => void
  onClosePreview?: () => void
}
