import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SwitchTokens {
  defaults: {
    size: number
  }
  colors: {
    activeTrack: string
    inactiveTrack: string
    handle: string
    border: string
  }
  opacity: {
    disabled: number
    pressed: number
  }
  animation: {
    duration: number
  }
}

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, opacity } = foundations
  return {
    defaults: {
      size: 30,
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: '#ffffff',
      handle: '#ffffff',
      border: 'rgba(0, 0, 0, 0.1)',
    },
    opacity: {
      disabled: opacity.disabled,
      pressed: opacity.pressed,
    },
    animation: {
      duration: 150,
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
