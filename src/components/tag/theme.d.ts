import type { TagTokens } from './Tag'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    tag: TagTokens
  }
}
