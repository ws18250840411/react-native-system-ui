import * as React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface CellTokens {
  container: {
    background: string
    paddingVertical: number
    paddingHorizontal: number
    largePaddingVertical: number
  }
  spacing: {
    iconGap: number
    valueGap: number
    extraGap: number
    labelMarginTop: number
  }
  typography: {
    titleSize: number
    titleColor: string
    titleWeight: string
    labelSize: number
    labelColor: string
    valueSize: number
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
  group: {
    marginBottom: number
    titleColor: string
    titleSize: number
    titlePaddingHorizontal: number
    titlePaddingVertical: number
    bodyBackground: string
    insetRadius: number
    insetMarginHorizontal: number
  }
}

export const createCellTokens = (foundations: Foundations): CellTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations
  return {
    container: {
      background: palette.default[50],
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      largePaddingVertical: spacing.lg,
    },
    spacing: {
      iconGap: spacing.sm,
      valueGap: spacing.md,
      extraGap: spacing.sm,
      labelMarginTop: spacing.xs,
    },
    typography: {
      titleSize: fontSize.md,
      titleColor: palette.default[800],
      titleWeight: typography.weight.medium,
      labelSize: fontSize.sm,
      labelColor: palette.default[500],
      valueSize: fontSize.md,
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
    group: {
      marginBottom: spacing.md,
      titleColor: palette.default[500],
      titleSize: fontSize.sm,
      titlePaddingHorizontal: spacing.lg,
      titlePaddingVertical: spacing.sm,
      bodyBackground: palette.default[50],
      insetRadius: radii.lg,
      insetMarginHorizontal: spacing.lg,
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
