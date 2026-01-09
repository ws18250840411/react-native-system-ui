import type React from "react"
import type { TextStyle, ViewProps, ViewStyle } from "react-native"

import type { DeepPartial } from "../../types"
import type { PopupPlacement, PopupProps } from "../popup"

export interface CascaderTokens {
  defaults: {
    placeholder: string
    title: React.ReactNode
    showHeader: boolean
    closeable: boolean
    swipeable: boolean
    poppable: boolean
    closeOnClickOverlay: boolean
    closeOnFinish: boolean
    popupPlacement: PopupPlacement
    popupRound: boolean
    loadingText: string
  }
  layout: {
    container: ViewStyle
    header: ViewStyle
    title: TextStyle
    closeButton: ViewStyle
    tabsWrapper: ViewStyle
    tabsContentStatic: ViewStyle
    tabsItem: ViewStyle
    tabsTitle: TextStyle
    tabTitleNode: TextStyle
    optionList: ViewStyle
    option: ViewStyle
    optionContent: ViewStyle
    optionText: TextStyle
    optionTextActive: TextStyle
    optionLabel: ViewStyle
    empty: TextStyle
    inlineChildren: ViewStyle
  }
  colors: {
    background: string
    headerText: string
    placeholder: string
    closeIcon: string
    closeIconActive: string
    tabText: string
    tabActive: string
    tabInactive: string
    optionText: string
    optionDisabled: string
    optionActiveBackground: string
    optionActiveText: string
    divider: string
  }
  typography: {
    titleSize: number
    titleWeight: TextStyle['fontWeight']
    tabsTitleSize: number
    tabTitlePlaceholderWeight: TextStyle['fontWeight']
    tabTitleWeight: TextStyle['fontWeight']
    optionTextSize: number
    optionTextActiveWeight: TextStyle['fontWeight']
    emptyTextSize: number
  }
  sizing: {
    indicatorHeight: number
    optionMinHeight: number
    optionListHeight: number
    headerHeight: number
    closeIconSize: number
    selectedIconSize: number
  }
  radii: {
    option: number
  }
  spacing: {
    headerPaddingHorizontal: number
    tabNavPaddingHorizontal: number
    tabNavPaddingVertical: number
    tabPaddingHorizontal: number
    optionPaddingVertical: number
    optionPaddingHorizontal: number
    optionListPaddingTop: number
    optionListPaddingBottom: number
    closeButtonMarginLeft: number
    optionLabelMarginRight: number
    emptyPaddingVertical: number
    inlineChildrenPaddingVertical: number
  }
}

export type CascaderValue = string | number

export interface CascaderOption {
  text?: React.ReactNode
  value?: CascaderValue
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

export interface CascaderProps extends Omit<ViewProps, 'children'> {
  options?: CascaderOption[]
  value?: CascaderValue[]
  defaultValue?: CascaderValue[]
  title?: React.ReactNode
  placeholder?: string
  activeColor?: string
  tokensOverride?: DeepPartial<CascaderTokens>
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
