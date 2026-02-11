import type { TextStyle } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SearchShape } from './types'

export interface SearchTokens {
  defaults: {
    shape: SearchShape
    clearTrigger: 'always' | 'focus'
  }
  colors: {
    background: string
    contentBackground: string
    label: string
    action: string
    icon: string
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    labelGap: number
    actionGap: number
    contentPaddingHorizontal: number
    contentPaddingVertical: number
    none: number
  }
  radius: {
    square: number
    round: number
  }
  typography: {
    label: number
    labelWeight: NonNullable<TextStyle['fontWeight']>
    action: number
    actionWeight: NonNullable<TextStyle['fontWeight']>
  }
  opacity: {
    actionPressed: number
  }
  icon: {
    size: number
  }
}

const createSearchTokens = (foundations: Foundations): SearchTokens => {
  const { palette, spacing, radii, fontSize } = foundations
  const surface = foundations.surface ?? '#ffffff'
  return {
    defaults: { shape: 'square', clearTrigger: 'focus' },
    colors: {
      background: surface,
      contentBackground: surface,
      label: palette.default[600],
      action: palette.primary[500],
      icon: palette.default[400],
    },
    spacing: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      labelGap: spacing.sm,
      actionGap: spacing.sm,
      contentPaddingHorizontal: spacing.sm,
      contentPaddingVertical: spacing.xs,
      none: spacing.none,
    },
    radius: { square: radii.md, round: radii.pill },
    typography: {
      label: fontSize.sm,
      labelWeight: '500',
      action: fontSize.sm,
      actionWeight: '500',
    },
    opacity: { actionPressed: 0.6 },
    icon: { size: fontSize.md },
  }
}

export const useSearchTokens = createComponentTokensHook('search', createSearchTokens)
