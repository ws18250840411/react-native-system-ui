import * as React from 'react'

import { useTheme } from '../../design-system'
import { resolveSemanticColors, type Foundations } from '../../design-system/tokens'
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
  shadow: {
    outer: {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
    inner: {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  }
  loader: {
    size: number
  }
}

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, opacity } = foundations
  const { surface } = resolveSemanticColors(palette)
  return {
    defaults: {
      size: 30,
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: surface,
      handle: surface,
      border: palette.default[300],
    },
    opacity: {
      disabled: opacity.disabled,
      pressed: opacity.pressed,
    },
    animation: {
      duration: 200,
    },
    shadow: {
      outer: {
        color: '#000000',
        opacity: 0.06,
        radius: 3,
        offsetY: 3,
        elevation: 3,
      },
      inner: {
        color: '#000000',
        opacity: 0.12,
        radius: 2,
        offsetY: 2,
        elevation: 2, // Approximate for Web boxShadow logic
      },
    },
    loader: {
      size: 13,
    },
  }
}

export const useSwitchTokens = (
  overrides?: DeepPartial<SwitchTokens>
): SwitchTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSwitchTokens(foundations)
    const componentOverrides = components?.switch
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
