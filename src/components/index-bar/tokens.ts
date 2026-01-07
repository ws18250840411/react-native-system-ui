import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface IndexBarTokens {
  colors: {
    text: string
    activeText: string
    indicatorBackground: string
    indicatorText: string
    stickyBackground: string
    stickyText: string
    anchorBackground: string
    anchorText: string
    border: string
  }
  layout: {
    indexWidth: number
    indicatorSize: number
    stickyHeight: number
    paddingVertical: number
    spacing: number
    anchorHeight: number
  }
}

const createTokens = (foundations: Foundations): IndexBarTokens => {
  const { palette, spacing } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    colors: {
      text: palette.default[600],
      activeText: palette.primary[600],
      indicatorBackground: 'rgba(0,0,0,0.6)',
      indicatorText: onPrimary,
      stickyBackground: '#ffffff',
      stickyText: palette.default[900],
      anchorBackground: '#ffffff',
      anchorText: palette.default[900],
      border: palette.default[200],
    },
    layout: {
      indexWidth: 24,
      indicatorSize: 60,
      stickyHeight: 32,
      paddingVertical: spacing.sm,
      spacing: 4,
      anchorHeight: 32,
    },
  }
}

export const useIndexBarTokens = createComponentTokensHook(
  'indexBar',
  createTokens
)
