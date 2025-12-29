import React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface OverlayTokens {
  colors: {
    backdrop: string
  }
  animationDuration: number
}

export const createOverlayTokens = (_foundations: Foundations): OverlayTokens => ({
  colors: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  animationDuration: 300,
})

export const useOverlayTokens = (overrides?: DeepPartial<OverlayTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createOverlayTokens(foundations)
    const globalOverrides = components?.overlay
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
