import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
export interface ImagePreviewTokens {
  colors: {
    background: string
    indexBackground: string
    indexText: string
    indicatorActive: string
    indicatorInactive: string
    transparent: string
  }
  spacing: {
    indexTop: number
    indexPaddingHorizontal: number
    indexPaddingVertical: number
  }
  layout: {
    popupPadding: number
    popupRadius: number
  }
  radii: {
    indexBadge: number
  }
  typography: {
    fontFamily: string
    indexTextSize: number
  }
}
const createTokens = (foundations: Foundations): ImagePreviewTokens => {
  const { palette, radii, fontSize, spacing, typography } = foundations
  return {
    colors: { background: 'rgba(0,0,0,0.95)', indexBackground: 'rgba(0,0,0,0.35)', indexText: '#fff', indicatorActive: palette.primary?.[500] ?? '#1989fa', indicatorInactive: 'rgba(255,255,255,0.4)', transparent: 'transparent', },
    spacing: { indexTop: 24, indexPaddingHorizontal: spacing.lg, indexPaddingVertical: spacing.xs, },
    layout: { popupPadding: 0, popupRadius: 0, },
    radii: { indexBadge: radii.pill, },
    typography: { fontFamily: typography.fontFamily, indexTextSize: fontSize.sm, },
  }
}
export const useImagePreviewTokens = createComponentTokensHook(
  'imagePreview',
  createTokens
)
