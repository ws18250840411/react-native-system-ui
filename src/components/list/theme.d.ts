import type { ListTokens } from './List'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    list: ListTokens
  }
}
