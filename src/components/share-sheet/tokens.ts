import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface ShareSheetTokens {
  colors: {
    background: string
    title: string
    description: string
    option: string
    optionDesc: string
    border?: string
  }
  spacing: {
    horizontal: number
    vertical: number
    gap: number
  }
  sizing: {
    icon: number
  }
  typography: {
    title: number
    description: number
    option: number
    optionDesc: number
  }
}

const createTokens = (foundations: Foundations): ShareSheetTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    colors: {
      background: palette.default[50],
      title: palette.default[900],
      description: palette.default[500],
      option: palette.default[900],
      optionDesc: palette.default[500],
    },
    spacing: {
      horizontal: spacing.md,
      vertical: spacing.sm,
      gap: spacing.xs,
    },
    sizing: {
      icon: 48,
    },
    typography: {
      title: fontSize.md,
      description: fontSize.xs,
      option: fontSize.xs,
      optionDesc: fontSize.xxs,
    },
  }
}

export const useShareSheetTokens = (
  overrides?: DeepPartial<ShareSheetTokens>,
): ShareSheetTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.shareSheet
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
