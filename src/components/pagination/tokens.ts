import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface PaginationTokens {
  colors: {
    text: string
    disabled: string
    activeText: string
    activeBackground: string
    border: string
  }
  spacing: {
    gap: number
    paddingX: number
    paddingY: number
  }
  radius: number
}

const createTokens = (foundations: Foundations): PaginationTokens => {
  const { palette, spacing, radii } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    colors: {
      text: palette.default[600],
      disabled: palette.default[300],
      activeText: onPrimary,
      activeBackground: palette.primary[500],
      border: palette.default[200],
    },
    spacing: {
      gap: spacing.xs,
      paddingX: spacing.sm,
      paddingY: spacing.xs,
    },
    radius: radii.sm,
  }
}

export const usePaginationTokens = createComponentTokensHook(
  'pagination',
  createTokens
)
