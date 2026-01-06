import type { NotifyTokens } from './Notify'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    notify: NotifyTokens
  }
}
