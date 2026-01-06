import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { DropdownMenuTokens } from './tokens'

export type DropdownMenuDirection = 'down' | 'up'

export interface DropdownOption {
  /** 对齐 Vant：text */
  text?: React.ReactNode
  /** 兼容旧字段：label */
  label?: React.ReactNode
  value: string | number
  disabled?: boolean
  icon?: React.ReactNode
}

export interface DropdownMenuProps extends ViewProps {
  children?: React.ReactNode
  activeColor?: string
  activeIcon?: React.ReactNode
  direction?: DropdownMenuDirection
  disabled?: boolean
  zIndex?: number | string
  /** 动画时长，单位秒（对齐 Vant，设置为 0 可禁用动画） */
  duration?: number | string
  overlay?: boolean
  closeOnClickOverlay?: boolean
  closeOnClickOutside?: boolean
  swipeThreshold?: number | string
  /** 当前选中项的值，格式为 { name: value } */
  value?: Record<string, string | number>
  /** 默认选中项的值 */
  defaultValue?: Record<string, string | number>
  /** 选项改变时触发 */
  onChange?: (value: Record<string, string | number>) => void
  onOpen?: () => void
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
  tokensOverride?: DeepPartial<DropdownMenuTokens>
}

export interface DropdownItemProps extends ViewProps {
  /** 选项数据 */
  options?: DropdownOption[]
  /** 当前选中项的值（受控模式，如果 DropdownMenu 有 value，则从那里获取） */
  value?: DropdownOption['value']
  /** 默认选中项的值（非受控模式） */
  defaultValue?: DropdownOption['value']
  /** 占位符文本 */
  placeholder?: React.ReactNode
  /** 对齐 Vant：title */
  title?: React.ReactNode
  /** 兼容旧字段：label */
  label?: React.ReactNode
  /** 选项标识符，用于在 DropdownMenu 的 value 中标识该项 */
  name?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 选择后是否关闭菜单 */
  closeOnSelect?: boolean
  textStyle?: StyleProp<TextStyle>
  panelStyle?: StyleProp<ViewStyle>
  tokensOverride?: DeepPartial<DropdownMenuTokens>
  children?: React.ReactNode
  /** 选项改变时触发（如果 DropdownMenu 有 onChange，会同时调用） */
  onChange?: (value: DropdownOption['value'], option?: DropdownOption) => void
  onOpen?: () => void
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
  index?: number
  /** 内部使用：菜单栏是否横向滚动 */
  barScrollable?: boolean
}

export interface DropdownMenuInstance {
  toggleItem: (index: number) => void
  showItem: (index: number) => void
  close: () => void
}

export interface DropdownItemInstance {
  toggle: () => void
  open: () => void
  close: () => void
}
