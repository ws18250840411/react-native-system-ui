import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { RateTokens } from './tokens'

export interface RateProps extends Omit<ViewProps, 'onChange'> {
  value?: number
  defaultValue?: number
  count?: number | string
  allowHalf?: boolean
  size?: number | string
  gutter?: number | string
  color?: string
  voidColor?: string
  disabledColor?: string
  icon?: React.ReactNode
  voidIcon?: React.ReactNode
  character?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  touchable?: boolean
  tokensOverride?: DeepPartial<RateTokens>
  onChange?: (value: number) => void
  onIconPress?: (value: number) => void
  iconStyle?: StyleProp<TextStyle>
  itemStyle?: StyleProp<ViewStyle>
}
