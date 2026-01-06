import type { PickerTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    picker: PickerTokens
  }
}
