import { useCallback } from 'react'

import { useLatestRef } from './useLatestRef'

/**
 * Stable callback reference that always invokes the latest handler.
 */
export function useEvent<T extends (...args: any[]) => any>(handler?: T) {
  const handlerRef = useLatestRef(handler)

  return useCallback((...args: Parameters<T>) => {
    const fn = handlerRef.current
    if (fn) {
      return fn(...args)
    }
    return undefined
  }, [handlerRef])
}
