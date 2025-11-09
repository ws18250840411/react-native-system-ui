import React from 'react'

import type { DeepPartial } from '../types'
import { ThemeContext } from './ThemeContext'
import { createTokens, type ThemeTokens } from './tokens'

export interface ThemeConfig {
  foundations?: DeepPartial<ThemeTokens>
  components?: Record<string, unknown>
}

export type ThemeProviderValue = ThemeTokens | ThemeConfig

export interface ThemeProviderProps {
  value?: ThemeProviderValue
  children: React.ReactNode
}

const isThemeTokens = (value?: ThemeProviderValue): value is ThemeTokens => {
  return Boolean(
    value && typeof value === 'object' && 'palette' in value && 'spacing' in value
  )
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  value,
  children,
}) => {
  const resolved = React.useMemo(() => {
    const foundations = isThemeTokens(value)
      ? value
      : createTokens(value?.foundations)

    const components = !isThemeTokens(value) ? value?.components : undefined

    return { foundations, components }
  }, [value])

  return (
    <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>
  )
}
