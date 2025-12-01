import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export interface DropdownOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

export interface DropdownMenuProps extends ViewProps {
  children?: React.ReactNode
  activeColor?: string
}

export interface DropdownItemProps extends ViewProps {
  options?: DropdownOption[]
  value?: DropdownOption['value']
  defaultValue?: DropdownOption['value']
  placeholder?: React.ReactNode
  label?: React.ReactNode
  closeOnSelect?: boolean
  textStyle?: StyleProp<TextStyle>
  panelStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  onChange?: (value: DropdownOption['value'], option?: DropdownOption) => void
  index?: number
}
