import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface ShareSheetTokens {
  colors: {
    background: string
    title: string
    description: string
    option: string
    optionDesc: string
    border: string
    divider: string
  }
  spacing: {
    horizontal: number
    vertical: number
    gap: number
    popupPadding: number
    headerPaddingTop: number
    headerPaddingHorizontal: number
    headerPaddingBottom: number
    titleMarginTop: number
    descriptionMarginTop: number
    nodeMarginTop: number
    iconMarginHorizontal: number
    optionTextPaddingHorizontal: number
    optionDescPaddingHorizontal: number
    cancelPaddingVertical: number
    cancelMarginTop: number
  }
  sizing: {
    icon: number
  }
  typography: {
    fontFamily: string
    title: number
    description: number
    option: number
    optionDesc: number
    cancel: number
  }
}

const createTokens = (foundations: Foundations): ShareSheetTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  return {
    colors: {
      background: '#ffffff',
      title: palette.default[900],
      description: palette.default[500],
      option: palette.default[900],
      optionDesc: palette.default[500],
      border: palette.default[200],
      divider: palette.default[100],
    },
    spacing: {
      horizontal: spacing.md,
      vertical: spacing.sm,
      gap: spacing.xs,
      popupPadding: 0,
      headerPaddingTop: spacing.sm,
      headerPaddingHorizontal: spacing.lg,
      headerPaddingBottom: spacing.md,
      titleMarginTop: spacing.xs,
      descriptionMarginTop: spacing.xs,
      nodeMarginTop: spacing.xs,
      iconMarginHorizontal: spacing.md,
      optionTextPaddingHorizontal: spacing.xs,
      optionDescPaddingHorizontal: spacing.lg,
      cancelPaddingVertical: 14,
      cancelMarginTop: spacing.sm,
    },
    sizing: {
      icon: 48,
    },
    typography: {
      fontFamily: typography.fontFamily,
      title: fontSize.md,
      description: fontSize.xs,
      option: fontSize.xs,
      optionDesc: fontSize.xxs,
      cancel: fontSize.md,
    },
  }
}

export const useShareSheetTokens = createComponentTokensHook(
  'shareSheet',
  createTokens
)
