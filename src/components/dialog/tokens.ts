import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { TextStyle } from 'react-native'

export interface DialogTokens {
  colors: {
    background: string
    title: string
    message: string
    divider: string
    cancel: string
    confirm: string
    closeIcon: string
  }
  spacing: {
    paddingHorizontal: number
    paddingTop: number
    paddingBottom: number
    titlePaddingTop: number
    titleIsolatedPadding: number
    messagePadding: number
    messagePaddingTop: number
    messagePaddingHorizontal: number
    titleGap: number
    footerGap: number
    roundFooterPadding: number
    roundFooterGap: number
    closeIconPadding: number
  }
  sizes: {
    minWidth: number
    maxWidth: number
    borderRadius: number
    closeSize: number
    actionHeight: number
    roundButtonHeight: number
  }
  typography: {
    fontFamily: string
    titleSize: number
    titleLineHeight: number
    titleWeight: TextStyle['fontWeight']
    messageSize: number
    messageLineHeight: number
    actionSize: number
    actionWeight: TextStyle['fontWeight']
  }
}

export const createDialogTokens = (foundations: Foundations): DialogTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const onSurface = palette.default[900]
  const secondary = palette.default[600]

  return {
    colors: {
      background: '#ffffff',
      title: onSurface,
      message: secondary,
      divider: palette.default[200],
      cancel: palette.default[700],
      confirm: palette.danger[500],
      closeIcon: palette.default[500],
    },
    spacing: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      titlePaddingTop: 22,
      titleIsolatedPadding: spacing.lg, 
      messagePadding: 20,
      messagePaddingTop: spacing.xs, 
      messagePaddingHorizontal: spacing.lg, 
      titleGap: spacing.sm,
      footerGap: spacing.md,
      roundFooterPadding: spacing.md,
      roundFooterGap: spacing.sm,
      closeIconPadding: spacing.xs,
    },
    sizes: {
      minWidth: 280,
      maxWidth: 360,
      borderRadius: radii.lg,
      closeSize: 20,
      actionHeight: 48,
      roundButtonHeight: 40, 
    },
    typography: {
      fontFamily: typography.fontFamily,
      titleSize: fontSize.md,
      titleLineHeight: fontSize.md * typography.lineHeightMultiplier,
      titleWeight: typography.weight.semiBold,
      messageSize: fontSize.sm,
      messageLineHeight: fontSize.sm * typography.lineHeightMultiplier,
      actionSize: fontSize.md,
      actionWeight: typography.weight.medium,
    },
  }
}

export const useDialogTokens = createComponentTokensHook('dialog', createDialogTokens)
