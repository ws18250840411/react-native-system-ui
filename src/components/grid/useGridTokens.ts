import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createGridTokens, type GridTokens } from './tokens'

export const useGridTokens = (overrides?: DeepPartial<GridTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createGridTokens(foundations)
    const globalOverrides = components
      ? (components['grid'] as DeepPartial<GridTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
