import type { CalendarTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    calendar: CalendarTokens
  }
}
