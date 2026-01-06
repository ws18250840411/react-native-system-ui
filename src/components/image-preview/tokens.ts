import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface ImagePreviewTokens {
  colors: {
    background: string
    indexBackground: string
    indexText: string
    indicatorActive: string
    indicatorInactive: string
  }
}

const createTokens = (foundations: Foundations): ImagePreviewTokens => {
  const { palette } = foundations
  return {
    colors: {
      background: 'rgba(0,0,0,0.95)',
      indexBackground: 'rgba(0,0,0,0.35)',
      indexText: '#fff',
      indicatorActive: palette.primary?.[500] ?? '#1989fa',
      indicatorInactive: 'rgba(255,255,255,0.4)',
    },
  }
}

export const useImagePreviewTokens = createComponentTokensHook(
  'imagePreview',
  createTokens
)
