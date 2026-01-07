import type { WaterMarkTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    waterMark: WaterMarkTokens
  }
}
