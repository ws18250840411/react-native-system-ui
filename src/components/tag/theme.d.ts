import type { TagTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    tag: TagTokens
  }
}
