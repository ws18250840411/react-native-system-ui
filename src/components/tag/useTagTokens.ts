import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createTagTokens, type TagTokens } from './tokens'

export const useTagTokens = (overrides?: DeepPartial<TagTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createTagTokens(foundations)
    const globalOverrides = components
      ? (components['tag'] as DeepPartial<TagTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
