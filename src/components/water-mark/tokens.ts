import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface WaterMarkTokens {
  gapX: number
  gapY: number
  rotate: number
  fontSize: number
  color: string
  opacity: number
}

const createTokens = (foundations: Foundations): WaterMarkTokens => {
  const { palette, spacing } = foundations
  return {
    gapX: spacing.xl,
    gapY: spacing.xxl,
    rotate: -22,
    fontSize: 14,
    color: palette.default[500],
    opacity: 0.15,
  }
}

export const useWaterMarkTokens = (overrides?: DeepPartial<WaterMarkTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.waterMark as DeepPartial<WaterMarkTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
