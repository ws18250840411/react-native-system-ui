import { useEffect, useRef, useSyncExternalStore } from 'react'
import { BackHandler, Platform } from 'react-native'
import { setBodyScrollLocked } from '../../platform/scrollLock'
import { isNumber } from '../../utils/base'

export interface OverlayStackEntry { key: number; zIndex: number; onClose?: () => void; closeOnBack?: boolean; lockScroll?: boolean; type?: string; meta?: Record<string, any> }
export type OverlayStackSnapshot = readonly OverlayStackEntry[]
export interface OverlayStackMountOptions { onClose?: () => void; closeOnBack?: boolean; lockScroll?: boolean; type?: string; zIndex?: number; meta?: Record<string, any> }
type Listener = () => void

export class OverlayStackStore {
  private listeners = new Set<Listener>(); private entries: OverlayStackEntry[] = []; private keySeed = 0
  constructor(private readonly baseZ = 1000, private readonly zStep = 2) {}
  subscribe = (l: Listener) => { this.listeners.add(l); return () => { this.listeners.delete(l) } }
  getSnapshot = (): OverlayStackSnapshot => this.entries; peek = (): OverlayStackEntry | undefined => this.entries[this.entries.length - 1]; size = () => this.entries.length; getBaseZIndex = () => this.baseZ
  mount = (o: OverlayStackMountOptions): OverlayStackEntry => { const entry: OverlayStackEntry = { key: ++this.keySeed, zIndex: this.resolveZ(o.zIndex), onClose: o.onClose, closeOnBack: o.closeOnBack, lockScroll: o.lockScroll, type: o.type, meta: o.meta }; this.entries = [...this.entries, entry]; this.emit(); return entry }
  update = (key: number, o: Partial<OverlayStackMountOptions>): OverlayStackEntry | undefined => { const i = this.entries.findIndex(e => e.key === key); if (i === -1) return undefined; const next: OverlayStackEntry = { ...this.entries[i], ...o, zIndex: isNumber(o.zIndex) ? this.resolveZ(o.zIndex) : this.entries[i].zIndex }; this.entries = [...this.entries.slice(0, i), next, ...this.entries.slice(i + 1)]; this.emit(); return next }
  unmount = (key: number) => { const next = this.entries.filter(e => e.key !== key); if (next.length !== this.entries.length) { this.entries = next; this.emit() } }
  private resolveZ = (v?: number) => { if (isNumber(v)) return (!Number.isFinite(v) || v < 0) ? this.baseZ : v >= this.baseZ ? v : this.baseZ + v; const top = this.peek(); return top ? top.zIndex + this.zStep : this.baseZ }
  private emit = () => { this.listeners.forEach(l => l()) }
}

export const overlayStackStore = new OverlayStackStore()
let backSub: ReturnType<typeof BackHandler.addEventListener> | null = null
const syncBack = () => { if (Platform.OS === 'web') return; const entries = overlayStackStore.getSnapshot(); const has = entries.some(e => e.closeOnBack && e.onClose); if (has && !backSub && BackHandler?.addEventListener) { backSub = BackHandler.addEventListener('hardwareBackPress', () => { const cur = overlayStackStore.getSnapshot(); for (let i = cur.length - 1; i >= 0; i--) { if (cur[i].closeOnBack && cur[i].onClose) { cur[i].onClose!(); return true } } return false }); return }; if (!has && backSub) { backSub.remove(); backSub = null } }
const onChange = () => { syncBack(); setBodyScrollLocked(overlayStackStore.getSnapshot().some(e => e.lockScroll)) }
overlayStackStore.subscribe(onChange); onChange()
export interface UseOverlayStackOptions extends OverlayStackMountOptions { visible: boolean }
export interface UseOverlayStackResult { entryKey: number | null; zIndex?: number; isTopMost: boolean }
const useEntries = () => useSyncExternalStore(overlayStackStore.subscribe, overlayStackStore.getSnapshot, overlayStackStore.getSnapshot)
export const useOverlayStack = ({ visible, ...options }: UseOverlayStackOptions): UseOverlayStackResult => {
  const entries = useEntries()
  const entryRef = useRef<OverlayStackEntry | null>(null)
  const optRef = useRef(options)
  if (
    optRef.current.onClose !== options.onClose || optRef.current.closeOnBack !== options.closeOnBack ||
    optRef.current.lockScroll !== options.lockScroll || optRef.current.zIndex !== options.zIndex ||
    optRef.current.type !== options.type || optRef.current.meta !== options.meta
  ) optRef.current = options
  const opts = optRef.current
  useEffect(() => {
    if (!visible) {
      if (entryRef.current) { overlayStackStore.unmount(entryRef.current.key); entryRef.current = null }
      return
    }
    entryRef.current = overlayStackStore.mount(opts)
    return () => { if (entryRef.current) { overlayStackStore.unmount(entryRef.current.key); entryRef.current = null } }
  }, [visible])
  useEffect(() => {
    if (visible && entryRef.current) overlayStackStore.update(entryRef.current.key, opts)
  }, [opts, visible])
  const cur = entryRef.current
  const snap = cur ? entries.find(e => e.key === cur.key) : undefined
  const top = entries[entries.length - 1]
  return { entryKey: snap?.key ?? null, zIndex: snap?.zIndex ?? opts.zIndex, isTopMost: !!snap && !!top && top.key === snap.key }
}
