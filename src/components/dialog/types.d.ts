import type React from 'react'
import type {
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import type { DialogTokens } from './tokens'

export type DialogTheme = 'default' | 'round-button'
export type DialogMessageAlign = 'left' | 'center' | 'right'
export type DialogBeforeCloseAction = 'confirm' | 'cancel' | 'close'

export interface DialogActionState {
  loading?: boolean
  disabled?: boolean
}

export interface DialogProps extends Omit<ViewProps, 'children'> {
  visible: boolean
  title?: React.ReactNode
  message?: React.ReactNode
  messageAlign?: DialogMessageAlign
  theme?: DialogTheme
  width?: number | string
  closeable?: boolean
  closeIcon?: React.ReactNode
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  overlayTestID?: string
  closeOnBackPress?: boolean
  closeOnPopstate?: boolean
  closeOnOverlayPress?: boolean
  closeOnClickOverlay?: boolean
  onClickOverlay?: () => void
  onClickCloseIcon?: () => void
  /** 关闭前拦截（对齐 Vant：beforeClose），返回 false 可阻止本次触发 */
  beforeClose?: (action: DialogBeforeCloseAction) => boolean | Promise<boolean>
  showCancelButton?: boolean
  cancelButtonText?: React.ReactNode
  cancelButtonColor?: string
  cancelProps?: DialogActionState
  showConfirmButton?: boolean
  confirmButtonText?: React.ReactNode
  confirmButtonColor?: string
  confirmProps?: DialogActionState
  footer?: React.ReactNode
  contentStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  messageStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<DialogTokens>
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onCancel?: () => void | boolean | Promise<void | boolean>
  onConfirm?: () => void | boolean | Promise<void | boolean>
  onClose?: () => void | boolean | Promise<void | boolean>
  onClosed?: () => void
}

export type DialogShowOptions = Omit<DialogProps, 'visible'>
export type DialogAlertOptions = Omit<DialogShowOptions, 'showCancelButton' | 'onCancel'>
export type DialogConfirmOptions = DialogShowOptions

export type DialogImperativeMode = 'show' | 'alert' | 'confirm'

export type DialogSetDefaultOptions = {
  (options: DialogShowOptions): void
  (mode: DialogImperativeMode, options: DialogShowOptions): void
}

export type DialogResetDefaultOptions = {
  (mode?: DialogImperativeMode): void
}

export interface DialogStatic {
  Host: React.ComponentType<any>
  show: (options?: DialogShowOptions) => () => void
  alert: (options?: DialogAlertOptions) => Promise<void>
  confirm: (options?: DialogConfirmOptions) => Promise<boolean>
  clear: () => void
  setDefaultOptions: DialogSetDefaultOptions
  resetDefaultOptions: DialogResetDefaultOptions
}
