import React from 'react'
import type { StyleProp, ViewStyle, FlatListProps } from 'react-native'

import type { SwiperPagIndicatorProps } from './SwiperPagIndicator'

export interface SwiperProps<T = unknown> {
  data?: T[]
  renderItem?: FlatListProps<T>['renderItem']
  children?: React.ReactElement | React.ReactElement[]
  initialSwipe?: number
  touchable?: boolean
  loop?: boolean
  autoplay?: boolean | number
  vertical?: boolean
  onChange?: (index: number) => void
  indicator?: boolean | ((total: number, current: number) => React.ReactNode)
  indicatorProps?: Omit<SwiperPagIndicatorProps, 'total' | 'current' | 'vertical'>
  style?: StyleProp<ViewStyle>
  testID?: string
}

export interface SwiperItemProps {
  
  style?: StyleProp<ViewStyle>
  
  children?: React.ReactNode
  
  testID?: string
}

export type SwiperInstance = {
  swipeTo: (index: number, animated?: boolean) => void
  swipeNext: () => void
  swipePrev: () => void
  getCurrentIndex: () => number
}
