import { isFunction } from '../utils/base'

export interface WindowRect { x: number; y: number; width: number; height: number }

type MeasureNode = { measureInWindow?: (cb: (x: number, y: number, w: number, h: number) => void) => void }
type DomNode = { getBoundingClientRect?: () => { left?: number; top?: number; width?: number; height?: number } }

const toRect = (x?: number, y?: number, w?: number, h?: number): WindowRect | null =>
  [x, y, w, h].every(Number.isFinite) ? { x: x!, y: y!, width: w!, height: h! } : null

export const measureInWindow = (node: unknown, cb: (rect: WindowRect | null) => void) => {
  if (!node) { cb(null); return }; try {
    const mn = node as MeasureNode; if (isFunction(mn.measureInWindow)) { mn.measureInWindow((x, y, w, h) => cb(toRect(x, y, w, h))); return }; const dn = node as DomNode
    if (isFunction(dn.getBoundingClientRect)) { const r = dn.getBoundingClientRect(); cb(toRect(r?.left, r?.top, r?.width, r?.height)); return }; cb(null)
  } catch { cb(null) }
}
