import type { FieldTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    field: FieldTokens
  }
}
