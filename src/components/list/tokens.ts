import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { ListTokens } from './types'

export const createListTokens = (foundations: Foundations): ListTokens => {
  return {
    defaults: {
      finished: false,
      offset: 300,
      immediateCheck: true,
      scrollEventThrottle: 16,
    },
    layout: {
      footer: {
        alignItems: 'center',
      },
      loadingInline: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    colors: {
      errorText: '#ff5b05',
      finishedText: '#999999',
    },
    sizing: {
      loadingIndicator: 16,
    },
    spacing: {
      footerPaddingVertical: foundations.spacing.lg,
      inlineGap: foundations.spacing.sm,
    },
  }
}

export const useListTokens = createComponentTokensHook('list', createListTokens)

