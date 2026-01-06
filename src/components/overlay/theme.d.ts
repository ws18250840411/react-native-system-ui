import type { OverlayTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    overlay: OverlayTokens
  }
}
