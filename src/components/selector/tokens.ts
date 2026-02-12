import { Platform } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SelectorTokens } from './types'
const createSelectorTokens = (foundations: Foundations): SelectorTokens => {
  const { palette, spacing, radii, typography, fontSize } = foundations
  const surface = foundations.surface ?? '#ffffff'
  return {
  defaults: { columns: 3, multiple: false, showCheckMark: true, disabled: false },
  layout: {
    container: { flexDirection: 'row', flexWrap: 'wrap', },
    pressable:
      Platform.OS === 'web' ? { outlineStyle: 'solid', outlineWidth: 0 } : {},
    item: { flex: 1, borderWidth: 0, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', },
    label: { includeFontPadding: false, textAlign: 'center', },
    description: { includeFontPadding: false, textAlign: 'center', },
    checkMark: { position: 'absolute', right: 1, bottom: 1, fontSize: 8, includeFontPadding: false, },
    checkMarkTriangle: { position: 'absolute', right: 0, bottom: 0, width: 0, height: 0, borderTopColor: 'transparent', borderLeftColor: 'transparent', },
  },
  colors: { border: 'transparent', borderActive: 'transparent', background: surface, backgroundActive: palette.primary[50], text: palette.default[900], textActive: palette.primary[600], description: palette.default[500], disabledText: palette.default[400], check: palette.primary[600], checkForeground: palette.primary.foreground ?? '#fff', },
  typography: { fontSize: fontSize.md, descriptionSize: fontSize.sm, fontFamily: typography.fontFamily, fontWeight: typography.weight.medium, },
  radii: { item: radii.xs },
  spacing: { gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, descriptionMarginTop: spacing.xxs, },
  states: { disabledOpacity: 0.45, },
}}
export const useSelectorTokens = createComponentTokensHook('selector', createSelectorTokens)
