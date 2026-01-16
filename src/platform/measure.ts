import { isFunction } from '../utils/validate'

export interface WindowRect {
  x: number
  y: number
  width: number
  height: number
}

type MeasureInWindowNode = {
  measureInWindow?: (callback: (x: number, y: number, width: number, height: number) => void) => void
}

type BoundingClientRectNode = {
  getBoundingClientRect?: () => { left?: number; top?: number; width?: number; height?: number }
}

export const measureInWindow = (node: unknown, callback: (rect: WindowRect | null) => void) => {
  if (!node) {
    callback(null)
    return
  }

  try {
    const maybeMeasureNode = node as MeasureInWindowNode
    if (isFunction(maybeMeasureNode.measureInWindow)) {
      maybeMeasureNode.measureInWindow((x: number, y: number, width: number, height: number) => {
        if (![x, y, width, height].every(Number.isFinite)) {
          callback(null)
          return
        }
        callback({ x, y, width, height })
      })
      return
    }

    const maybeDomNode = node as BoundingClientRectNode
    if (isFunction(maybeDomNode.getBoundingClientRect)) {
      const rect = maybeDomNode.getBoundingClientRect()
      const x = rect?.left
      const y = rect?.top
      const width = rect?.width
      const height = rect?.height
      if (![x, y, width, height].every(Number.isFinite)) {
        callback(null)
        return
      }
      callback({
        x: x as number,
        y: y as number,
        width: width as number,
        height: height as number,
      })
      return
    }
  } catch (_error) {
    callback(null)
    return
  }

  callback(null)
}
