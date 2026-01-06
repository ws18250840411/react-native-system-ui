import type { ImageTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    image: ImageTokens
  }
}
