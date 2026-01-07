import type { BadgeTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    badge: BadgeTokens
  }
}
