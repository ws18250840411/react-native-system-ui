import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { SwitchSize } from './types'

export interface SwitchTokens {
  defaults: {
    size: SwitchSize
    labelPosition: 'left' | 'right'
  }
  sizes: Record<
    SwitchSize,
    {
      trackWidth: number
      trackHeight: number
      handleSize: number
      padding: number
    }
  >
  colors: {
    activeTrack: string
    inactiveTrack: string
    disabledTrack: string
    handle: string
    activeHandle: string
    label: string
    labelDisabled: string
    loading: string
  }
  spacing: {
    labelGap: number
  }
}

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, spacing } = foundations
  return {
    defaults: {
      size: 'medium',
      labelPosition: 'right',
    },
    sizes: {
      medium: {
        trackWidth: 52,
        trackHeight: 32,
        handleSize: 28,
        padding: 2,
      },
      small: {
        trackWidth: 44,
        trackHeight: 26,
        handleSize: 22,
        padding: 2,
      },
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: palette.default[300],
      disabledTrack: palette.default[200],
      handle: '#ffffff',
      activeHandle: '#ffffff',
      label: palette.default[800],
      labelDisabled: palette.default[400],
      loading: palette.primary[50],
    },
    spacing: {
      labelGap: spacing.sm,
    },
  }
}

export const useSwitchTokens = (
  overrides?: DeepPartial<SwitchTokens>
): SwitchTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSwitchTokens(foundations)
    const componentOverrides = components?.switch as
      | DeepPartial<SwitchTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
