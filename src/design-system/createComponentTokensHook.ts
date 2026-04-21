import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'
import type { ThemeComponentKey, ThemeComponentTokensMap } from './ThemeContext'
import type { Foundations } from './tokens'
import { useTheme } from './useTheme'
const isObjectLike = (value: unknown): value is object => typeof value === 'object' && value !== null
export const createComponentTokensHook = <K extends ThemeComponentKey>(
  key: K,
  createBaseTokens: (foundations: Foundations) => ThemeComponentTokensMap[K],
) : ((overrides?: DeepPartial<ThemeComponentTokensMap[K]>) => ThemeComponentTokensMap[K]) => {
  const baseCache = new WeakMap<object, ThemeComponentTokensMap[K]>()
  const mergeCache = new WeakMap<object, WeakMap<object, ThemeComponentTokensMap[K]>>()
  const pairCache = new WeakMap<object, WeakMap<object, DeepPartial<ThemeComponentTokensMap[K]>>>()
  return (overrides?: DeepPartial<ThemeComponentTokensMap[K]>): ThemeComponentTokensMap[K] => {
    const { foundations, components } = useTheme()
    const co = components?.[key]
    const foundationKey = foundations as object
    let base = baseCache.get(foundationKey)
    if (!base) {
      base = createBaseTokens(foundations)
      baseCache.set(foundationKey, base)
    }
    if (!co && !overrides) return base
    const mergedOverrides = co && overrides ? getCachedPairMerge(pairCache, co, overrides) : co ?? overrides
    return mergedOverrides ? getCachedMerge(mergeCache, base, mergedOverrides) : base
  }
}
const getCachedMerge = <T extends object>(cache: WeakMap<object, WeakMap<object, T>>, base: T, patch: DeepPartial<T>) => {
  if (!isObjectLike(patch)) return deepMerge(base, patch)
  let nested = cache.get(base)
  if (!nested) {
    nested = new WeakMap<object, T>()
    cache.set(base, nested)
  }
  const cached = nested.get(patch)
  if (cached) return cached
  const merged = deepMerge(base, patch)
  nested.set(patch, merged)
  return merged
}
const getCachedPairMerge = <T extends object>(cache: WeakMap<object, WeakMap<object, DeepPartial<T>>>, themeOverrides: DeepPartial<T>, localOverrides: DeepPartial<T>) => {
  if (!isObjectLike(themeOverrides) || !isObjectLike(localOverrides)) return deepMerge(themeOverrides, localOverrides)
  let nested = cache.get(themeOverrides)
  if (!nested) {
    nested = new WeakMap<object, DeepPartial<T>>()
    cache.set(themeOverrides, nested)
  }
  const cached = nested.get(localOverrides)
  if (cached) return cached
  const merged = deepMerge(themeOverrides, localOverrides)
  nested.set(localOverrides, merged)
  return merged
}
