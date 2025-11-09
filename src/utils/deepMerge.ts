/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DeepPartial } from '../types'

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function deepMerge<T>(target: T, source?: DeepPartial<T>): T {
  if (!source) {
    return target
  }

  const output: any = Array.isArray(target) ? [...(target as any[])] : { ...(target as any) }

  Object.keys(source).forEach(key => {
    const sourceValue = (source as Record<string, unknown>)[key]

    if (sourceValue === undefined) {
      return
    }

    const targetValue = (target as Record<string, unknown>)[key]

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue as DeepPartial<unknown>)
      return
    }

    output[key] = Array.isArray(sourceValue)
      ? [...sourceValue]
      : isPlainObject(sourceValue)
        ? { ...sourceValue }
        : sourceValue
  })

  return output as T
}
