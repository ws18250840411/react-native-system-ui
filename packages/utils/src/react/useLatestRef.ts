import { useEffect, useRef } from 'react'

/**
 * Keeps a mutable ref pointing to the latest value without
 * forcing downstream components to re-render.
 */
export function useLatestRef<T>(value: T) {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
