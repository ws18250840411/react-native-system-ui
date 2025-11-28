import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface IconTokens {
  defaults: {
    size: number
    color: string
    spinDuration: number
  }
}

const createIconTokens = (foundations: Foundations): IconTokens => ({
  defaults: {
    size: foundations.fontSize.lg,
    color: foundations.palette.default[800],
    spinDuration: 1000,
  },
})

export const useIconTokens = (overrides?: DeepPartial<IconTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createIconTokens(foundations)
    const globalOverrides = components?.icon as DeepPartial<IconTokens> | undefined
    const merged =
      globalOverrides && overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
