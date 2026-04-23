import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import type { Foundations } from '../../design-system/tokens'
import type { SpaceGap, SpaceSizePreset, SpaceTokens } from './types'
const createSpaceTokens = (foundations: Foundations): SpaceTokens => {
  const { spacing, fontSize, typography } = foundations
  return {
    defaults: { direction: 'horizontal', wrap: false, gapPreset: 'normal', },
    layout: { container: {}, },
    typography: { fontFamily: typography.fontFamily, fontSize: fontSize.sm, },
    sizing: {
      presets: { mini: spacing.xxs ?? spacing.xs ?? 4, small: spacing.xs, normal: spacing.sm, large: spacing.md, },
    },
  }
}
export const useSpaceTokens = createComponentTokensHook('space', createSpaceTokens)
