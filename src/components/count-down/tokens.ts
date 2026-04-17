import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import type { Foundations } from '../../design-system/tokens'
import type { CountDownTokens } from './types'

export const createCountDownTokens = (foundations: Foundations): CountDownTokens => {
  const { palette, fontSize, typography } = foundations
  const size = fontSize.sm

  return {
    defaults: {
      autoStart: true,
      millisecond: false,
      time: 0,
      format: 'HH:mm:ss',
    },
    layout: {
      text: {
        color: palette.default[800],
        fontSize: size,
        lineHeight: 20,
        fontFamily: typography.fontFamily,
        fontWeight: typography.weight.regular,
      },
    },
  }
}

export const useCountDownTokens = createComponentTokensHook('countDown', createCountDownTokens)
