import type { ShareSheetTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    shareSheet: ShareSheetTokens
  }
}
