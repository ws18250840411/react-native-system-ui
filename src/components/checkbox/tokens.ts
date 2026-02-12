import { StyleSheet } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { CheckboxTokens } from './types'
const centered = { justifyContent: 'center', alignItems: 'center' } as const
const createCheckboxTokens = (foundations: Foundations): CheckboxTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const surface = foundations.surface ?? '#ffffff'
  return {
    defaults: { shape: 'round', iconSize: 20, labelPosition: 'right', labelDisabled: false, bindGroup: true, groupDisabled: false, groupDirection: 'vertical', },
    layout: {
      container: { flexDirection: 'row', alignItems: 'center', },
      iconWrapper: centered,
      icon: centered,
      checkmark: { textAlign: 'center', includeFontPadding: false, },
      label: { includeFontPadding: false, },
      labelWrapper: { flexShrink: 1, },
      groupHorizontal: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', },
      groupVertical: { flexDirection: 'column', },
      groupItem: { flexShrink: 0, },
    },
    colors: { border: palette.default[400], background: surface, checkedBackground: palette.primary[500], disabledBorder: palette.default[300], disabledBackground: palette.default[100], checkmark: palette.primary.foreground ?? '#ffffff', label: palette.default.foreground ?? '#111827', labelDisabled: palette.default[400], },
    typography: { fontSize: fontSize.md, fontFamily: typography.fontFamily, fontWeight: typography.weight.medium, lineHeightMultiplier: typography.lineHeightMultiplier, },
    spacing: { gap: spacing.sm, groupGap: spacing.md, },
    radii: { square: radii.xs, },
    borders: { width: StyleSheet.hairlineWidth, },
    icon: { scale: 0.65, },
  }
}
export const useCheckboxTokens = createComponentTokensHook(
  'checkbox',
  createCheckboxTokens
)
