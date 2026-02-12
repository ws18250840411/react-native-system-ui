import type { DeepPartial } from '../types'
import { deepMerge } from '../utils/deepMerge'
export const mergeTokensOverride = <T>(base?: DeepPartial<T>, override?: DeepPartial<T>): DeepPartial<T> | undefined => (base && override) ? deepMerge(base, override) : (base ?? override)
