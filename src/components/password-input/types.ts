import type React from 'react'
import type {
  ViewProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import type { PasswordInputTokens } from './tokens'

export type PasswordInputType = 'text' | 'number'

export interface PasswordInputProps extends ViewProps {
  
  value?: string
  
  defaultValue?: string
  
  length?: number
  
  mask?: boolean
  
  gutter?: number
  
  type?: PasswordInputType
  
  autoFocus?: boolean
  
  disabled?: boolean
  
  info?: React.ReactNode
  
  errorInfo?: React.ReactNode
  
  showCursor?: boolean
  
  validator?: (value: string) => boolean
  
  cellStyle?: StyleProp<ViewStyle>
  
  cellTextStyle?: StyleProp<TextStyle>
  
  cellFilledStyle?: StyleProp<ViewStyle>
  
  maskStyle?: StyleProp<ViewStyle>
  
  cursorStyle?: StyleProp<ViewStyle>
  
  highlightTextStyle?: StyleProp<TextStyle>
  
  onChange?: (value: string) => void
  
  onSubmit?: (value: string) => void
  
  onFocus?: () => void
  onBlur?: () => void
  tokensOverride?: DeepPartial<PasswordInputTokens>
}

export interface PasswordInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
}
