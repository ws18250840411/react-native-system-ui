import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { SearchShape } from './types'

export interface SearchTokens {
  defaults: {
    shape: SearchShape
    clearTrigger: 'always' | 'focus'
  }
  colors: {
    background: string
    contentBackground: string
    label: string
    action: string
    icon: string
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    labelGap: number
    actionGap: number
    contentPaddingHorizontal: number
    contentPaddingVertical: number
  }
  radius: {
    square: number
    round: number
  }
  typography: {
    label: number
    action: number
  }
  icon: {
    size: number
  }
}

const createSearchTokens = (foundations: Foundations): SearchTokens => ({
  defaults: {
    shape: 'square',
    clearTrigger: 'focus',
  },
  colors: {
    background: foundations.palette.default[50],
    contentBackground: '#ffffff',
    label: foundations.palette.default[600],
    action: foundations.palette.primary[500],
    icon: foundations.palette.default[400],
  },
  spacing: {
    paddingHorizontal: foundations.spacing.md,
    paddingVertical: foundations.spacing.sm,
    labelGap: foundations.spacing.sm,
    actionGap: foundations.spacing.sm,
    contentPaddingHorizontal: foundations.spacing.sm,
    contentPaddingVertical: foundations.spacing.xs,
  },
  radius: {
    square: foundations.radii.md,
    round: foundations.radii.pill,
  },
  typography: {
    label: foundations.fontSize.sm,
    action: foundations.fontSize.sm,
  },
  icon: {
    size: foundations.fontSize.md,
  },
})

export const useSearchTokens = (
  overrides?: DeepPartial<SearchTokens>,
): SearchTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSearchTokens(foundations)
    const componentOverrides = components?.search as
      | DeepPartial<SearchTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
