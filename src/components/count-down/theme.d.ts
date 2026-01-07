import type { CountDownTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    countDown: CountDownTokens
  }
}
