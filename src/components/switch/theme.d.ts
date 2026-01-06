import type { SwitchTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    switch: SwitchTokens
  }
}
