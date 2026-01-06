import type { CountDownTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    countDown: CountDownTokens
  }
}
