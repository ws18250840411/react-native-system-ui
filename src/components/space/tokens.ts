import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
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

export const useSpaceTokens = createComponentTokensHook('space', createSpaceTokens)

export const resolveGapInput = (
  gap?: SpaceGap,
  size?: SpaceGap | SpaceSizePreset,
  fallback?: SpaceSizePreset
) => gap ?? size ?? fallback ?? 'normal'
