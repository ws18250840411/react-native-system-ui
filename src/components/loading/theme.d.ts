import type { LoadingTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    loading: LoadingTokens
  }
}
