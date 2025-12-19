import type * as React from 'react'

import type { PopupProps } from '../popup/Popup'

export interface ShareSheetOption {
  key?: React.Key
  name: React.ReactNode
  icon: React.ReactNode
  description?: React.ReactNode
  onPress?: (option: ShareSheetOption) => void
}

export type ShareSheetOptions = ShareSheetOption[] | ShareSheetOption[][]

export interface ShareSheetProps extends Omit<PopupProps, 'children'> {
  visible: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  cancelText?: React.ReactNode
  options?: ShareSheetOptions
  columns?: number
  closeOnSelect?: boolean
  safeAreaInsetBottom?: boolean
  children?: React.ReactNode
  onSelect?: (option: ShareSheetOption, index: number) => void
  onCancel?: () => void
}
