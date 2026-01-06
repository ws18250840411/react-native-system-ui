import type { ActionSheetTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    actionSheet: ActionSheetTokens
  }
}
