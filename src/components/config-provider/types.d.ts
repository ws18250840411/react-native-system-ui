import type React from 'react'

import type { ThemeProviderValue } from '../../design-system/ThemeProvider'
import type { Locale } from './locale/types'

export interface ConfigProviderProps {
  theme?: ThemeProviderValue
  locale?: Locale
  children: React.ReactNode
}
