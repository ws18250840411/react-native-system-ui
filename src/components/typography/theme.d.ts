import type { TypographyTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    typography: TypographyTokens
  }
}
