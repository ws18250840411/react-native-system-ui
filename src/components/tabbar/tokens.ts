import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface TabbarTokens {
  defaults: {
    fixed: boolean
    border: boolean
    placeholder: boolean
    safeAreaInsetBottom: boolean
  }
  colors: {
    background: string
    border: string
    active: string
    inactive: string
  }
  layout: {
    height: number
    paddingHorizontal: number
    paddingVertical: number
  }
  icon: {
    size: number
  }
  typography: {
    fontSize: number
    fontWeight: string | number
  }
}

const createTokens = (foundations: Foundations): TabbarTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      fixed: true,
      border: true,
      placeholder: true,
      safeAreaInsetBottom: true,
    },
    colors: {
      background: palette.background?.base ?? '#ffffff',
      border: palette.default[200],
      active: palette.primary[600],
      inactive: palette.default[500],
    },
    layout: {
      height: 60,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xs,
    },
    icon: {
      size: 24,
    },
    typography: {
      fontSize: fontSize.sm,
      fontWeight: '500',
    },
  }
}

export const useTabbarTokens = (
  overrides?: DeepPartial<TabbarTokens>,
): TabbarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.tabbar as DeepPartial<TabbarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
