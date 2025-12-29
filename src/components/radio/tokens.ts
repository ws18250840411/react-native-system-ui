import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { RadioLabelPosition } from './types'

export interface RadioTokens {
  defaults: {
    iconSize: number
    labelPosition: RadioLabelPosition
  }
  colors: {
    border: string
    background: string
    checkedBackground: string
    disabledBorder: string
    disabledBackground: string
    checkmark: string
    label: string
    labelDisabled: string
  }
  typography: {
    fontSize: number
    fontFamily: string
    fontWeight: string
    lineHeightMultiplier: number
  }
  spacing: {
    gap: number
    groupGap: number
  }
  shape: {
    roundRadius: number
    squareRadius: number
  }
  icon: {
    dotScale: number
  }
}

const createRadioTokens = (foundations: Foundations): RadioTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  const surface = palette.default[50] ?? '#ffffff'
  return {
    defaults: {
      iconSize: 20,
      labelPosition: 'right',
    },
    colors: {
      border: palette.default[400],
      background: surface,
      checkedBackground: palette.primary[500],
      disabledBorder: palette.default[300],
      disabledBackground: palette.default[100],
      checkmark: palette.primary.foreground ?? '#ffffff',
      label: palette.default.foreground ?? '#111827',
      labelDisabled: palette.default[400],
    },
    typography: {
      fontSize: fontSize.md,
      fontFamily: typography.fontFamily,
      fontWeight: String(typography.weight.medium),
      lineHeightMultiplier: typography.lineHeightMultiplier,
    },
    spacing: {
      gap: spacing.sm,
      groupGap: spacing.sm,
    },
    shape: {
      roundRadius: 999,
      squareRadius: 2,
    },
    icon: {
      dotScale: 0.5,
    },
  }
}

export const useRadioTokens = (
  overrides?: DeepPartial<RadioTokens>
): RadioTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createRadioTokens(foundations)
    const componentOverrides = components?.radio
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
