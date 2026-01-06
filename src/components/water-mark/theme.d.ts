import type { WaterMarkTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    waterMark: WaterMarkTokens
  }
}
