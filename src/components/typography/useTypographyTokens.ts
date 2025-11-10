import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createTypographyTokens, type TypographyTokens } from './tokens'

export const useTypographyTokens = (
  overrides?: DeepPartial<TypographyTokens>,
) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createTypographyTokens(foundations)
    const globalOverrides = components
      ? (components['typography'] as DeepPartial<TypographyTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
