import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface RateTokens {
  defaults: {
    count: number
    allowHalf: boolean
    size: number
    gutter: number
    touchable: boolean
  }
  colors: {
    active: string
    inactive: string
    disabled: string
  }
}

const createRateTokens = (foundations: Foundations): RateTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      count: 5,
      allowHalf: false,
      size: fontSize.lg,
      gutter: spacing.xs,
      touchable: true,
    },
    colors: {
      active: palette.warning[500] ?? '#fa8c16',
      inactive: palette.default[200],
      disabled: palette.default[400],
    },
  }
}

export const useRateTokens = (
  overrides?: DeepPartial<RateTokens>
): RateTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createRateTokens(foundations)
    const componentOverrides = components?.rate as DeepPartial<RateTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
