import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface ImagePreviewTokens {
  colors: {
    background: string
    indexBackground: string
    indexText: string
    indicatorActive: string
    indicatorInactive: string
  }
}

const createTokens = (foundations: Foundations): ImagePreviewTokens => {
  const { palette } = foundations
  return {
    colors: {
      background: 'rgba(0,0,0,0.95)',
      indexBackground: 'rgba(0,0,0,0.35)',
      indexText: '#fff',
      indicatorActive: palette.primary?.[500] ?? '#1989fa',
      indicatorInactive: 'rgba(255,255,255,0.4)',
    },
  }
}

export const useImagePreviewTokens = (
  overrides?: DeepPartial<ImagePreviewTokens>,
): ImagePreviewTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.imagePreview
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
