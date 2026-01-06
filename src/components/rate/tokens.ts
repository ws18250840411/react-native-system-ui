import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface RateTokens {
  defaults: {
    count: number
    allowHalf: boolean
    size: number
    gutter: number
    touchable: boolean
  }
  colors: {
    active: string
    inactive: string
    disabled: string
  }
}

const createRateTokens = (foundations: Foundations): RateTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      count: 5,
      allowHalf: false,
      size: fontSize.lg,
      gutter: spacing.xs,
      touchable: true,
    },
    colors: {
      active: palette.warning[500] ?? '#fa8c16',
      inactive: palette.default[200],
      disabled: palette.default[400],
    },
  }
}

export const useRateTokens = createComponentTokensHook('rate', createRateTokens)
