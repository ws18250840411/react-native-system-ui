import type { DropdownMenuTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    dropdownMenu: DropdownMenuTokens
  }
}
