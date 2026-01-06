import type { ToastTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    toast: ToastTokens
  }
}
