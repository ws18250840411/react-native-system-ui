import type { UploaderTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    uploader: UploaderTokens
  }
}
