import type React from 'react'

import type { ThemeProviderValue } from '../../design-system/ThemeProvider'
import type { Locale } from './locale/types'

export type Direction = 'ltr' | 'rtl'

export interface ConfigProviderProps {
  theme?: ThemeProviderValue
  locale?: Locale
  direction?: Direction
  children: React.ReactNode
}
