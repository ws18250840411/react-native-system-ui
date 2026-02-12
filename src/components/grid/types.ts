import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { BadgeProps } from '../badge'
import type { DeepPartial } from '../../types'

export type GridDirection = 'vertical' | 'horizontal'

export interface GridTokens {
  defaults: {
    columnNum: number
    gutter: number
    border: boolean
    center: boolean
    square: boolean
    direction: GridDirection
    reverse: boolean
    clickable: boolean
    iconSize: number
    pressedOpacity: number
    textNumberOfLines: number
  }
  layout: {
    container: ViewStyle
    border: ViewStyle
    borderTop: ViewStyle
    borderBottom: ViewStyle
    itemContentBase: ViewStyle
    itemVertical: ViewStyle
    itemHorizontal: ViewStyle
    itemCenter: ViewStyle
    itemReverseColumn: ViewStyle
    itemReverseRow: ViewStyle
    iconWrapper: ViewStyle
    text: TextStyle
    itemBorderRight: ViewStyle
    itemBorderBottom: ViewStyle
    itemContentSquare: ViewStyle
  }
  colors: {
    border: string
    text: string
    background: string
    active: string
  }
  typography: {
    fontSize: number
    fontFamily: string
    lineHeight: number
    fontWeight: NonNullable<TextStyle['fontWeight']>
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    iconGap: number
  }
}

export interface GridProps extends ViewProps {
  children?: React.ReactNode
  columnNum?: number
  gutter?: number
  border?: boolean
  center?: boolean
  square?: boolean
  direction?: GridDirection
  reverse?: boolean
  clickable?: boolean
  iconSize?: number
  iconColor?: string
  tokensOverride?: DeepPartial<GridTokens>
}

export interface GridItemProps extends PressableProps {
  children?: React.ReactNode
  text?: React.ReactNode
  icon?: React.ReactNode | ((size: number, color: string) => React.ReactNode)
  iconColor?: string
  badge?: BadgeProps
  dot?: boolean
  contentStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}
