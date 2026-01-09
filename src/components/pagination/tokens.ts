import { StyleSheet } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { PaginationTokens } from './types'

const createTokens = (foundations: Foundations): PaginationTokens => {
  const { palette, spacing, radii } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    defaults: {
      mode: 'multi',
      pageCount: 0,
      totalItems: 0,
      itemsPerPage: 10,
      showPageSize: 5,
      forceEllipses: false,
      prevText: '上一页',
      nextText: '下一页',
      defaultPage: 1,
      pressedOpacity: 0.7,
      disabledOpacity: 0.5,
    },
    layout: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      pages: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      item: {},
      control: {},
      desc: {},
    },
    colors: {
      text: palette.default[600],
      disabled: palette.default[300],
      activeText: onPrimary,
      activeBackground: palette.primary[500],
      border: palette.default[200],
    },
    typography: {
      fontWeight: '400',
      activeFontWeight: '600',
    },
    radii: {
      item: radii.sm,
    },
    borders: {
      width: StyleSheet.hairlineWidth,
    },
    spacing: {
      gap: spacing.xs,
      paddingX: spacing.sm,
      paddingY: spacing.xs,
      descMarginHorizontal: spacing.xs,
    },
  }
}

export const usePaginationTokens = createComponentTokensHook('pagination', createTokens)
