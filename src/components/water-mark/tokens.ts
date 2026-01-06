import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface WaterMarkTokens {
  gapX: number
  gapY: number
  rotate: number
  fontSize: number
  color: string
  opacity: number
}

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

export const useWaterMarkTokens = createComponentTokensHook(
  'waterMark',
  createTokens
)
