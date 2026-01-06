import type { PullRefreshTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    pullRefresh: PullRefreshTokens
  }
}
