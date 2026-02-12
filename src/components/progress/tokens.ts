import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { ProgressTokens } from './types'
export const createProgressTokens = (foundations: Foundations): ProgressTokens => {
  const onPrimary = foundations.palette.primary.foreground ?? '#ffffff'
  return {
    defaults: { percentage: 0, inactive: false, showPivot: true, transition: true, animationDuration: 300, },
    layout: {
      track: { overflow: 'hidden', },
      indicator: { position: 'absolute', left: 0, top: 0, },
      pivot: { position: 'absolute', },
      pivotText: { textAlign: 'center', includeFontPadding: false, },
    },
    colors: { track: foundations.palette.default[100], indicator: foundations.palette.primary[500], pivotText: onPrimary, },
    typography: { fontFamily: foundations.typography.fontFamily, pivotFontSize: foundations.fontSize.xs, },
    sizing: { height: 4, pivotPaddingHorizontal: foundations.spacing.xs, pivotPaddingVertical: 2, },
  }
}
export const useProgressTokens = createComponentTokensHook(
  'progress',
  createProgressTokens
)
