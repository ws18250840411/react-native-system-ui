import type { TypographyTokens } from './Typography'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    typography: TypographyTokens
  }
}
