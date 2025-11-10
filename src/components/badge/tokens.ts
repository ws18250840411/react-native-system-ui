import type { Foundations } from '../../design-system'

export interface BadgeTokens {
  defaults: {
    showZero: boolean
  }
  colors: {
    background: string
    dot: string
    text: string
  }
  sizes: {
    height: number
    paddingHorizontal: number
    dotSize: number
    borderRadius: number
  }
  typography: {
    fontSize: number
    fontWeight: string
    fontFamily: string
    lineHeight: number
  }
}

export const createBadgeTokens = (foundations: Foundations): BadgeTokens => {
  const { palette, spacing, fontSize, radii, typography } = foundations

  return {
    defaults: {
      showZero: true,
    },
    colors: {
      background: palette.danger[500],
      dot: palette.danger[500],
      text: palette.danger.foreground ?? '#ffffff',
    },
    sizes: {
      height: 18,
      paddingHorizontal: spacing.xs,
      dotSize: 8,
      borderRadius: radii.pill,
    },
    typography: {
      fontSize: fontSize.xs,
      fontWeight: typography.weight.bold,
      fontFamily: typography.fontFamily,
      lineHeight: fontSize.xs * typography.lineHeightMultiplier,
    },
  }
}
