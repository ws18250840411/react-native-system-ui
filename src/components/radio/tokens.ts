import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
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
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    defaults: {
      iconSize: 20,
      labelPosition: 'right',
    },
    colors: {
      border: palette.default[400],
      background: '#ffffff',
      checkedBackground: palette.primary[500],
      disabledBorder: palette.default[300],
      disabledBackground: palette.default[100],
      checkmark: onPrimary,
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

export const useRadioTokens = createComponentTokensHook(
  'radio',
  createRadioTokens
)
