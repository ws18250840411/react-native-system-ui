import type { LoadingTokens } from './Loading'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    loading: LoadingTokens
  }
}
