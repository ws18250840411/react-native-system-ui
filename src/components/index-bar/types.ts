import type * as React from 'react'
import type { StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native'

export interface IndexBarProps extends Omit<ViewProps, 'children'> {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  sticky?: boolean
  showIndicator?: boolean
  highlightColor?: string
  indicatorStyle?: StyleProp<ViewStyle>
  indexTextStyle?: StyleProp<TextStyle>
  safeAreaInsetTop?: boolean
  onChange?: (index: string) => void
}

export interface IndexAnchorProps extends ViewProps {
  index: string
  title?: React.ReactNode
  children?: React.ReactNode
  /** @private */
  active?: boolean
  /** @private */
  highlightColor?: string
  /** @private */
  onLayoutCapture?: (index: string, layoutY: number) => void
}
