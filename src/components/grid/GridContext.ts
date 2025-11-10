import React from 'react'

import type { GridTokens } from './tokens'
import type { GridDirection } from './types'

export interface GridContextValue {
  columnNum: number
  gutter: number
  border: boolean
  center: boolean
  square: boolean
  direction: GridDirection
  reverse: boolean
  clickable: boolean
  iconSize: number
  iconColor?: string
  count: number
  tokens: GridTokens
}

export const GridContext = React.createContext<GridContextValue | null>(null)
