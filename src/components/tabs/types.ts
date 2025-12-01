import type * as React from 'react'
import type { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { StickyScrollEvent } from '../sticky/types'

export type TabsType = 'line' | 'card'
export type TabsAlign = 'start' | 'center'
export type TabsValue = string | number

export interface TabsClickEvent {
  name: TabsValue
  index: number
  disabled: boolean
  title?: React.ReactNode
  event?: unknown
}

export interface TabPaneProps {
  name?: TabsValue
  title?: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  children?: React.ReactNode
}

export interface TabsProps extends Omit<ViewProps, 'children' | 'onLayout'> {
  children?: React.ReactNode
  active?: TabsValue
  defaultActive?: TabsValue
  type?: TabsType
  align?: TabsAlign
  color?: string
  background?: string
  border?: boolean
  ellipsis?: boolean
  swipeThreshold?: number
  animated?: boolean
  duration?: number
  lazyRender?: boolean
  scrollable?: boolean
  sticky?: boolean
  offsetTop?: number
  scrollValue?: Animated.Value
  enableStickyShadow?: boolean
  navLeft?: React.ReactNode
  navRight?: React.ReactNode
  navBottom?: React.ReactNode
  tabBarStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  onClickTab?: (payload: TabsClickEvent) => void
  onScroll?: (event: StickyScrollEvent) => void
}
