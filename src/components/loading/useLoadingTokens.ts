import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createLoadingTokens, type LoadingTokens } from './tokens'

export const useLoadingTokens = (overrides?: DeepPartial<LoadingTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createLoadingTokens(foundations)
    const globalOverrides = components
      ? (components['loading'] as DeepPartial<LoadingTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
