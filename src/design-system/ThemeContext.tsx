import React from 'react'

import type { DeepPartial } from '../types'
import { createTokens, defaultTokens, type ThemeTokens } from './tokens'

export interface ThemeContextValue {
  foundations: ThemeTokens
  components?: Record<string, unknown>
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  foundations: defaultTokens,
  components: undefined,
})

export const ensureFoundations = (overrides?: DeepPartial<ThemeTokens>) => {
  return overrides ? createTokens(overrides) : defaultTokens
}
