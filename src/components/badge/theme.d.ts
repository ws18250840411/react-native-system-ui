import type { BadgeTokens } from './Badge'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    badge: BadgeTokens
  }
}
