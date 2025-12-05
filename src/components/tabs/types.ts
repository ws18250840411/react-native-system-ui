import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type TabsType = 'line' | 'card' | 'capsule' | 'jumbo'
export type TabsAlign = 'start' | 'center'
export type TabsValue = string | number

export interface TabsScrollspyConfig {
  autoFocusLast?: boolean
  reachBottomThreshold?: number
  scrollImmediate?: boolean
}

export interface TabsSwipeableConfig {
  autoHeight?: boolean
  preventScroll?: boolean
}

export interface TabsClickEvent {
  name: TabsValue
  index: number
  disabled: boolean
  title?: React.ReactNode
  event?: unknown
}

export interface TabPaneProps {
  name?: TabsValue
  title?: React.ReactNode | ((active: boolean) => React.ReactNode)
  description?: React.ReactNode | ((active: boolean) => React.ReactNode)
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
  lineWidth?: number | string
  lineHeight?: number | string
  titleActiveColor?: string
  titleInactiveColor?: string
  ellipsis?: boolean
  swipeThreshold?: number
  animated?: boolean
  duration?: number
  beforeChange?: (name: TabsValue, index: number) => boolean | Promise<boolean>
  lazyRender?: boolean
  lazyRenderPlaceholder?: React.ReactNode
  scrollable?: boolean
  scrollspy?: boolean | TabsScrollspyConfig
  swipeable?: boolean | TabsSwipeableConfig
  navLeft?: React.ReactNode
  navRight?: React.ReactNode
  navBottom?: React.ReactNode
  tabBarStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  onClickTab?: (payload: TabsClickEvent) => void
  onChange?: (name: TabsValue, index: number) => void
}

export interface TabsRef {
  /** 滚动到指定标签（scrollspy 模式会同步滚动内容） */
  scrollTo: (name: TabsValue, options?: { immediate?: boolean }) => void
}
