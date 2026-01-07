import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { CountDownTokens } from './types'

export const createCountDownTokens = (foundations: Foundations): CountDownTokens => {
  const { palette, fontSize, typography } = foundations
  const size = fontSize.sm

  return {
    text: {
      color: palette.default[800],
      fontSize: size,
      lineHeight: 20,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.regular,
    },
  }
}

export const useCountDownTokens = createComponentTokensHook('countDown', createCountDownTokens)
