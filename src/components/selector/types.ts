import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type SelectorValue = string | number

export interface SelectorOption<V extends SelectorValue> {
  label: React.ReactNode
  description?: React.ReactNode
  value: V
  disabled?: boolean
}

export interface SelectorChangeExtend<V extends SelectorValue> {
  items: SelectorOption<V>[]
}

export interface SelectorProps<V extends SelectorValue = SelectorValue> extends ViewProps {
  options: SelectorOption<V>[]
  columns?: number
  multiple?: boolean
  disabled?: boolean
  defaultValue?: V[]
  value?: V[]
  showCheckMark?: boolean
  onChange?: (value: V[], extend: SelectorChangeExtend<V>) => void
  itemStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
}
