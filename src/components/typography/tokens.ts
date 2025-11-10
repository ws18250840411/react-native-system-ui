import type { Foundations } from '../../design-system'

import type { TypographySize, TypographyType, TypographyTitleLevel } from './types'

export interface TypographyTokens {
  colors: Record<TypographyType, string>
  sizes: Record<TypographySize, number>
  titles: Record<TypographyTitleLevel, { fontSize: number; lineHeight: number }>
  typography: {
    fontFamily: string
    weight: {
      regular: string
      medium: string
      strong: string
    }
  }
  opacity: {
    disabled: number
  }
}

export const createTypographyTokens = (foundations: Foundations): TypographyTokens => {
  const { palette, fontSize, typography } = foundations

  return {
    colors: {
      default: palette.default[700],
      primary: palette.primary[500],
      success: palette.success[500],
      warning: palette.warning[500],
      danger: palette.danger[500],
      secondary: palette.default[500],
      light: palette.default[300],
    },
    sizes: {
      xs: fontSize.xs,
      sm: fontSize.sm,
      md: fontSize.md,
      lg: fontSize.lg,
      xl: fontSize.xl,
      xxl: fontSize.xl * 1.2,
    },
    titles: {
      1: { fontSize: 30, lineHeight: 34 },
      2: { fontSize: 26, lineHeight: 30 },
      3: { fontSize: 22, lineHeight: 26 },
      4: { fontSize: 20, lineHeight: 24 },
      5: { fontSize: 16, lineHeight: 20 },
      6: { fontSize: 14, lineHeight: 18 },
    },
    typography: {
      fontFamily: typography.fontFamily,
      weight: {
        regular: typography.weight.regular,
        medium: typography.weight.medium,
        strong: typography.weight.semiBold,
      },
    },
    opacity: {
      disabled: foundations.opacity.disabled,
    },
  }
}
