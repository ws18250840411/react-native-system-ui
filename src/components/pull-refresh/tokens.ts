import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface PullRefreshTokens {
  colors: {
    text: string
    success: string
  }
  sizing: {
    headHeight: number
  }
}

const createTokens = (foundations: Foundations): PullRefreshTokens => {
  const { palette } = foundations
  return {
    colors: {
      text: palette.default[600],
      success: palette.success?.[500] ?? '#4caf50',
    },
    sizing: {
      headHeight: 50,
    },
  }
}

export const usePullRefreshTokens = createComponentTokensHook(
  'pullRefresh',
  createTokens
)
