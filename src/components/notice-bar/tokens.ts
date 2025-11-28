import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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

export const useNoticeBarTokens = (overrides?: DeepPartial<NoticeBarTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createNoticeBarTokens(foundations)
    const globalOverrides = components?.noticeBar as DeepPartial<NoticeBarTokens> | undefined
    const merged =
      globalOverrides && overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
