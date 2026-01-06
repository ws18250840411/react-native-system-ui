import type { SkeletonTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    skeleton: SkeletonTokens
  }
}
