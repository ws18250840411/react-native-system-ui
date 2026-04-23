import React from 'react'
import type { DeepPartial } from '../types'
import { ThemeContext, type ThemeComponents, type ThemeContextValue } from './ThemeContext'
import { createTokens, defaultTokens, type ThemeTokens } from './tokens'
export interface ThemeConfig { foundations?: DeepPartial<ThemeTokens>; components?: ThemeComponents }
export type ThemeProviderValue = ThemeTokens | ThemeConfig
export interface ThemeProviderProps { value?: ThemeProviderValue; children: React.ReactNode }
const isTokens = (v?: ThemeProviderValue): v is ThemeTokens =>
  !!v && typeof v === 'object' && 'palette' in v && 'spacing' in v
const DEFAULT_THEME_CONTEXT: ThemeContextValue = { foundations: defaultTokens, components: undefined }
const TOKENS_CONTEXT_CACHE = new WeakMap<ThemeTokens, ThemeContextValue>()
const CONFIG_CONTEXT_CACHE = new WeakMap<ThemeConfig, ThemeContextValue>()
const FOUNDATIONS_CACHE = new WeakMap<object, ThemeTokens>()
const getCachedFoundations = (overrides?: DeepPartial<ThemeTokens>) => {
  if (!overrides) return defaultTokens
  const cached = FOUNDATIONS_CACHE.get(overrides as object)
  if (cached) return cached
  const created = createTokens(overrides)
  FOUNDATIONS_CACHE.set(overrides as object, created)
  return created
}
const resolveThemeContext = (value?: ThemeProviderValue): ThemeContextValue => {
  if (!value) return DEFAULT_THEME_CONTEXT
  if (isTokens(value)) {
    const cached = TOKENS_CONTEXT_CACHE.get(value)
    if (cached) return cached
    const resolved = { foundations: value, components: undefined }
    TOKENS_CONTEXT_CACHE.set(value, resolved)
    return resolved
  }
  const cached = CONFIG_CONTEXT_CACHE.get(value)
  if (cached) return cached
  const resolved = { foundations: getCachedFoundations(value.foundations), components: value.components }
  CONFIG_CONTEXT_CACHE.set(value, resolved)
  return resolved
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ value, children }) => <ThemeContext.Provider value={resolveThemeContext(value)}>{children}</ThemeContext.Provider>
