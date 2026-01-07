import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SkeletonTokens } from './types'

const createTokens = (foundations: Foundations): SkeletonTokens => {
  const { palette, spacing, radii } = foundations
  const surface = palette.default[50]
  const surfaceMuted = palette.default[100]
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
      block: surfaceMuted,
      highlight: surface,
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

export const useSkeletonTokens = createComponentTokensHook('skeleton', createTokens)
