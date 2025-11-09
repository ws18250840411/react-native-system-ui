import React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createButtonTokens, type ButtonTokens } from './tokens'

export const useButtonTokens = (overrides?: DeepPartial<ButtonTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createButtonTokens(foundations)
    const globalOverrides = components
      ? (components['button'] as DeepPartial<ButtonTokens> | undefined)
      : undefined

    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides

    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}
