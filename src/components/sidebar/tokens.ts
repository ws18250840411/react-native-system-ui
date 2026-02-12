import { StyleSheet } from 'react-native'
import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SidebarTokens } from './types'
export const createSidebarTokens = (foundations: Foundations): SidebarTokens => {
  const { palette, fontSize, typography } = foundations
  const surface = foundations.surface ?? '#ffffff'
  const borderWidth = StyleSheet.hairlineWidth
  return {
    defaults: { disabled: false, },
    layout: {
      container: { flexDirection: 'row', },
      side: {},
      content: { flex: 1, minWidth: 0, },
      item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, },
      indicatorWrapper: { width: 12, alignItems: 'center', },
      itemContent: { flex: 1, paddingVertical: 12, },
      indicator: { height: 20, },
      titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, },
      badge: { marginLeft: 4, },
      dot: { width: 6, height: 6, borderRadius: 3, },
      title: { includeFontPadding: false, },
    },
    colors: { background: surface, border: palette.default[200], title: palette.default[800], titleActive: palette.primary[600], disabled: palette.default[400], indicator: palette.primary[600], },
    typography: { fontFamily: typography.fontFamily, fontSize: fontSize.sm, fontWeight: typography.weight.medium, contentFontSize: fontSize.sm, },
    sizing: { width: 120, itemHeight: 48, indicatorWidth: 4, },
    borders: { width: borderWidth, },
  }
}
export const useSidebarTokens = createComponentTokensHook(
  'sidebar',
  createSidebarTokens
)
