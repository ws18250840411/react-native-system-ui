import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface ProgressTokens {
  colors: {
    track: string
    indicator: string
    pivotText: string
  }
  sizes: {
    height: number
    pivotFont: number
    pivotPaddingHorizontal: number
    pivotPaddingVertical: number
  }
}

const createProgressTokens = (foundations: Foundations): ProgressTokens => {
  const onPrimary = foundations.palette.primary.foreground ?? '#ffffff'
  return {
    colors: {
      track: foundations.palette.default[100],
      indicator: foundations.palette.primary[500],
      pivotText: onPrimary,
    },
    sizes: {
      height: 4,
      pivotFont: foundations.fontSize.xs,
      pivotPaddingHorizontal: foundations.spacing.xs,
      pivotPaddingVertical: 2,
    },
  }
}

export const useProgressTokens = createComponentTokensHook(
  'progress',
  createProgressTokens
)
