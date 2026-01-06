import type { CircleTokens } from './Circle'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    circle: CircleTokens
  }
}
