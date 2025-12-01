import type * as React from 'react'

import type { PopupProps } from '../popup/Popup'

export interface ActionSheetAction {
  key?: React.Key
  name: React.ReactNode
  subname?: React.ReactNode
  color?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  onPress?: (action: ActionSheetAction) => void
}

export interface ActionSheetProps extends Omit<PopupProps, 'children'> {
  title?: React.ReactNode
  description?: React.ReactNode
  cancelText?: React.ReactNode
  actions?: ActionSheetAction[]
  closeOnSelect?: boolean
  children?: React.ReactNode
  onSelect?: (action: ActionSheetAction, index: number) => void
  onCancel?: () => void
}
