import type React from "react"
import type { ViewProps } from "react-native"

export type CascaderValue = string | number

export interface CascaderOption {
  text?: React.ReactNode
  value: CascaderValue
  disabled?: boolean
  color?: string
  children?: CascaderOption[]
  loading?: boolean
}

export interface CascaderFieldNames {
  text?: string
  value?: string
  children?: string
}

export interface CascaderProps extends ViewProps {
  options?: CascaderOption[]
  value?: CascaderValue[]
  defaultValue?: CascaderValue[]
  title?: React.ReactNode
  placeholder?: string
  activeColor?: string
  fieldNames?: CascaderFieldNames
  optionRender?: (params: { option: CascaderOption; selected: boolean }) => React.ReactNode
  showHeader?: boolean
  onChange?: (value: CascaderValue[], selectedRows: CascaderOption[]) => void
  onFinish?: (value: CascaderValue[], selectedRows: CascaderOption[]) => void
  onTabChange?: (tabIndex: number) => void
}
