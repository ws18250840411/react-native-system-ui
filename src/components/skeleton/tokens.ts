import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SkeletonTokens {
  colors: {
    block: string
    highlight: string
  }
  radius: number
  spacing: {
    rowGap: number
  }
  animation: {
    duration: number
    minOpacity: number
    maxOpacity: number
  }
}

const createTokens = (foundations: Foundations): SkeletonTokens => {
  const { palette, spacing, radii } = foundations
  return {
    colors: {
      block: palette.default[100],
      highlight: palette.default[50],
    },
    radius: radii.sm,
    spacing: {
      rowGap: spacing.xs,
    },
    animation: {
      duration: 1200,
      minOpacity: 0.3,
      maxOpacity: 0.85,
    },
  }
}

export const useSkeletonTokens = (overrides?: DeepPartial<SkeletonTokens>): SkeletonTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.skeleton as DeepPartial<SkeletonTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
