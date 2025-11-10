import type { Foundations } from '../../design-system'

import type { DividerContentPosition, DividerType } from './types'

export interface DividerTokens {
  defaults: {
    type: DividerType
    dashed: boolean
    hairline: boolean
    contentPosition: DividerContentPosition
  }
  colors: {
    line: string
    text: string
  }
  typography: {
    fontSize: number
    lineHeight: number
    fontFamily: string
    fontWeight: string
  }
  spacing: {
    vertical: number
    horizontal: number
    contentPadding: number
  }
  line: {
    thickness: number
    sideMinFlex: number
  }
  vertical: {
    minHeight: number
  }
}

export const createDividerTokens = (foundations: Foundations): DividerTokens => {
  const { palette, fontSize, typography, spacing } = foundations

  return {
    defaults: {
      type: 'horizontal',
      dashed: false,
      hairline: true,
      contentPosition: 'center',
    },
    colors: {
      line: palette.default[200],
      text: palette.default[600],
    },
    typography: {
      fontSize: fontSize.sm,
      lineHeight: fontSize.sm * typography.lineHeightMultiplier,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.medium,
    },
    spacing: {
      vertical: spacing.md,
      horizontal: spacing.none,
      contentPadding: spacing.sm,
    },
    line: {
      thickness: 1,
      sideMinFlex: 0.18,
    },
    vertical: {
      minHeight: 24,
    },
  }
}
