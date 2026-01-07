import type { SwitchTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    switch: SwitchTokens
  }
}
