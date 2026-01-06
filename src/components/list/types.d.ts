import type * as React from 'react'
import type { ScrollViewProps, ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { ListTokens } from './List'

export interface ListProps extends ScrollViewProps {
  onLoad?: (isRetry: boolean) => void | Promise<void>
  loading?: boolean
  error?: boolean
  finished?: boolean
  offset?: number
  immediateCheck?: boolean
  loadingText?: React.ReactNode
  finishedText?: React.ReactNode
  errorText?: React.ReactNode | ((retry: () => void) => React.ReactNode)
  children?: React.ReactNode
  contentContainerStyle?: ViewProps['style']
  tokensOverride?: DeepPartial<ListTokens>
}

export interface ListRef {
  check: () => void
}
