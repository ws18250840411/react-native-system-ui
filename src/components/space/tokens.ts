import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { SpaceDirection, SpaceGap, SpaceSizePreset } from './types'

export interface SpaceTokens {
  defaults: {
    direction: SpaceDirection
    wrap: boolean
    gapPreset: SpaceSizePreset
  }
  presets: Record<SpaceSizePreset, number>
}

const createSpaceTokens = (foundations: Foundations): SpaceTokens => {
  const { spacing } = foundations
  return {
    defaults: {
      direction: 'horizontal',
      wrap: false,
      gapPreset: 'normal',
    },
    presets: {
      mini: spacing.xxs ?? spacing.xs ?? 4,
      small: spacing.xs,
      normal: spacing.sm,
      large: spacing.md,
    },
  }
}

export const useSpaceTokens = (
  overrides?: DeepPartial<SpaceTokens>
): SpaceTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createSpaceTokens(foundations)
    const componentOverrides = components?.space
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

export const resolveGapInput = (
  gap?: SpaceGap,
  size?: SpaceGap | SpaceSizePreset,
  fallback?: SpaceSizePreset
) => gap ?? size ?? fallback ?? 'normal'
