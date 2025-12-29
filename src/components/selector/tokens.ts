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
    checkForeground: string
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
      columns: 3,
      multiple: false,
      showCheckMark: true,
    },
    colors: {
      border: 'transparent',
      borderActive: 'transparent',
      background: palette.default[50],
      backgroundActive: '#efefff',
      text: palette.default[900],
      textActive: palette.primary[600],
      description: palette.default[500],
      disabledText: palette.default[400],
      check: palette.primary[600],
      checkForeground: palette.primary.foreground ?? '#ffffff',
    },
    spacing: {
      gap: spacing.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      descriptionMarginTop: spacing.xxs,
    },
    radii: {
      item: radii.xs,
    },
    typography: {
      fontSize: fontSize.md,
      descriptionSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      fontWeight: String(typography.weight.medium),
    },
  }
}

export const useSelectorTokens = (
  overrides?: DeepPartial<SelectorTokens>
): SelectorTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSelectorTokens(foundations)
    const componentOverrides = components?.selector
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
