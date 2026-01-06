import type { SelectorTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    selector: SelectorTokens
  }
}
