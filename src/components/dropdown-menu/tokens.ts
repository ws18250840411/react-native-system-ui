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
    disabledText: string
    arrow: string
    panelBackground: string
    mask: string
    divider: string
    barBackground: string
  }
  spacing: {
    horizontal: number
    vertical: number
    titlePadding: number
  }
  sizing: {
    barHeight: number
    titleFontSize: number
    titleLineHeight: number
    panelMaxHeight: number
  }
  shadow: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
}

const createTokens = (foundations: Foundations): DropdownMenuTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  return {
    colors: {
      text: palette.default[900],
      activeText: palette.danger[500], // var(--rv-danger-color)
      placeholder: palette.default[500],
      disabledText: palette.default[400],
      arrow: palette.default[500],
      panelBackground: '#ffffff',
      mask: 'rgba(0,0,0,0.45)',
      divider: palette.default[200],
      barBackground: '#ffffff',
    },
    spacing: {
      horizontal: spacing.md,
      vertical: spacing.sm,
      titlePadding: spacing.xs, // var(--rv-padding-xs)
    },
    sizing: {
      barHeight: 48, // 48 * @hd
      titleFontSize: 15, // 15 * @hd
      titleLineHeight: fontSize.lg * typography.lineHeightMultiplier, // var(--rv-line-height-lg)
      panelMaxHeight: 320, // 80% of screen height
    },
    shadow: {
      shadowColor: 'rgba(100, 101, 102, 0.12)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 3,
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
