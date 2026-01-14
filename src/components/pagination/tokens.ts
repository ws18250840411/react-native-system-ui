import { StyleSheet } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { PaginationTokens } from './types'

const createTokens = (foundations: Foundations): PaginationTokens => {
  const { palette, spacing, radii } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  const borderWidth = StyleSheet.hairlineWidth
  const borderColor = palette.default[200]
  const textColor = palette.default[600]
  const gap = spacing.xs
  const paddingX = spacing.sm
  const paddingY = spacing.xs
  const itemRadius = radii.sm
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
        gap,
      },
      pages: {
        flexDirection: 'row',
        alignItems: 'center',
        gap,
      },
      item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth,
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
        borderColor,
        borderRadius: itemRadius,
      },
      control: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth,
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
        borderColor,
        borderRadius: itemRadius,
      },
      desc: {
        marginHorizontal: gap,
        color: textColor,
        textAlign: 'center',
      },
    },
    colors: {
      text: textColor,
      disabled: palette.default[300],
      activeText: onPrimary,
      activeBackground: palette.primary[500],
      border: borderColor,
    },
    typography: {
      fontWeight: '400',
      activeFontWeight: '600',
    },
    radii: {
      item: itemRadius,
    },
    borders: {
      width: borderWidth,
    },
    spacing: {
      gap,
      paddingX,
      paddingY,
      descMarginHorizontal: gap,
    },
  }
}

export const usePaginationTokens = createComponentTokensHook('pagination', createTokens)
