import type { PasswordInputTokens } from './PasswordInput'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    passwordInput: PasswordInputTokens
  }
}
