import type { ListTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    list: ListTokens
  }
}
