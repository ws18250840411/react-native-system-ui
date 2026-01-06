import type * as React from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { TabsTokens } from './tokens'

export type TabsType = 'line' | 'card' | 'capsule' | 'jumbo'
export type TabsAlign = 'start' | 'center'
export type TabsValue = string | number

export interface TabsSwipeableConfig {
  autoHeight?: boolean
  preventScroll?: boolean
}

export interface TabsClickEvent {
  name: TabsValue
  index: number
  disabled: boolean
  event: unknown
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
  tokensOverride?: DeepPartial<TabsTokens>
  ellipsis?: boolean
  swipeThreshold?: number
  animated?: boolean
  duration?: number
  beforeChange?: (name: TabsValue) => boolean | Promise<boolean>
  lazyRender?: boolean
  lazyRenderPlaceholder?: React.ReactNode
  swipeable?: boolean | TabsSwipeableConfig
  /** 是否强制开启/关闭标签栏滚动（不传则自动根据数量判断） */
  scrollable?: boolean
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
  /** 切换到指定标签，并将其滚动到可视区（当标签栏可横向滚动时） */
  scrollTo: (name: TabsValue, options?: { immediate?: boolean }) => void
}
