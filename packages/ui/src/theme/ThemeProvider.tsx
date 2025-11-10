import React, { createContext, useContext, useMemo } from 'react'

import { defaultThemeTokens, mergeTokens } from './tokens'
import type { ThemeOverride, ThemeTokens } from './tokens'

const ThemeContext = createContext<ThemeTokens>(defaultThemeTokens)

export type ThemeProviderProps = {
  value?: ThemeOverride
  children?: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value, children }) => {
  const tokens = useMemo(() => mergeTokens(defaultThemeTokens, value), [value])

  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>
}

export const useThemeTokens = (): ThemeTokens => {
  return useContext(ThemeContext)
}
