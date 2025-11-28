import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SelectorTokens {
  defaults: {
    columns: number
    multiple: boolean
    showCheckMark: boolean
  }
  colors: {
    border: string
    borderActive: string
    background: string
    backgroundActive: string
    text: string
    textActive: string
    description: string
    disabledText: string
    check: string
  }
  spacing: {
    gap: number
    paddingVertical: number
    paddingHorizontal: number
    descriptionMarginTop: number
  }
  radii: {
    item: number
  }
  typography: {
    fontSize: number
    descriptionSize: number
    fontFamily: string
    fontWeight: string
  }
}

const createSelectorTokens = (foundations: Foundations): SelectorTokens => {
  const { palette, spacing, radii, typography, fontSize } = foundations
  return {
    defaults: {
      columns: 2,
      multiple: false,
      showCheckMark: true,
    },
    colors: {
      border: palette.default[200],
      borderActive: palette.primary[500],
      background: palette.default[50],
      backgroundActive: palette.primary[50] ?? '#f2f6ff',
      text: palette.default[900],
      textActive: palette.primary[600],
      description: palette.default[500],
      disabledText: palette.default[400],
      check: palette.primary[600],
    },
    spacing: {
      gap: spacing.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      descriptionMarginTop: spacing.xs,
    },
    radii: {
      item: radii.sm,
    },
    typography: {
      fontSize: fontSize.md,
      descriptionSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.medium,
    },
  }
}

export const useSelectorTokens = (
  overrides?: DeepPartial<SelectorTokens>
): SelectorTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSelectorTokens(foundations)
    const componentOverrides = components?.selector as DeepPartial<SelectorTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
