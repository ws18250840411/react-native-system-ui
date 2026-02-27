export const shallowEqualArray = <T>(a: T[] = [], b: T[] = []) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}
export const shallowEqualObject = (a?: Record<string, unknown> | null, b?: Record<string, unknown> | null): boolean => {
  if (a === b) return true; if (!a || !b) return false
  const ks = Object.keys(a); if (ks.length !== Object.keys(b).length) return false
  for (const k of ks) if (a[k] !== b[k]) return false; return true
}
const isPlainObject = (v: unknown): v is Record<string, unknown> => Object.prototype.toString.call(v) === '[object Object]'
export const deepEqualObject = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (!deepEqualObject(a[i], b[i])) return false
    return true
  }
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!isPlainObject(a) || !isPlainObject(b)) return false
  const aKeys = Object.keys(a)
  if (aKeys.length !== Object.keys(b).length) return false
  for (const k of aKeys) if (!deepEqualObject(a[k], b[k])) return false
  return true
}
