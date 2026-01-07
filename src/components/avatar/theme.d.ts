import type { AvatarTokens } from './types'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    avatar: AvatarTokens
  }
}
