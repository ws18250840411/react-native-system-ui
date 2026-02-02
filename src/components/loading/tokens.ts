import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { LoadingTokens } from './types'

export const createLoadingTokens = (foundations: Foundations): LoadingTokens => ({
  defaults: {
    size: 30,
    textSize: foundations.fontSize.sm,
    vertical: false,
  },
  layout: {
    container: {
      alignItems: 'center',
    },
    text: {
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  },
  colors: {
    indicator: foundations.palette.default[400],
    text: foundations.palette.default[500],
  },
  spacing: {
    gap: foundations.spacing.sm,
  },
})

export const useLoadingTokens = createComponentTokensHook(
  'loading',
  createLoadingTokens
)
