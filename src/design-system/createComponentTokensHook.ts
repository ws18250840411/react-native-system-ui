import { useMemo } from 'react'
import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'
import type { ThemeComponentKey, ThemeComponentTokensMap } from './ThemeContext'
import type { Foundations } from './tokens'
import { useTheme } from './useTheme'

export const createComponentTokensHook = <K extends ThemeComponentKey>(
  key: K,
  createBaseTokens: (foundations: Foundations) => ThemeComponentTokensMap[K],
) => (overrides?: DeepPartial<ThemeComponentTokensMap[K]>) => {
  const { foundations, components } = useTheme()
  const co = components?.[key]
  return useMemo(() => {
    const base = createBaseTokens(foundations)
    const merged = co && overrides ? deepMerge(co, overrides) : co ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [co, foundations, overrides])
}
