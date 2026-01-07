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
  }
  sizing: {
    icon: number
  }
  typography: {
    title: number
    description: number
    option: number
    optionDesc: number
  }
}

const createTokens = (foundations: Foundations): ShareSheetTokens => {
  const { palette, spacing, fontSize } = foundations
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
    },
    sizing: {
      icon: 48,
    },
    typography: {
      title: fontSize.md,
      description: fontSize.xs,
      option: fontSize.xs,
      optionDesc: fontSize.xxs,
    },
  }
}

export const useShareSheetTokens = createComponentTokensHook(
  'shareSheet',
  createTokens
)
