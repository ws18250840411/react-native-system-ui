import type { ButtonTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    button: ButtonTokens
  }
}
