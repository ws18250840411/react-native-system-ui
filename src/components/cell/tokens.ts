import * as React from 'react'
import { StyleSheet, type TextStyle } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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
      activeOpacity: 0.6, // foundations.opacity.pressed is 0.85, maybe use that? 0.6 is specific to cell? Using 0.6 for now to match existing behavior.
      rippleColor: '#f2f3f5', // match existing
    },
    spacing: {
      iconGap: spacing.sm,
      valueGap: spacing.none, // 官方 cell 标题与内容间无额外间距
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
      size: 16, // 对齐 @cell-icon-size 16px
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

export const useCellTokens = (overrides?: DeepPartial<CellTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createCellTokens(foundations)
    const globalOverrides = components?.cell as DeepPartial<CellTokens> | undefined
    const mergedOverrides =
      globalOverrides && overrides ? deepMerge(globalOverrides, overrides) : globalOverrides ?? overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [components, foundations, overrides])
}
