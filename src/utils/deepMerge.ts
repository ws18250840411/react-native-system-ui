import type { DeepPartial } from '../types'

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  Object.prototype.toString.call(v) === '[object Object]'

export function deepMerge<T>(target: T, source?: DeepPartial<T>): T
export function deepMerge<T>(target: DeepPartial<T>, source?: DeepPartial<T>): DeepPartial<T>
export function deepMerge<T>(target: T, source?: DeepPartial<T>) {
  if (!source) return target
  if (!Array.isArray(target) && !isPlainObject(target)) return source as unknown as T
  const out = (Array.isArray(target) ? [...target as any] : { ...target as any }) as Record<string, unknown>
  for (const key of Object.keys(source)) {
    const sv = (source as any)[key]
    if (sv === undefined) continue
    const tv = (target as any)[key]
    if (isPlainObject(tv) && isPlainObject(sv)) { out[key] = deepMerge(tv, sv as DeepPartial<Record<string, unknown>>); continue }
    out[key] = Array.isArray(sv) ? [...sv] : isPlainObject(sv) ? { ...sv } : sv
  }
  return out as unknown as T
}
