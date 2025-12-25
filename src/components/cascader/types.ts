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
  [key: string]: any
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
  actions: CascaderActions,
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
  /**
   * 点击标签时触发（对齐官方命名）
   * 第二个参数 title 为当前 Tab 展示标题（若非纯文本则为空字符串）
   */
  onClickTab?: (tabIndex: number, title: string) => void
  /**
   * @deprecated 请使用 onClickTab
   */
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
  loadingText?: string
  children?: React.ReactNode | CascaderRenderProps
}
