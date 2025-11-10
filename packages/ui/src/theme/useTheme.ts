import { StyleSheet } from 'react-native'
import { useMemo } from 'react'

import type { ThemeTokens } from './tokens'
import { mergeTokens, defaultThemeTokens } from './tokens'
import { useThemeTokens } from './ThemeProvider'

export type ThemeModule<V, S> = {
  vars: (tokens: ThemeTokens) => V
  styles?: (vars: V, tokens: ThemeTokens) => S
}

export type ThemeModuleResult<V, S> = {
  tokens: ThemeTokens
  vars: V
  styles: S
}

export function createThemeModule<V, S>(module: ThemeModule<V, S>) {
  return module
}

export function useThemeModule<V, S>(module: ThemeModule<V, S>, overrides?: Partial<V>): ThemeModuleResult<V, S> {
  const tokens = useThemeTokens()

  const vars = useMemo(() => {
    const base = module.vars(tokens)
    return overrides ? { ...base, ...overrides } : base
  }, [module, tokens, overrides])

  const styles = useMemo(() => {
    if (!module.styles) {
      return {} as S
    }
    return module.styles(vars, tokens)
  }, [module, tokens, vars])

  return {
    tokens,
    vars,
    styles,
  }
}

export const createMemoStyles = <Styles extends Record<string, any>>(styles: Styles) =>
  StyleSheet.create(styles)

export type ThemeOverride = Parameters<typeof mergeTokens>[1]
export { mergeTokens, defaultThemeTokens }
