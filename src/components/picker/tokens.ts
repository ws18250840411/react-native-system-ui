import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface PickerTokens {
  colors: {
    background: string
    indicator: string
    indicatorBorder: string
    text: string
    textActive: string
    toolbarBackground: string
    toolbarText: string
  }
  sizing: {
    itemHeight: number
    visibleItemCount: number
  }
  spacing: {
    toolbarPadding: number
  }
  typography: {
    fontSize: number
    fontFamily: string
    fontWeight: string
  }
}

const createPickerTokens = (foundations: Foundations): PickerTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  return {
    colors: {
      background: '#ffffff',
      indicator: palette.default[50],
      indicatorBorder: palette.default[200],
      text: palette.default[600],
      textActive: palette.default[900],
      toolbarBackground: '#ffffff',
      toolbarText: palette.default[900],
    },
    sizing: {
      itemHeight: 44,
      visibleItemCount: 5,
    },
    spacing: {
      toolbarPadding: spacing.md,
    },
    typography: {
      fontSize: fontSize.md,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.medium,
    },
  }
}

export const usePickerTokens = (
  overrides?: DeepPartial<PickerTokens>,
): PickerTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPickerTokens(foundations)
    const componentOverrides = components?.picker as DeepPartial<PickerTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
