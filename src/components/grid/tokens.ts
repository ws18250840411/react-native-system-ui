import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { GridTokens } from './types'
export const createGridTokens = (foundations: Foundations): GridTokens => {
  const { palette, spacing, fontSize, typography, opacity } = foundations
  const surface = foundations.surface ?? '#ffffff'
  return {
    defaults: { columnNum: 4, gutter: 0, border: true, center: true, square: false, direction: 'vertical', reverse: false, clickable: false, iconSize: 28, pressedOpacity: opacity.pressed, textNumberOfLines: 2, },
    layout: {
      container: { flexDirection: 'row', flexWrap: 'wrap', },
      border: { position: 'absolute', left: 0, right: 0, height: 1, zIndex: 1, },
      borderTop: { top: 0, },
      borderBottom: { bottom: 0, },
      itemContentBase: { justifyContent: 'center', },
      itemVertical: { flexDirection: 'column', },
      itemHorizontal: { flexDirection: 'row', alignItems: 'center', },
      itemCenter: { alignItems: 'center', },
      itemReverseColumn: { flexDirection: 'column-reverse', },
      itemReverseRow: { flexDirection: 'row-reverse', },
      iconWrapper: { alignItems: 'center', justifyContent: 'center', },
      text: { textAlign: 'center', },
      itemBorderRight: { width: 1, },
      itemBorderBottom: { height: 1, },
      itemContentSquare: { width: '100%', aspectRatio: 1, },
    },
    colors: { border: palette.default[200], text: palette.default[600], background: surface, active: palette.default[100], },
    typography: { fontSize: fontSize.sm, fontFamily: typography.fontFamily, lineHeight: Math.round(fontSize.sm * typography.lineHeightMultiplier), fontWeight: typography.weight.regular, },
    spacing: { paddingHorizontal: spacing.sm, paddingVertical: spacing.md, iconGap: spacing.sm, },
  }
}
export const useGridTokens = createComponentTokensHook('grid', createGridTokens)
