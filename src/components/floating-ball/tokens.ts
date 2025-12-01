import * as React from 'react'

import { useTheme } from '../../design-system'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { Foundations } from '../../design-system/tokens'

export interface FloatingBallTokens {
  size: number
  padding: number
  colors: {
    background: string
    text: string
    shadow: string
  }
  shadow: {
    radius: number
    offsetY: number
    opacity: number
  }
}

const createTokens = (foundations: Foundations): FloatingBallTokens => {
  const { palette, spacing } = foundations
  return {
    size: 56,
    padding: spacing.sm,
    colors: {
      background: palette.primary[500],
      text: palette.primary.foreground ?? '#fff',
      shadow: 'rgba(0,0,0,0.2)',
    },
    shadow: {
      radius: 12,
      offsetY: 4,
      opacity: 0.35,
    },
  }
}

export const useFloatingBallTokens = (overrides?: DeepPartial<FloatingBallTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.floatingBall as DeepPartial<FloatingBallTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
