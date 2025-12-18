import type * as React from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'

export type PopoverTheme = 'light' | 'dark'
export type PopoverTrigger = 'manual' | 'click'

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export type PopoverAction = {
  text: string
  icon?: React.ReactNode
  color?: string
  disabled?: boolean
}

export interface PopoverInstance {
  show: () => void
  hide: () => void
}

export interface PopoverProps extends ViewProps {
  reference: React.ReactNode
  trigger?: PopoverTrigger
  actions?: PopoverAction[]
  children?: React.ReactNode
  visible?: boolean
  defaultVisible?: boolean
  placement?: PopoverPlacement
  offset?: [number, number]
  theme?: PopoverTheme
  duration?: number
  showArrow?: boolean
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnClickAction?: boolean
  closeOnClickOverlay?: boolean
  closeOnClickOutside?: boolean
  onVisibleChange?: (visible: boolean) => void
  onSelect?: (action: PopoverAction, index: number) => void
  onClickOverlay?: () => void
  onOpen?: () => void
  onClose?: () => void
  onOpened?: () => void
  onClosed?: () => void
  contentStyle?: StyleProp<ViewStyle>
}
