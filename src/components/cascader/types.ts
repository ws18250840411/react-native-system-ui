import type React from "react"
import type { ViewProps } from "react-native"

import type { PopupPlacement, PopupProps } from "../popup"

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

export interface CascaderActions {
  open: () => void
  close: () => void
  toggle: () => void
}

export type CascaderRenderProps = (
  value: CascaderValue[],
  selectedRows: CascaderOption[],
  actions: CascaderActions
) => React.ReactNode

export interface CascaderProps extends ViewProps {
  options?: CascaderOption[]
  value?: CascaderValue[]
  defaultValue?: CascaderValue[]
  title?: React.ReactNode
  placeholder?: string
  activeColor?: string
  fieldNames?: CascaderFieldNames
  swipeable?: boolean
  optionRender?: (params: { option: CascaderOption; selected: boolean }) => React.ReactNode
  showHeader?: boolean
  closeable?: boolean
  closeIcon?: React.ReactNode
  onClose?: () => void
  onChange?: (value: CascaderValue[], selectedRows: CascaderOption[]) => void
  onFinish?: (value: CascaderValue[], selectedRows: CascaderOption[]) => void
  onTabChange?: (tabIndex: number) => void
  poppable?: boolean
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  closeOnClickOverlay?: boolean
  closeOnFinish?: boolean
  popupPlacement?: PopupPlacement
  popupRound?: boolean
  popupProps?: Partial<PopupProps>
  children?: React.ReactNode | CascaderRenderProps
}
