import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SliderTokens {
  track: {
    height: number
    radius: number
  }
  thumb: {
    size: number
    indicatorSize: number
    elevation: number
  }
  colors: {
    active: string
    inactive: string
    thumbBackground: string
    thumbIndicator: string
  }
  spacing: {
    containerPaddingVertical: number
  }
  layout: {
    verticalMinHeight: number
    verticalWidth: number
  }
  states: {
    disabledOpacity: number
  }
}

const createSliderTokens = (foundations: Foundations): SliderTokens => ({
  track: {
    height: 2,
    radius: foundations.radii.pill,
  },
  thumb: {
    size: foundations.spacing.lg + foundations.spacing.sm,
    indicatorSize: foundations.spacing.sm,
    elevation: 1,
  },
  colors: {
    active: foundations.palette.primary[500],
    inactive: foundations.palette.default[300],
    thumbBackground: '#ffffff',
    thumbIndicator: '#ffffff',
  },
  spacing: {
    containerPaddingVertical: foundations.spacing.md,
  },
  layout: {
    verticalMinHeight: 150,
    verticalWidth: 40,
  },
  states: {
    disabledOpacity: foundations.opacity.disabled,
  },
})

export const useSliderTokens = (
  overrides?: DeepPartial<SliderTokens>
): SliderTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSliderTokens(foundations)
    const componentOverrides = components?.slider as
      | DeepPartial<SliderTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
