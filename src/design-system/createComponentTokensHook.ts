import * as React from 'react'

import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'
import type { ThemeComponentKey, ThemeComponentTokensMap } from './ThemeContext'
import type { Foundations } from './tokens'
import { useTheme } from './useTheme'

export const createComponentTokensHook = <K extends ThemeComponentKey>(
  key: K,
  createBaseTokens: (foundations: Foundations) => ThemeComponentTokensMap[K]
) => {
  return (overrides?: DeepPartial<ThemeComponentTokensMap[K]>) => {
    const { foundations, components } = useTheme()
    const componentOverrides = components?.[key]
    return React.useMemo(() => {
      const base = createBaseTokens(foundations)
      const merged =
        componentOverrides && overrides
          ? deepMerge(componentOverrides, overrides)
          : componentOverrides ?? overrides
      return merged ? deepMerge(base, merged) : base
    }, [componentOverrides, foundations, overrides])
  }
}

