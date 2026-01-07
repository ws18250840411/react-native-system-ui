import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface ImageTokens {
  colors: {
    background: string
    text: string
    error: string
  }
  radius: {
    default: number
  }
}

const createTokens = (foundations: Foundations): ImageTokens => {
  const { palette, radii } = foundations
  return {
    colors: {
      background: '#ffffff',
      text: palette.default[500],
      error: palette.danger[500],
    },
    radius: {
      default: radii.md,
    },
  }
}

export const useImageTokens = createComponentTokensHook('image', createTokens)
