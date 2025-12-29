import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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

export const usePullRefreshTokens = (
  overrides?: DeepPartial<PullRefreshTokens>,
): PullRefreshTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.pullRefresh
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
