import * as React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import type { Foundations } from '../../design-system/tokens'
import { deepMerge } from '../../utils/deepMerge'

export interface ProgressTokens {
  colors: {
    track: string
    indicator: string
    pivotText: string
  }
  sizes: {
    height: number
    pivotFont: number
    pivotPaddingHorizontal: number
    pivotPaddingVertical: number
  }
}

const createProgressTokens = (foundations: Foundations): ProgressTokens => ({
  colors: {
    track: foundations.palette.default[100],
    indicator: foundations.palette.primary[500],
    pivotText: '#ffffff',
  },
  sizes: {
    height: 4,
    pivotFont: foundations.fontSize.xs,
    pivotPaddingHorizontal: foundations.spacing.xs,
    pivotPaddingVertical: 2,
  },
})

export const useProgressTokens = (overrides?: DeepPartial<ProgressTokens>): ProgressTokens => {
  const { foundations, components } = useTheme()
  const base = React.useMemo(() => createProgressTokens(foundations), [foundations])
  const componentOverrides = components?.progress as DeepPartial<ProgressTokens> | undefined
  const merged = componentOverrides
    ? overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides
    : overrides
  return merged ? deepMerge(base, merged) : base
}
