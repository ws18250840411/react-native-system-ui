import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { EmptyTokens } from './types'

export const createEmptyTokens = (foundations: Foundations): EmptyTokens => {
  const paddingVertical = foundations.spacing.xl
  const paddingHorizontal = 0
  const gap = foundations.spacing.lg

  return {
    defaults: {
      image: 'default',
      gap,
    },
    layout: {
      container: {
        width: '100%',
        paddingVertical,
        paddingHorizontal,
        alignItems: 'center',
      },
      imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      descriptionText: {
        textAlign: 'center',
      },
      footer: {},
    },
    colors: {
      description: foundations.palette.default[500],
      icon: foundations.palette.default[300],
      imageBackground: 'transparent',
    },
    typography: {
      descriptionSize: foundations.fontSize.sm,
      descriptionLineHeight: 20,
      descriptionFontFamily: foundations.typography.fontFamily,
      descriptionFontWeight: foundations.typography.weight.regular,
    },
    sizing: {
      image: 160,
      iconScale: 0.6,
    },
    spacing: {
      descriptionPaddingHorizontal: 60,
      footerMarginTop: 24,
    },
  }
}

export const useEmptyTokens = createComponentTokensHook('empty', createEmptyTokens)
