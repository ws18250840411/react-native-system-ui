import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface ActionSheetTokens {
  colors: {
    background: string
    title: string
    description: string
    item: string
    subitem: string
    cancel: string
    disabled: string
    border: string
    itemBackground: string
    itemPressedBackground: string
    cancelBackground: string
    cancelGapBackground: string
  }
  spacing: {
    horizontal: number
    vertical: number
    cancelGap: number
  }
  typography: {
    title: number
    item: number
    description: number
  }
}

const createTokens = (foundations: Foundations): ActionSheetTokens => {
  const { palette, spacing, fontSize } = foundations
  const surface = palette.default[50]
  return {
    colors: {
      background: surface,
      title: palette.default[900],
      description: palette.default[500],
      item: palette.default[900],
      subitem: palette.default[500],
      cancel: palette.default[900],
      disabled: palette.default[400],
      border: palette.default[200],
      itemBackground: surface,
      itemPressedBackground: palette.default[100],
      cancelBackground: surface,
      cancelGapBackground: palette.default[100] ?? '#f1f2f5',
    },
    spacing: {
      horizontal: spacing.md,
      vertical: 14,
      cancelGap: 8,
    },
    typography: {
      title: fontSize.lg,
      item: fontSize.md,
      description: fontSize.sm,
    },
  }
}

export const useActionSheetTokens = createComponentTokensHook(
  'actionSheet',
  createTokens
)
