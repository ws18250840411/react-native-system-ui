import type * as React from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'

export type PopoverPlacement = 'top' | 'bottom'

export interface PopoverProps extends ViewProps {
  trigger: React.ReactElement
  children: React.ReactNode
  visible?: boolean
  defaultVisible?: boolean
  placement?: PopoverPlacement
  offset?: number
  showArrow?: boolean
  overlay?: boolean
  onVisibleChange?: (visible: boolean) => void
  onOpen?: () => void
  onClose?: () => void
  contentStyle?: StyleProp<ViewStyle>
}
