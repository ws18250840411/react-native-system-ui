import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { RateTokens } from './types'

export const createRateTokens = (foundations: Foundations): RateTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      count: 5,
      allowHalf: false,
      size: fontSize.lg,
      gutter: spacing.xs,
      touchable: true,
      disabled: false,
      readOnly: false,
    },
    layout: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconBox: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      },
      character: {
        includeFontPadding: false,
      },
      fill: {
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden',
      },
    },
    colors: {
      active: palette.warning[500] ?? '#fa8c16',
      inactive: palette.default[200],
      disabled: palette.default[400],
    },
    states: {
      pressedOpacity: 0.75,
    },
  }
}

export const useRateTokens = createComponentTokensHook('rate', createRateTokens)
