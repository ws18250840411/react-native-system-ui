import type { TextStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface BadgeTokens {
  defaults: {
    showZero: boolean
  }
  colors: {
    background: string
    dot: string
    text: string
    border: string
  }
  sizes: {
    minWidth: number
    height: number
    paddingHorizontal: number
    paddingVertical: number
    dotSize: number
    borderRadius: number
    borderWidth: number
  }
  typography: {
    fontSize: number
    fontWeight: TextStyle['fontWeight']
    fontFamily: string
    lineHeight: number
  }
}

const createBadgeTokens = ({
  palette,
  spacing,
  fontSize,
  radii,
  typography,
}: Foundations): BadgeTokens => ({
  defaults: { showZero: true },
  colors: {
    background: palette.danger[500],
    dot: palette.danger[500],
    text: palette.danger.foreground ?? '#fff',
    border: '#fff',
  },
  sizes: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    dotSize: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  typography: {
    fontSize: fontSize.xs,
    fontWeight: typography.weight.bold,
    fontFamily: typography.fontFamily,
    lineHeight: fontSize.xs * typography.lineHeightMultiplier,
  },
})

export const useBadgeTokens = createComponentTokensHook('badge', createBadgeTokens)

