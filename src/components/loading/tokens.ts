import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { LoadingTokens } from './types'

export const createLoadingTokens = (foundations: Foundations): LoadingTokens => ({
  defaults: {
    type: 'circular',
    size: 30,
    textSize: foundations.fontSize.sm,
    vertical: false,
  },
  layout: {
    container: {
      alignItems: 'center',
    },
    spinnerItem: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
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
  sizing: {
    spinner: {
      lineWidth: 2,
      lineLength: 8,
      itemCount: 12,
      innerGapRatio: 0.25,
    },
  },
  spacing: {
    gap: foundations.spacing.sm,
  },
})

export const useLoadingTokens = createComponentTokensHook(
  'loading',
  createLoadingTokens
)

