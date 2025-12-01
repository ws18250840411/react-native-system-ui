import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface NavBarTokens {
  defaults: {
    fixed: boolean
    placeholder: boolean
    border: boolean
    safeAreaInsetTop: boolean
  }
  colors: {
    background: string
    text: string
    description: string
    border: string
    icon: string
  }
  layout: {
    height: number
    paddingHorizontal: number
  }
  typography: {
    titleSize: number
    titleWeight: string | number
    descriptionSize: number
  }
}

const createTokens = (foundations: Foundations): NavBarTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      fixed: true,
      placeholder: true,
      border: true,
      safeAreaInsetTop: true,
    },
    colors: {
      background: palette.background?.base ?? '#ffffff',
      text: palette.default[900],
      description: palette.default[500],
      border: palette.default[200],
      icon: palette.default[700],
    },
    layout: {
      height: 52,
      paddingHorizontal: spacing.md,
    },
    typography: {
      titleSize: fontSize.lg,
      titleWeight: '600',
      descriptionSize: fontSize.sm,
    },
  }
}

export const useNavBarTokens = (
  overrides?: DeepPartial<NavBarTokens>
): NavBarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.navBar as DeepPartial<NavBarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
