import type React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

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

export interface SelectorTokens {
  defaults: {
    columns: number
    multiple: boolean
    showCheckMark: boolean
    disabled: boolean
  }
  layout: {
    container: ViewStyle
    pressable: ViewStyle
    item: ViewStyle
    label: TextStyle
    description: TextStyle
    checkMark: TextStyle
    checkMarkTriangle: ViewStyle
  }
  colors: {
    border: string
    borderActive: string
    background: string
    backgroundActive: string
    text: string
    textActive: string
    description: string
    disabledText: string
    check: string
    checkForeground: string
  }
  typography: {
    fontSize: number
    descriptionSize: number
    fontFamily: string
    fontWeight: string
  }
  radii: {
    item: number
  }
  spacing: {
    gap: number
    paddingVertical: number
    paddingHorizontal: number
    descriptionMarginTop: number
  }
  states: {
    disabledOpacity: number
  }
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
  tokensOverride?: DeepPartial<SelectorTokens>
}
