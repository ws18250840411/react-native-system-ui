import type * as React from 'react'
import type { ViewProps, GestureResponderEvent } from 'react-native'

export interface PullRefreshProps extends ViewProps {
  refreshing?: boolean
  defaultRefreshing?: boolean
  onRefresh?: () => Promise<void> | void
  pullingText?: React.ReactNode
  loosingText?: React.ReactNode
  loadingText?: React.ReactNode
  successText?: React.ReactNode
  headHeight?: number
  disabled?: boolean
  children?: React.ReactNode
}
