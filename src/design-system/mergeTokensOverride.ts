import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'

export const mergeTokensOverride = <T>(
  base?: DeepPartial<T>,
  override?: DeepPartial<T>,
): DeepPartial<T> | undefined => {
  if (base && override) return deepMerge(base, override)
  return base ?? override
}
