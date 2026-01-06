import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface NoticeBarTokens {
  colors: {
    text: string
    background: string
  }
  typography: {
    fontSize: number
  }
  layout: {
    minHeight: number
    radius: number
    sideMinWidth: number
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    wrapPaddingVertical: number
    sidePadding: number
  }
}

export const createNoticeBarTokens = (foundations: Foundations): NoticeBarTokens => {
  const { palette, fontSize, spacing, radii } = foundations
  return {
    colors: {
      text: palette.warning[600],
      background: palette.warning[50],
    },
    typography: {
      fontSize: fontSize.sm,
    },
    layout: {
      minHeight: 40,
      radius: radii.lg,
      sideMinWidth: 24,
    },
    spacing: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      wrapPaddingVertical: spacing.md,
      sidePadding: spacing.sm,
    },
  }
}

export const useNoticeBarTokens = createComponentTokensHook(
  'noticeBar',
  createNoticeBarTokens
)
