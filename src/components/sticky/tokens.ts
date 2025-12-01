import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface StickyTokens {
  defaults: {
    offsetTop: number
    zIndex: number
    enableShadow: boolean
    backgroundColor: string
  }
  shadow: {
    color: string
    opacity: number
    radius: number
    offsetY: number
    elevation: number
  }
}

const createTokens = (foundations: Foundations): StickyTokens => {
  const { palette } = foundations
  return {
    defaults: {
      offsetTop: 0,
      zIndex: 99,
      enableShadow: true,
      backgroundColor: palette.background?.base ?? '#ffffff',
    },
    shadow: {
      color: '#000000',
      opacity: 0.08,
      radius: 12,
      offsetY: 6,
      elevation: 6,
    },
  }
}

export const useStickyTokens = (
  overrides?: DeepPartial<StickyTokens>
): StickyTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.sticky as DeepPartial<StickyTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
