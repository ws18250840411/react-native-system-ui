import { StyleSheet } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { CellTokens } from './types'
export const createCellTokens = (foundations: Foundations): CellTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations
  const background = foundations.surface ?? '#ffffff'
  const paddingVertical = 10
  const largePaddingVertical = 14
  const paddingHorizontal = 16
  const arrowSize = 16
  const iconSize = 16
  const baseContainerLayout = {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    width: '100%' as const,
    backgroundColor: background,
    paddingHorizontal,
  }
  return {
    defaults: { border: true, size: 'normal', arrowDirection: 'right', activeOpacity: 0.6, groupBorder: true, groupInset: false, groupCard: false, },
    layout: {
      container: { ...baseContainerLayout, paddingVertical, },
      containerLarge: { ...baseContainerLayout, paddingVertical: largePaddingVertical, },
      center: { alignItems: 'center', },
      body: { minWidth: 0, flexDirection: 'column', },
      titleRow: { flexDirection: 'row', alignItems: 'center', },
      value: { textAlign: 'right', },
      valueOnly: { textAlign: 'left', },
      valueContainer: { flex: 1, flexShrink: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
      valueOnlyContainer: { justifyContent: 'flex-start', alignItems: 'flex-start', },
      valueCenter: { alignItems: 'center', },
      customContent: { flexShrink: 1, minWidth: 0, },
      iconWrapper: { justifyContent: 'center', alignItems: 'center', },
      rightIconWrapper: { alignSelf: 'center', justifyContent: 'center', alignItems: 'center', },
      hairline: { position: 'absolute', bottom: 0, },
      groupCardShadow: {},
      arrowTransforms: { left: { transform: [{ rotate: '180deg' }] }, right: {}, up: { transform: [{ rotate: '-90deg' }] }, down: { transform: [{ rotate: '90deg' }] }, },
    },
    colors: { background, ripple: palette.default[100], title: palette.default[800], label: palette.default[500], value: palette.default[600], required: palette.danger[500], border: palette.default[200], arrow: palette.default[400], groupTitle: palette.default[500], groupBodyBackground: background, },
    typography: { titleSize: fontSize.sm, lineHeight: 24, titleWeight: typography.weight.medium, largeTitleSize: fontSize.lg, labelSize: fontSize.xs, largeLabelSize: fontSize.sm, valueSize: fontSize.sm, largeValueSize: fontSize.md, groupTitleSize: fontSize.sm, },
    sizing: { paddingVertical, paddingHorizontal, largePaddingVertical, arrowSize, iconSize, groupMarginBottom: spacing.md, groupTitlePaddingHorizontal: spacing.lg, groupTitlePaddingVertical: spacing.sm, groupInsetMarginHorizontal: spacing.lg, },
    radii: { groupInset: radii.lg, },
    borders: { width: StyleSheet.hairlineWidth, },
    spacing: { iconGap: spacing.sm, valueGap: spacing.none, extraGap: spacing.sm, labelMarginTop: spacing.xs, },
  }
}
export const useCellTokens = createComponentTokensHook('cell', createCellTokens)
