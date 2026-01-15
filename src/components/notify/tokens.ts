import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { NotifyTokens } from './types'

export const createNotifyTokens = (foundations: Foundations): NotifyTokens => ({
  defaults: {
    type: 'primary',
    position: 'top',
    duration: 3000,
    closeOnClick: false,
    animationDuration: 180,
    safeAreaInsetTop: true,
    safeAreaInsetBottom: false,
  },
  layout: {
    portal: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    container: {
      width: '100%',
    },
    safeArea: {
      width: '100%',
    },
    content: {
      width: '100%',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      includeFontPadding: false,
    },
  },
  colors: {
    variants: {
      primary: {
        background: foundations.palette.primary[500],
        text: foundations.palette.primary.foreground ?? '#ffffff',
      },
      success: {
        background: foundations.palette.success[500],
        text: foundations.palette.success.foreground ?? '#ffffff',
      },
      danger: {
        background: foundations.palette.danger[500],
        text: foundations.palette.danger.foreground ?? '#ffffff',
      },
      warning: {
        background: foundations.palette.warning[500],
        text: foundations.palette.warning.foreground ?? '#261400',
      },
    },
  },
  typography: {
    fontSize: foundations.fontSize.sm,
    lineHeight: Math.round(
      foundations.fontSize.sm * foundations.typography.lineHeightMultiplier
    ),
  },
  sizing: {
    minHeight: 40,
  },
  spacing: {
    paddingVertical: foundations.spacing.sm,
    paddingHorizontal: foundations.spacing.md,
  },
})

export const useNotifyTokens = createComponentTokensHook(
  'notify',
  createNotifyTokens
)
