import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { ImageTokens } from './types'
const createTokens = (foundations: Foundations): ImageTokens => {
  const { palette, spacing, fontSize, radii, typography } = foundations
  const surface = foundations.surface ?? '#ffffff'
  return {
    defaults: { fit: 'cover', showLoading: true, showError: true, loadingText: 'Loading...', errorText: 'Failed to load', iconSize: 20, loadingIndicatorBaseSize: 20, loadingLabelMarginTop: spacing.xs, roundRadius: radii.full, },
    layout: {
      container: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden', },
      overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center', },
      label: { fontFamily: typography.fontFamily, fontSize: fontSize.xs, },
      iconContainer: { alignItems: 'center', justifyContent: 'center', },
      absoluteFill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, },
    },
    colors: { background: surface, text: palette.default[500], error: palette.danger[500], },
  }
}
export const useImageTokens = createComponentTokensHook('image', createTokens)
