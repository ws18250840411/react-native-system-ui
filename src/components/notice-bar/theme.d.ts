import type { NoticeBarTokens } from './tokens'

declare module '../../design-system/ThemeContext' {
  interface ThemeComponentTokensMap {
    noticeBar: NoticeBarTokens
  }
}
