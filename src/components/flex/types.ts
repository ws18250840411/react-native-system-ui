import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type FlexJustify = 'start' | 'end' | 'center' | 'around' | 'between'

export interface FlexTokens {
  defaults: {
    direction: FlexDirection
    wrap: FlexWrap
    gutter: number | [number, number]
    align: FlexAlign
    justify: FlexJustify
    columns: number
  }
  layout: {
    container: ViewStyle
  }
}

export interface FlexProps {
  children?: React.ReactNode
  direction?: FlexDirection
  wrap?: FlexWrap
  gutter?: number | [number, number]
  align?: FlexAlign
  justify?: FlexJustify
  style?: StyleProp<ViewStyle>
  columns?: number
  tokensOverride?: DeepPartial<FlexTokens>
}

export interface FlexItemProps {
  span?: number
  flex?: number | string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}
