import type { SidebarTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    sidebar: SidebarTokens
  }
}
