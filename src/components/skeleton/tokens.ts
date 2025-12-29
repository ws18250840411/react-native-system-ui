import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface SkeletonTokens {
  defaults: {
    rowCount: number
    rowWidth: number | string
    lastRowWidth: number | string
    rowHeight: number | string
    avatarSize: number | string
    titleWidth: number | string
  }
  colors: {
    block: string
    highlight: string
  }
  radius: number
  spacing: {
    containerGap: number
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
    defaults: {
      rowCount: 3,
      rowWidth: '100%',
      lastRowWidth: '60%',
      rowHeight: 16,
      avatarSize: 32,
      titleWidth: '40%',
    },
    colors: {
      block: palette.default[100],
      highlight: palette.default[50],
    },
    radius: radii.sm,
    spacing: {
      containerGap: 12,
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
    const componentOverrides = components?.skeleton
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
