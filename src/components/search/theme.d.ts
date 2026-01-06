import type { SearchTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    search: SearchTokens
  }
}
