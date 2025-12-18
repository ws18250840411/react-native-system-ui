import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

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
  onOpen?: () => void
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

export interface DropdownItemProps extends ViewProps {
  options?: DropdownOption[]
  value?: DropdownOption['value']
  defaultValue?: DropdownOption['value']
  placeholder?: React.ReactNode
  /** 对齐 Vant：title */
  title?: React.ReactNode
  /** 兼容旧字段：label */
  label?: React.ReactNode
  disabled?: boolean
  closeOnSelect?: boolean
  textStyle?: StyleProp<TextStyle>
  panelStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
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
