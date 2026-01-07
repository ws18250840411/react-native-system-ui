import type { SkeletonTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    skeleton: SkeletonTokens
  }
}
