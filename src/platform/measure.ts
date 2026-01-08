import { isFunction } from '../utils/validate'

export interface WindowRect {
  x: number
  y: number
  width: number
  height: number
}

export const measureInWindow = (node: any, callback: (rect: WindowRect | null) => void) => {
  if (!node) {
    callback(null)
    return
  }

  try {
    if (isFunction(node.measureInWindow)) {
      node.measureInWindow((x: number, y: number, width: number, height: number) => {
        if (![x, y, width, height].every(Number.isFinite)) {
          callback(null)
          return
        }
        callback({ x, y, width, height })
      })
      return
    }

    if (isFunction(node.getBoundingClientRect)) {
      const rect = node.getBoundingClientRect()
      const x = rect?.left
      const y = rect?.top
      const width = rect?.width
      const height = rect?.height
      if (![x, y, width, height].every(Number.isFinite)) {
        callback(null)
        return
      }
      callback({ x, y, width, height })
      return
    }
  } catch (_error) {
    callback(null)
    return
  }

  callback(null)
}

