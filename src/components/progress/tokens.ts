import type { Foundations } from '../../design-system'

export interface ProgressTokens {
  colors: {
    track: string
    indicator: string
    pivotText: string
    pivotBackground: string
  }
  sizes: {
    height: number
    pivotFont: number
    pivotPaddingHorizontal: number
    pivotPaddingVertical: number
  }
}

export const createProgressTokens = (foundations: Foundations): ProgressTokens => {
  return {
    colors: {
      track: foundations.palette.default[100],
      indicator: foundations.palette.primary[500],
      pivotText: '#ffffff',
      pivotBackground: foundations.palette.primary[500],
    },
    sizes: {
      height: 4,
      pivotFont: foundations.fontSize.xs,
      pivotPaddingHorizontal: foundations.spacing.xs,
      pivotPaddingVertical: 2,
    },
  }
}
