import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface NumberKeyboardTokens {
  colors: {
    background: string
    title: string
    keyBackground: string
    keyActiveBackground: string
    keyText: string
    keyTextActive: string
    closeBackground: string
    closeText: string
    border: string
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    keyGap: number
    titlePadding: number
  }
  sizing: {
    keyHeight: number
    closeHeight: number
    fontSize: number
  }
  radii: {
    key: number
  }
  shadow: {
    color: string
    opacity: number
    radius: number
    offsetY: number
    elevation: number
  }
}

const createTokens = (foundations: Foundations): NumberKeyboardTokens => {
  const { palette, spacing, radii, fontSize } = foundations
  const surface = palette.default[50]
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    colors: {
      background: palette.default[100],
      title: palette.default[700],
      keyBackground: surface,
      keyActiveBackground: palette.default[100],
      keyText: palette.default[900],
      keyTextActive: palette.primary[600],
      closeBackground: palette.primary[600],
      closeText: onPrimary,
      border: palette.default[200],
    },
    spacing: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      keyGap: spacing.xs,
      titlePadding: spacing.md,
    },
    sizing: {
      keyHeight: 54,
      closeHeight: 44,
      fontSize: 28,
    },
    radii: {
      key: radii.xs,
    },
    shadow: {
      color: '#000000',
      opacity: 0.08,
      radius: 6,
      offsetY: 0,
      elevation: 6,
    },
  }
}

export const useNumberKeyboardTokens = createComponentTokensHook(
  'numberKeyboard',
  createTokens
)
