import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import type { Foundations } from '../../design-system/tokens'
import type { DividerTokens } from './types'
export const createDividerTokens = (foundations: Foundations): DividerTokens => {
  const { palette, fontSize, typography, spacing } = foundations
  return {
    defaults: { dashed: false, hairline: true, contentPosition: 'center', },
    layout: {
      container: { width: '100%', flexDirection: 'row', alignItems: 'center', },
      contentWrapper: { justifyContent: 'center', },
      text: { textAlign: 'center', },
      hairlineWrapper: { flexShrink: 1, height: 1, position: 'relative', },
    },
    colors: { line: palette.default[200], text: palette.default[600], },
    typography: { fontSize: fontSize.sm, lineHeight: fontSize.sm * typography.lineHeightMultiplier, fontFamily: typography.fontFamily, fontWeight: typography.weight.medium, },
    sizing: { sideMinFlex: 0.18, },
    borders: { thickness: 1, },
    spacing: { vertical: spacing.md, contentPadding: spacing.sm, },
  }
}
export const useDividerTokens = createComponentTokensHook('divider', createDividerTokens)
