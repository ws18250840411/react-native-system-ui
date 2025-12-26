import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface PopoverTokens {
  colors: {
    background: string
    text: string
    shadow: string
    overlay: string
  }
  radii: {
    panel: number
  }
  shadow: {
    radius: number
    offsetY: number
    opacity: number
  }
}

const createTokens = (foundations: Foundations): PopoverTokens => {
  const { palette, radii } = foundations
  return {
    colors: {
      background: '#ffffff',
      text: palette.default[900],
      shadow: '#000000',
      overlay: 'rgba(0,0,0,0.2)',
    },
    radii: {
      panel: radii.md,
    },
    shadow: {
      radius: 8,
      offsetY: 4,
      opacity: 0.1,
    },
  }
}

export const usePopoverTokens = (
  overrides?: DeepPartial<PopoverTokens>,
): PopoverTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.popover as DeepPartial<PopoverTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
