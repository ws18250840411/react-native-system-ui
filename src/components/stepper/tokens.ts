import { type TextStyle } from 'react-native'
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
    transparent: string
  }
  radii: {
    default: number
  }
  typography: {
    fontFamily: string
    fontSize: number
    fontWeight: TextStyle['fontWeight']
  }
  opacity: {
    disabled: number
    roundDisabled: number
    pressed: number
  }
  spacing: {
    gap: number
    none: number
  }
}

const createStepperTokens = (foundations: Foundations): StepperTokens => {
  const { palette, radii, fontSize, opacity, typography } = foundations
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
      buttonDisabledBackground: '#ffffff',
      buttonDisabledIcon: palette.default[400],
      roundTheme: palette.primary[500],
      roundThemeText: onPrimary,
      roundThemeBackground: '#ffffff',
      inputText: palette.default[900],
      inputDisabledText: palette.default[400],
      inputDisabledBackground: palette.default[100],
      transparent: 'transparent',
    },
    radii: {
      default: radii.md,
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: fontSize.md,
      fontWeight: typography.weight.semiBold,
    },
    opacity: {
      disabled: opacity.disabled,
      roundDisabled: 0.3,
      pressed: opacity.pressed,
    },
    spacing: {
      gap: 2,
      none: foundations.spacing.none,
    },
  }
}

export const useStepperTokens = createComponentTokensHook(
  'stepper',
  createStepperTokens
)

export type { StepperTheme }
