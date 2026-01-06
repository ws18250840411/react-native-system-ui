import type { PaginationTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    pagination: PaginationTokens
  }
}
