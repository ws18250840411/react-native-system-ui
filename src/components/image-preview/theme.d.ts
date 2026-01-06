import type { ImagePreviewTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    imagePreview: ImagePreviewTokens
  }
}
