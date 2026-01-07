import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

import type { TypographySize, TypographyTitleLevel, TypographyType } from './types'

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

const createTypographyTokens = ({
  palette,
  fontSize,
  typography,
  opacity,
}: Foundations): TypographyTokens => ({
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
      regular: String(typography.weight.regular),
      medium: String(typography.weight.medium),
      strong: String(typography.weight.semiBold),
    },
  },
  opacity: { disabled: opacity.disabled },
})

export const useTypographyTokens = createComponentTokensHook('typography', createTypographyTokens)

