import type React from 'react'
import type {
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'

export type DialogTheme = 'default' | 'round-button'
export type DialogMessageAlign = 'left' | 'center' | 'right'

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
  closeOnOverlayPress?: boolean
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
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  onClose?: () => void
  onClosed?: () => void
}

export type DialogShowOptions = Omit<DialogProps, 'visible'>
export type DialogAlertOptions = Omit<DialogShowOptions, 'showCancelButton' | 'onCancel'>
export type DialogConfirmOptions = DialogShowOptions

export interface DialogStatic {
  Host: React.FC
  show: (options?: DialogShowOptions) => () => void
  alert: (options?: DialogAlertOptions) => Promise<void>
  confirm: (options?: DialogConfirmOptions) => Promise<boolean>
  clear: () => void
}
