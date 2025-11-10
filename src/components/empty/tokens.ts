import type { Foundations } from '../../design-system'

export interface EmptyTokens {
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionMargin: number
    footerMargin: number
  }
  colors: {
    description: string
    iconBackground: string
    iconColor: string
  }
  sizes: {
    image: number
    fontSize: number
  }
}

export const createEmptyTokens = (foundations: Foundations): EmptyTokens => {
  return {
    spacing: {
      paddingVertical: foundations.spacing.xl,
      paddingHorizontal: foundations.spacing.xl,
      descriptionMargin: foundations.spacing.md,
      footerMargin: foundations.spacing.lg,
    },
    colors: {
      description: foundations.palette.default[500],
      iconBackground: foundations.palette.default[50],
      iconColor: foundations.palette.default[400],
    },
    sizes: {
      image: 120,
      fontSize: foundations.fontSize.lg,
    },
  }
}
