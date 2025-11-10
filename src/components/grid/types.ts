import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { BadgeProps } from '../badge'

export type GridDirection = 'vertical' | 'horizontal'

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
