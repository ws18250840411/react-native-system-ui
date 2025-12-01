import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface IndexBarTokens {
  colors: {
    text: string
    activeText: string
    indicatorBackground: string
    indicatorText: string
    stickyBackground: string
    border: string
  }
  layout: {
    indexWidth: number
    indicatorSize: number
    stickyHeight: number
    paddingVertical: number
    spacing: number
  }
}

const createTokens = (foundations: Foundations): IndexBarTokens => {
  const { palette, spacing } = foundations
  return {
    colors: {
      text: palette.default[600],
      activeText: palette.primary[600],
      indicatorBackground: 'rgba(0,0,0,0.6)',
      indicatorText: '#ffffff',
      stickyBackground: palette.background?.base ?? '#ffffff',
      border: palette.default[200],
    },
    layout: {
      indexWidth: 24,
      indicatorSize: 60,
      stickyHeight: 32,
      paddingVertical: spacing.sm,
      spacing: 4,
    },
  }
}

export const useIndexBarTokens = (
  overrides?: DeepPartial<IndexBarTokens>,
): IndexBarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.indexBar as DeepPartial<IndexBarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
