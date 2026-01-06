import type { GridTokens } from './GridContext'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    grid: GridTokens
  }
}
