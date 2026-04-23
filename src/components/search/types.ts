import type React from 'react'
import type {
  NativeSyntheticEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import type { FieldInputAlign, FieldProps } from '../field/types'
import type { SearchTokens } from './tokens'

export type SearchShape = 'square' | 'round'

export interface SearchProps
  extends Omit<
    FieldProps,
    | 'style'
    | 'contentStyle'
    | 'label'
    | 'labelStyle'
    | 'labelWidth'
    | 'labelAlign'
    | 'required'
    | 'colon'
    | 'intro'
    | 'tooltip'
    | 'description'
    | 'border'
    | 'size'
    | 'center'
    | 'controlAlign'
    | 'clickable'
    | 'isLink'
    | 'arrowDirection'
    | 'prefix'
    | 'suffix'
    | 'button'
    | 'extra'
    | 'rows'
    | 'autosize'
    | 'autoSize'
    | 'showWordLimit'
    | 'type'
    | 'tokensOverride'
  > {
  
  label?: React.ReactNode
  
  style?: StyleProp<ViewStyle>
  
  fieldStyle?: FieldProps['style']
  
  fieldContentStyle?: FieldProps['contentStyle']
  
  actionText?: React.ReactNode
  
  action?: React.ReactNode
  
  showAction?: boolean
  
  shape?: SearchShape
  
  background?: string
  tokensOverride?: DeepPartial<SearchTokens>
  
  align?: FieldInputAlign
  
  onChange?: (value: string) => void
  
  onSearch?: (value: string) => void
  
  onCancel?: () => void
  
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void
}

export interface SearchRef {
  focus: () => void
  blur: () => void
  clear: () => void
}
