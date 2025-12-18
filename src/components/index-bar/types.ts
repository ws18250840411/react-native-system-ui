import type * as React from 'react'
import type { StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native'

export type IndexBarValue = string | number

export interface IndexBarProps extends Omit<ViewProps, 'children'> {
  children?: React.ReactNode
  value?: IndexBarValue
  defaultValue?: IndexBarValue
  zIndex?: number
  sticky?: boolean
  stickyOffsetTop?: number
  indexList?: IndexBarValue[]
  itemRender?: (item: IndexBarValue, active: boolean) => React.ReactNode
  showIndicator?: boolean
  highlightColor?: string
  indicatorStyle?: StyleProp<ViewStyle>
  indexTextStyle?: StyleProp<TextStyle>
  safeAreaInsetTop?: boolean
  onChange?: (index: IndexBarValue) => void
  onSelect?: (index: IndexBarValue) => void
}

export interface IndexAnchorProps extends ViewProps {
  index: IndexBarValue
  title?: React.ReactNode
  children?: React.ReactNode
  /** @private */
  active?: boolean
  /** @private */
  highlightColor?: string
  /** @private */
  onLayoutCapture?: (index: IndexBarValue, layoutY: number) => void
}

export interface IndexBarInstance {
  scrollTo: (index: IndexBarValue) => void
}
