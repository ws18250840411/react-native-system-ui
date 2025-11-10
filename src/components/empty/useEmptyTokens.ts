import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createEmptyTokens, type EmptyTokens } from './tokens'

export const useEmptyTokens = (overrides?: DeepPartial<EmptyTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createEmptyTokens(foundations)
    const globalOverrides = components
      ? (components['empty'] as DeepPartial<EmptyTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
