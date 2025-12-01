import type * as React from 'react'
import type { ScrollViewProps, ViewProps } from 'react-native'

export interface ListProps extends Omit<ScrollViewProps, 'onScroll'> {
  onLoad?: (isRetry: boolean) => void | Promise<void>
  finished?: boolean
  offset?: number
  loadingText?: React.ReactNode
  finishedText?: React.ReactNode
  errorText?: React.ReactNode | ((retry: () => void) => React.ReactNode)
  children?: React.ReactNode
  contentContainerStyle?: ViewProps['style']
}

export interface ListRef {
  check: () => void
}
