import * as React from 'react'
import type { TextStyle } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { CheckboxShape } from './types'

export interface CheckboxTokens {
  defaults: {
    shape: CheckboxShape
    iconSize: number
    labelPosition: 'left' | 'right'
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
    fontWeight: TextStyle['fontWeight']
    lineHeightMultiplier: number
  }
  spacing: {
    gap: number
    groupGap: number
  }
  radii: {
    square: number
  }
  icon: {
    scale: number
  }
}

const createCheckboxTokens = (foundations: Foundations): CheckboxTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const surface = palette.default[50] ?? '#ffffff'
  return {
    defaults: {
      shape: 'round',
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
      fontWeight: typography.weight.medium,
      lineHeightMultiplier: typography.lineHeightMultiplier,
    },
    spacing: {
      gap: spacing.sm,
      groupGap: spacing.md,
    },
    radii: {
      square: radii.xs,
    },
    icon: {
      scale: 0.65,
    },
  }
}

export const useCheckboxTokens = (
  overrides?: DeepPartial<CheckboxTokens>
): CheckboxTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createCheckboxTokens(foundations)
    const componentOverrides = components?.checkbox
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
