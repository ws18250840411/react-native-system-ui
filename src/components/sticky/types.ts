import type * as React from 'react'
import type { Animated, StyleProp, ViewStyle } from 'react-native'

export interface StickyScrollEvent {
  scrollTop: number
  isFixed: boolean
}

export interface StickyProps {
  children?: React.ReactNode
  scrollValue?: Animated.Value
  offsetTop?: number
  zIndex?: number
  disabled?: boolean
  enableShadow?: boolean
  backgroundColor?: string
  position?: 'top' | 'bottom'
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  onChange?: (isFixed: boolean) => void
  onScroll?: (event: StickyScrollEvent) => void
}
