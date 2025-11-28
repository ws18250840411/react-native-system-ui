import type React from 'react'
import type { ViewProps } from 'react-native'

export type NumberKeyboardTheme = 'default' | 'custom'

export type NumberKeyboardKeyType = '' | 'delete' | 'extra' | 'close'

export interface NumberKeyboardProps extends ViewProps {
  visible: boolean
  value?: string
  defaultValue?: string
  title?: React.ReactNode
  extraKey?: string | string[]
  closeButtonText?: string
  deleteButtonText?: string
  closeButtonLoading?: boolean
  showDeleteKey?: boolean
  randomKeyOrder?: boolean
  blurOnClose?: boolean
  safeAreaInsetBottom?: boolean
  theme?: NumberKeyboardTheme
  transition?: boolean
  onInput?: (key: string) => void
  onDelete?: () => void
  onClose?: () => void
  onHide?: () => void
  onShow?: () => void
  onBlur?: () => void
  onChange?: (value: string) => void
  maxlength?: number
  numberKeyRender?: (key: string) => React.ReactNode
  deleteRender?: () => React.ReactNode
  extraKeyRender?: (key: string) => React.ReactNode
}
