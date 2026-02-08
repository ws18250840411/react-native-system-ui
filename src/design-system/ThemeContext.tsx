import React from 'react'
import type { DeepPartial } from '../types'
import { defaultTokens, type ThemeTokens } from './tokens'

export interface ThemeComponentTokensMap {}
export type ThemeComponentKey = keyof ThemeComponentTokensMap
export type ThemeComponents = Partial<{ [K in ThemeComponentKey]: DeepPartial<ThemeComponentTokensMap[K]> }>
export interface ThemeContextValue { foundations: ThemeTokens; components?: ThemeComponents }

export const ThemeContext = React.createContext<ThemeContextValue>({ foundations: defaultTokens, components: undefined })
