import type { DeepPartial } from '../types'

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  Object.prototype.toString.call(v) === '[object Object]'

export function deepMerge<T>(target: T, source?: DeepPartial<T>): T
export function deepMerge<T>(target: DeepPartial<T>, source?: DeepPartial<T>): DeepPartial<T>
export function deepMerge<T>(target: T, source?: DeepPartial<T>) {
  if (!source) return target
  if (!Array.isArray(target) && !isPlainObject(target)) return source as unknown as T
  const out = (Array.isArray(target) ? [...target as any] : { ...target as any }) as Record<string, unknown>
  for (const k of Object.keys(source)) {
    const sv = (source as any)[k]; if (sv === undefined) continue
    const tv = (target as any)[k]; if (isPlainObject(tv) && isPlainObject(sv)) { out[k] = deepMerge(tv, sv as DeepPartial<Record<string, unknown>>); continue }
    out[k] = Array.isArray(sv) ? [...sv] : isPlainObject(sv) ? { ...sv } : sv
  }
  return out as unknown as T
}
