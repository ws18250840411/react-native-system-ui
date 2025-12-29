import React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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
    titleSize: number
    titleLineHeight: number
    titleWeight: string
    messageSize: number
    messageLineHeight: number
    actionSize: number
    actionWeight: string
  }
}

export const createDialogTokens = (foundations: Foundations): DialogTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const foreground = palette.default.foreground ?? '#111827'
  const secondary = palette.default[600]

  return {
    colors: {
      background: '#ffffff',
      title: foreground,
      message: secondary,
      divider: 'rgba(0,0,0,0.08)',
      cancel: palette.default[700],
      confirm: palette.danger[500],
      closeIcon: palette.default[500],
    },
    spacing: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      titlePaddingTop: 22,
      titleIsolatedPadding: spacing.lg, // var(--rv-padding-lg)
      messagePadding: 20,
      messagePaddingTop: spacing.xs, // var(--rv-padding-xs)
      messagePaddingHorizontal: spacing.lg, // var(--rv-padding-lg)
      titleGap: spacing.sm,
      footerGap: spacing.md,
      roundFooterPadding: spacing.md,
      roundFooterGap: spacing.sm,
    },
    sizes: {
      minWidth: 280,
      maxWidth: 360,
      borderRadius: radii.lg,
      closeSize: 20,
      actionHeight: 48,
      roundButtonHeight: 40, // var(--rv-dialog-round-button-height)
    },
    typography: {
      titleSize: fontSize.md,
      titleLineHeight: fontSize.md * typography.lineHeightMultiplier,
      titleWeight: String(typography.weight.semiBold),
      messageSize: fontSize.sm,
      messageLineHeight: fontSize.sm * typography.lineHeightMultiplier,
      actionSize: fontSize.md,
      actionWeight: String(typography.weight.medium),
    },
  }
}

export const useDialogTokens = (overrides?: DeepPartial<DialogTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createDialogTokens(foundations)
    const globalOverrides = components?.dialog as DeepPartial<DialogTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
