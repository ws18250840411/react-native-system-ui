import type { DialogTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    dialog: DialogTokens
  }
}
