import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createDividerTokens, type DividerTokens } from './tokens'

export const useDividerTokens = (overrides?: DeepPartial<DividerTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createDividerTokens(foundations)
    const globalOverrides = components
      ? (components['divider'] as DeepPartial<DividerTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
