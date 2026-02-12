import React, { useMemo } from 'react'
import type { DeepPartial } from '../types'
import { ThemeContext, type ThemeComponents } from './ThemeContext'
import { createTokens, type ThemeTokens } from './tokens'
import { isObject } from '../utils/validate'
export interface ThemeConfig { foundations?: DeepPartial<ThemeTokens>; components?: ThemeComponents }
export type ThemeProviderValue = ThemeTokens | ThemeConfig
export interface ThemeProviderProps { value?: ThemeProviderValue; children: React.ReactNode }
const isTokens = (v?: ThemeProviderValue): v is ThemeTokens =>
  Boolean(isObject(v) && 'palette' in v && 'spacing' in v)
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value, children }) => { const resolved = useMemo(() => ({ foundations: isTokens(value) ? value : createTokens(value?.foundations), components: isTokens(value) ? undefined : value?.components }), [value]); return <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>
}
