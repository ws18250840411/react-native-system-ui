import type * as React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { PopupProps } from '../popup/Popup'

export type ActionSheetCloseAction = 'action' | 'cancel' | 'close' | 'close-icon' | 'overlay'

export interface ActionSheetAction {
  key?: React.Key
  name?: React.ReactNode
  subname?: React.ReactNode
  color?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: (action: ActionSheetAction) => void
  /** 对齐 Vant：callback */
  callback?: (action: ActionSheetAction) => void
}

export interface ActionSheetProps extends Omit<PopupProps, 'children'> {
  title?: React.ReactNode
  description?: React.ReactNode
  cancelText?: React.ReactNode
  actions?: ActionSheetAction[]
  /** 是否在点击选项后自动关闭（对齐 Vant：close-on-click-action，默认 false） */
  closeOnClickAction?: boolean
  /** @deprecated 请使用 closeOnClickAction */
  closeOnSelect?: boolean
  children?: React.ReactNode
  onSelect?: (action: ActionSheetAction, index: number) => void
  onCancel?: () => void
  /** 关闭前拦截，返回 false 可阻止关闭，支持 Promise */
  beforeClose?: (action: ActionSheetCloseAction) => boolean | Promise<boolean>
}
