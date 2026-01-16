import type { DeepPartial } from '../types'

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function deepMerge<T>(target: T, source?: DeepPartial<T>): T
export function deepMerge<T>(target: DeepPartial<T>, source?: DeepPartial<T>): DeepPartial<T>
export function deepMerge<T>(target: T, source?: DeepPartial<T>) {
  if (!source) {
    return target
  }

  if (!Array.isArray(target) && !isPlainObject(target)) {
    return source as unknown as T
  }

  const output: Record<string, unknown> | unknown[] = Array.isArray(target)
    ? [...(target as unknown as unknown[])]
    : { ...(target as unknown as Record<string, unknown>) }

  Object.keys(source).forEach(key => {
    const sourceValue = (source as unknown as Record<string, unknown>)[key]

    if (sourceValue === undefined) {
      return
    }

    const targetValue = (target as unknown as Record<string, unknown>)[key]

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      ; (output as Record<string, unknown>)[key] = deepMerge(
        targetValue,
        sourceValue as DeepPartial<Record<string, unknown>>
      )
      return
    }

    ; (output as Record<string, unknown>)[key] = Array.isArray(sourceValue)
      ? [...sourceValue]
      : isPlainObject(sourceValue)
        ? { ...sourceValue }
        : sourceValue
  })

  return output as unknown as T
}
