export const shallowEqualArray = <T>(a: T[] = [], b: T[] = []) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const shallowEqualObject = (
  prev?: Record<string, unknown> | null,
  next?: Record<string, unknown> | null,
): boolean => {
  if (prev === next) return true
  if (!prev || !next) return false
  const prevKeys = Object.keys(prev)
  const nextKeys = Object.keys(next)
  if (prevKeys.length !== nextKeys.length) return false
  for (const key of prevKeys) {
    if (prev[key] !== next[key]) return false
  }
  return true
}
