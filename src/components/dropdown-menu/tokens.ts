import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface DropdownMenuTokens {
  colors: {
    text: string
    activeText: string
    placeholder: string
    panelBackground: string
    divider: string
  }
  spacing: {
    horizontal: number
    vertical: number
  }
  sizing: {
    panelMaxHeight: number
  }
}

const createTokens = (foundations: Foundations): DropdownMenuTokens => {
  const { palette, spacing } = foundations
  return {
    colors: {
      text: palette.default[900],
      activeText: palette.primary[600],
      placeholder: palette.default[500],
      panelBackground: palette.background?.base ?? '#ffffff',
      divider: palette.default[200],
    },
    spacing: {
      horizontal: spacing.md,
      vertical: spacing.sm,
    },
    sizing: {
      panelMaxHeight: 320,
    },
  }
}

export const useDropdownMenuTokens = (
  overrides?: DeepPartial<DropdownMenuTokens>,
): DropdownMenuTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.dropdownMenu as DeepPartial<DropdownMenuTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
