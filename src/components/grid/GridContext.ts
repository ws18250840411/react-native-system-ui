import React from 'react'

import type { GridDirection } from './types'

export interface GridTokens {
  defaults: {
    columnNum: number
    gutter: number
    border: boolean
    center: boolean
    square: boolean
    direction: GridDirection
    reverse: boolean
    clickable: boolean
    iconSize: number
  }
  colors: {
    border: string
    text: string
    background: string
    active: string
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
  }
  typography: {
    fontSize: number
    fontFamily: string
    lineHeight: number
    fontWeight: string
  }
}

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
