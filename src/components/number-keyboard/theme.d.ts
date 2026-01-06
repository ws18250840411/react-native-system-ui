import type { NumberKeyboardTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    numberKeyboard: NumberKeyboardTokens
  }
}
