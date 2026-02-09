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
