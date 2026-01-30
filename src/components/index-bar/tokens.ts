import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface IndexBarTokens {
  colors: {
    text: string
    activeText: string
    indicatorBackground: string
    indicatorText: string
    stickyBackground: string
    anchorBackground: string
    anchorText: string
  }
  layout: {
    indexWidth: number
    paddingVertical: number
    indexListPaddingHorizontal: number
    indexItemPaddingVertical: number
    indexItemPaddingHorizontal: number
    spacing: number
    indicatorSize: number
    stickyHeight: number
    stickyPaddingHorizontal: number
    anchorHeight: number
    anchorPaddingHorizontal: number
  }
  typography: {
    indexTextSize: number
    indicatorTextSize: number
    stickyTextSize: number
    anchorTitleSize: number
  }
}

const createTokens = (foundations: Foundations): IndexBarTokens => {
  const { palette, fontSize, spacing } = foundations
  return {
    colors: {
      text: palette.default[600],
      activeText: palette.primary[600],
      indicatorBackground: palette.primary[500],
      indicatorText: palette.primary.foreground ?? '#ffffff',
      stickyBackground: palette.default[50],
      anchorBackground: palette.default[50],
      anchorText: palette.default[800],
    },
    layout: {
      indexWidth: 28,
      paddingVertical: spacing.sm,
      indexListPaddingHorizontal: spacing.xxs,
      indexItemPaddingVertical: spacing.xxs,
      indexItemPaddingHorizontal: spacing.xxs,
      spacing: spacing.xs,
      indicatorSize: 48,
      stickyHeight: 32,
      stickyPaddingHorizontal: spacing.md,
      anchorHeight: 32,
      anchorPaddingHorizontal: spacing.md,
    },
    typography: {
      indexTextSize: fontSize.xs,
      indicatorTextSize: fontSize.lg,
      stickyTextSize: fontSize.md,
      anchorTitleSize: fontSize.sm,
    },
  }
}

export const useIndexBarTokens = createComponentTokensHook(
  'indexBar',
  createTokens
)
