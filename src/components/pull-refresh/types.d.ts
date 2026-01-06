import type * as React from 'react'
import type { ScrollViewProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { PullRefreshTokens } from './tokens'

export type PullRefreshStatus = 'normal' | 'pulling' | 'loosing' | 'loading' | 'success'

export type PullRefreshStatusText =
  | React.ReactNode
  | ((params: { distance: number }) => React.ReactNode)

export interface PullRefreshProps extends Omit<ScrollViewProps, 'refreshControl'> {
  refreshing?: boolean
  defaultRefreshing?: boolean
  onRefresh?: () => Promise<void> | void
  onRefreshEnd?: () => void
  tokensOverride?: DeepPartial<PullRefreshTokens>
  pullingText?: PullRefreshStatusText
  loosingText?: PullRefreshStatusText
  loadingText?: PullRefreshStatusText
  successText?: PullRefreshStatusText
  successDuration?: number | string
  animationDuration?: number | string
  headHeight?: number | string
  pullDistance?: number | string
  disabled?: boolean
  children?: React.ReactNode
}
