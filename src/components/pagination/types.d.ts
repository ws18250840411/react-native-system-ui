import type { ViewProps } from 'react-native'
import React from 'react'

import type { DeepPartial } from '../../types'
import type { PaginationTokens } from './tokens'

export type PaginationMode = 'multi' | 'simple'

export interface PaginationPageItem {
  number: number
  text: React.ReactNode
  active?: boolean
}

export interface PaginationProps extends ViewProps {
  value?: number
  defaultValue?: number
  mode?: PaginationMode
  pageCount?: number
  totalItems?: number
  itemsPerPage?: number
  showPageSize?: number
  forceEllipses?: boolean
  prevText?: React.ReactNode
  nextText?: React.ReactNode
  pageDesc?: React.ReactNode
  pageRender?: (page: PaginationPageItem) => React.ReactNode
  tokensOverride?: DeepPartial<PaginationTokens>
  onChange?: (page: number) => void
}
