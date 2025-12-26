import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SidebarTokens {
  colors: {
    background: string
    border: string
    title: string
    titleActive: string
    disabled: string
    indicator: string
  }
  layout: {
    width: number
    itemHeight: number
    indicatorWidth: number
  }
  typography: {
    fontSize: number
    fontWeight: string | number
  }
}

const createTokens = (foundations: Foundations): SidebarTokens => {
  const { palette, fontSize } = foundations
  return {
    colors: {
      background: '#ffffff',
      border: palette.default[200],
      title: palette.default[800],
      titleActive: palette.primary[600],
      disabled: palette.default[400],
      indicator: palette.primary[600],
    },
    layout: {
      width: 120,
      itemHeight: 48,
      indicatorWidth: 4,
    },
    typography: {
      fontSize: fontSize.md,
      fontWeight: '500',
    },
  }
}

export const useSidebarTokens = (
  overrides?: DeepPartial<SidebarTokens>,
): SidebarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.sidebar as DeepPartial<SidebarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
