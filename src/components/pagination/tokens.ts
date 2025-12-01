import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface PaginationTokens {
  colors: {
    text: string
    disabled: string
    activeText: string
    activeBackground: string
    border: string
  }
  spacing: {
    gap: number
    paddingX: number
    paddingY: number
  }
  radius: number
}

const createTokens = (foundations: Foundations): PaginationTokens => {
  const { palette, spacing, radii } = foundations
  return {
    colors: {
      text: palette.default[600],
      disabled: palette.default[300],
      activeText: palette.primary.foreground ?? '#fff',
      activeBackground: palette.primary[500],
      border: palette.default[200],
    },
    spacing: {
      gap: spacing.xs,
      paddingX: spacing.sm,
      paddingY: spacing.xs,
    },
    radius: radii.sm,
  }
}

export const usePaginationTokens = (overrides?: DeepPartial<PaginationTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.pagination as DeepPartial<PaginationTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
