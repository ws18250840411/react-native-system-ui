import type { NavBarTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    navBar: NavBarTokens
  }
}
