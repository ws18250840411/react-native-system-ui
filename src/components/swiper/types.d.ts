import React from 'react'
import type { StyleProp, ViewStyle, FlatListProps } from 'react-native'

import type { SwiperPagIndicatorProps } from './SwiperPagIndicator'

export interface SwiperProps<T = unknown> {
  
  initialSwipe?: number
  
  touchable?: boolean
  
  autoplay?: boolean | number
  
  loop?: boolean
  
  vertical?: boolean
  
  duration?: number
  
  enabled?: boolean
  
  rubberband?: boolean
  
  onChange?: (index: number) => void
  
  indicatorProps?: Omit<SwiperPagIndicatorProps, 'total' | 'current' | 'vertical'>
  
  indicator?: boolean | ((total: number, current: number) => React.ReactNode)
  
  slideSize?: number
  
  trackOffset?: number
  
  stuckAtBoundary?: boolean
  
  autoHeight?: boolean
  
  preventScroll?: boolean
  
  style?: StyleProp<ViewStyle>
  
  children?: React.ReactElement | React.ReactElement[]
  
  data?: T[]
  
  renderItem?: FlatListProps<T>['renderItem']
  
  testID?: string
}

export interface SwiperItemProps {
  
  style?: StyleProp<ViewStyle>
  
  children?: React.ReactNode
  
  testID?: string
}

export type SwiperInstance = {
  activeIndex: number
  swipeTo: (index: number, animated?: boolean) => void
  swipeNext: () => void
  swipePrev: () => void
  
  enable: () => void
  
  disable: () => void
  
  getCurrentIndex: () => number
  
  getPrevIndex: () => number
  
  goToFirstIndex: () => void
  
  goToLastIndex: () => void
}
