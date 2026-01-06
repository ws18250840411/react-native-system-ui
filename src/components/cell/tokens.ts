import { StyleSheet, type TextStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface CellTokens {
  defaults: {
    groupBorder: boolean
    groupInset: boolean
    groupCard: boolean
  }
  container: {
    background: string
    paddingVertical: number
    paddingHorizontal: number
    largePaddingVertical: number
    activeOpacity: number
    rippleColor: string
  }
  spacing: {
    iconGap: number
    valueGap: number
    extraGap: number
    labelMarginTop: number
  }
  typography: {
    titleSize: number
    lineHeight: number
    titleColor: string
    titleWeight: TextStyle['fontWeight']
    largeTitleSize: number
    labelSize: number
    largeLabelSize: number
    labelColor: string
    valueSize: number
    largeValueSize: number
    valueColor: string
    requiredColor: string
  }
  border: {
    color: string
    width: number
  }
  arrow: {
    color: string
    size: number
  }
  icon: {
    size: number
  }
  group: {
    marginBottom: number
    titleColor: string
    titleSize: number
    titlePaddingHorizontal: number
    titlePaddingVertical: number
    bodyBackground: string
    insetRadius: number
    insetMarginHorizontal: number
    cardShadow: {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  }
}

export const createCellTokens = (foundations: Foundations): CellTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations
  return {
    defaults: {
      groupBorder: true,
      groupInset: false,
      groupCard: false,
    },
    container: {
      background: '#ffffff',
      paddingVertical: 10,
      paddingHorizontal: 16,
      largePaddingVertical: 14,
      activeOpacity: 0.6,
      rippleColor: palette.default[100],
    },
    spacing: {
      iconGap: spacing.sm,
      valueGap: spacing.none,
      extraGap: spacing.sm,
      labelMarginTop: spacing.xs,
    },
    typography: {
      titleSize: fontSize.sm,
      lineHeight: 24,
      titleColor: palette.default[800],
      titleWeight: typography.weight.medium,
      largeTitleSize: fontSize.lg,
      labelSize: fontSize.xs,
      largeLabelSize: fontSize.sm,
      labelColor: palette.default[500],
      valueSize: fontSize.sm,
      largeValueSize: fontSize.md,
      valueColor: palette.default[600],
      requiredColor: palette.danger[500],
    },
    border: {
      color: palette.default[200],
      width: StyleSheet.hairlineWidth,
    },
    arrow: {
      color: palette.default[400],
      size: 16,
    },
    icon: {
      size: 16,
    },
    group: {
      marginBottom: spacing.md,
      titleColor: palette.default[500],
      titleSize: fontSize.sm,
      titlePaddingHorizontal: spacing.lg,
      titlePaddingVertical: spacing.sm,
      bodyBackground: '#ffffff',
      insetRadius: radii.lg,
      insetMarginHorizontal: spacing.lg,
      cardShadow: {
        color: '#000000',
        opacity: 0,
        radius: 0,
        offsetY: 0,
        elevation: 0,
      },
    },
  }
}

export const useCellTokens = createComponentTokensHook('cell', createCellTokens)
