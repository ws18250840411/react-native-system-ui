import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SliderTokens {
  track: {
    height: number
  }
  thumb: {
    size: number
  }
  colors: {
    active: string
    inactive: string
  }
}

const createSliderTokens = (foundations: Foundations): SliderTokens => ({
  track: {
    height: 2,
  },
  thumb: {
    size: foundations.spacing.lg + foundations.spacing.sm,
  },
  colors: {
    active: foundations.palette.primary[500],
    inactive: foundations.palette.default[300],
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
