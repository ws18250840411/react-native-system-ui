import type { PaginationTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    pagination: PaginationTokens
  }
}
