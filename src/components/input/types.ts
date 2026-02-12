import type { StyleProp, TextInput, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { FieldTokens } from '../field/tokens'
import type { FieldAutosizeConfig, FieldClearTrigger, FieldInputAlign, FieldProps, FieldShowWordLimit } from '../field/types'

export interface InputTokens {
  defaults: {
    inputAlign: FieldInputAlign
    clearTrigger: FieldClearTrigger
    border: boolean
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
  }
  colors: {
    background: string
  }
}

export interface InputProps extends Omit<FieldProps, 'tokensOverride'> {
  align?: FieldInputAlign
  clearTrigger?: FieldClearTrigger
  onChange?: (value: string) => void
  showWordLimit?: FieldShowWordLimit
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  fieldTokensOverride?: DeepPartial<FieldTokens>
  tokensOverride?: DeepPartial<InputTokens>
}

export interface InputInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  nativeElement: TextInput | null
}

export interface InputTextAreaAutoSizeConfig {
  minHeight?: number
  maxHeight?: number
}

export type InputTextAreaAutoSize = boolean | InputTextAreaAutoSizeConfig

export interface InputTextAreaProps extends Omit<InputProps, 'type' | 'autoSize' | 'autosize'> {
  autoSize?: InputTextAreaAutoSize
}
