import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { StepperTheme } from './types'

export interface StepperTokens {
  defaults: {
    theme: StepperTheme
    showInput: boolean
    showPlus: boolean
    showMinus: boolean
    longPress: boolean
    inputWidth: number
    buttonSize: number
  }
  colors: {
    active: string
    background: string
    buttonIcon: string
    buttonDisabledBackground: string
    buttonDisabledIcon: string
    roundTheme: string
    roundThemeText: string
    roundThemeBackground: string
    inputText: string
    inputDisabledText: string
    inputDisabledBackground: string
  }
  radii: {
    default: number
  }
  typography: {
    fontSize: number
    fontWeight: string
  }
  opacity: {
    disabled: number
    roundDisabled: number
    pressed: number
  }
  spacing: {
    gap: number
  }
}

const createStepperTokens = (foundations: Foundations): StepperTokens => {
  const { palette, radii, fontSize, opacity, typography } = foundations
  const surface = palette.default[50]
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    defaults: {
      theme: 'default',
      showInput: true,
      showPlus: true,
      showMinus: true,
      longPress: true,
      inputWidth: 32,
      buttonSize: 28,
    },
    colors: {
      active: palette.default[200],
      background: palette.default[100],
      buttonIcon: palette.default[900],
      buttonDisabledBackground: surface,
      buttonDisabledIcon: palette.default[400],
      roundTheme: palette.primary[500],
      roundThemeText: onPrimary,
      roundThemeBackground: surface,
      inputText: palette.default[900],
      inputDisabledText: palette.default[400],
      inputDisabledBackground: palette.default[100],
    },
    radii: {
      default: radii.md,
    },
    typography: {
      fontSize: fontSize.md,
      fontWeight: String(typography.weight.semiBold),
    },
    opacity: {
      disabled: opacity.disabled,
      roundDisabled: 0.3,
      pressed: opacity.pressed,
    },
    spacing: {
      gap: 2,
    },
  }
}

export const useStepperTokens = createComponentTokensHook(
  'stepper',
  createStepperTokens
)

export type { StepperTheme }
