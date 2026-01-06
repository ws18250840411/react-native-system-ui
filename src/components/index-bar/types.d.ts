import type * as React from 'react'
import type { StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { IndexBarTokens } from './tokens'

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
  tokensOverride?: DeepPartial<IndexBarTokens>
}

export interface IndexAnchorProps extends ViewProps {
  index: IndexBarValue
  title?: React.ReactNode
  children?: React.ReactNode
  tokensOverride?: DeepPartial<IndexBarTokens>
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
