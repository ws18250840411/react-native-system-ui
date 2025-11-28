import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { StepperSize, StepperTheme } from './types'

export interface StepperTokens {
  defaults: {
    size: StepperSize
    theme: StepperTheme
    showInput: boolean
    showPlus: boolean
    showMinus: boolean
    longPress: boolean
  }
  sizes: Record<StepperSize, {
    height: number
    buttonWidth: number
    inputWidth: number
    fontSize: number
  }>
  colors: {
    border: string
    background: string
    inputBackground: string
    icon: string
    iconDisabled: string
    text: string
    textDisabled: string
  }
  radii: {
    default: number
    round: number
  }
}

const createStepperTokens = (foundations: Foundations): StepperTokens => {
  const { palette, radii, fontSize } = foundations
  return {
    defaults: {
      size: 'medium',
      theme: 'default',
      showInput: true,
      showPlus: true,
      showMinus: true,
      longPress: true,
    },
    sizes: {
      medium: {
        height: 36,
        buttonWidth: 36,
        inputWidth: 72,
        fontSize: fontSize.md,
      },
      small: {
        height: 30,
        buttonWidth: 30,
        inputWidth: 60,
        fontSize: fontSize.sm,
      },
    },
    colors: {
      border: palette.default[200],
      background: palette.default[50],
      inputBackground: '#ffffff',
      icon: palette.default[800],
      iconDisabled: palette.default[400],
      text: palette.default[900],
      textDisabled: palette.default[400],
    },
    radii: {
      default: radii.sm,
      round: radii.pill,
    },
  }
}

export const useStepperTokens = (
  overrides?: DeepPartial<StepperTokens>
): StepperTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createStepperTokens(foundations)
    const componentOverrides = components?.stepper as DeepPartial<StepperTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

export type { StepperSize, StepperTheme }
