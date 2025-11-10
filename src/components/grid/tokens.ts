import type { Foundations } from '../../design-system'

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

export const createGridTokens = (foundations: Foundations): GridTokens => {
  const { palette, spacing, fontSize, typography } = foundations

  return {
    defaults: {
      columnNum: 4,
      gutter: 0,
      border: true,
      center: true,
      square: false,
      direction: 'vertical',
      reverse: false,
      clickable: false,
      iconSize: 28,
    },
    colors: {
      border: palette.default[200],
      text: palette.default[700],
      background: '#ffffff',
      active: palette.default[100],
    },
    spacing: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.md,
    },
    typography: {
      fontSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      lineHeight: fontSize.sm * typography.lineHeightMultiplier,
      fontWeight: typography.weight.regular,
    },
  }
}
