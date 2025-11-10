import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createBadgeTokens, type BadgeTokens } from './tokens'

export const useBadgeTokens = (overrides?: DeepPartial<BadgeTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createBadgeTokens(foundations)
    const globalOverrides = components
      ? (components['badge'] as DeepPartial<BadgeTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
