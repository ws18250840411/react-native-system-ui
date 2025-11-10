import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createProgressTokens, type ProgressTokens } from './tokens'

export const useProgressTokens = (overrides?: DeepPartial<ProgressTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createProgressTokens(foundations)
    const globalOverrides = components
      ? (components['progress'] as DeepPartial<ProgressTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
