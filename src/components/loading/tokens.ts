import type { Foundations } from '../../design-system'

export interface LoadingTokens {
  defaults: {
    type: 'circular' | 'spinner'
    size: number
    textSize: number
    vertical: boolean
  }
  colors: {
    indicator: string
    text: string
  }
  spinner: {
    lineWidth: number
    lineLength: number
    itemCount: number
  }
  spacing: {
    gap: number
  }
}

export const createLoadingTokens = (foundations: Foundations): LoadingTokens => {
  return {
    defaults: {
      type: 'circular',
      size: 30,
      textSize: foundations.fontSize.sm,
      vertical: false,
    },
    colors: {
      indicator: foundations.palette.default[400],
      text: foundations.palette.default[500],
    },
    spinner: {
      lineWidth: 2,
      lineLength: 8,
      itemCount: 12,
    },
    spacing: {
      gap: foundations.spacing.sm,
    },
  }
}
