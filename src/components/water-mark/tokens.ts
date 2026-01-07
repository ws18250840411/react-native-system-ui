import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { WaterMarkTokens } from './types'

const createTokens = (foundations: Foundations): WaterMarkTokens => {
  const { palette } = foundations
  return {
    gapX: 24,
    gapY: 48,
    rotate: -22,
    fontSize: 14,
    color: palette.default[500],
    opacity: 0.15,
  }
}

export const useWaterMarkTokens = createComponentTokensHook('waterMark', createTokens)
