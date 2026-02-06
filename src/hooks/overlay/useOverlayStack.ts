import { useEffect, useRef, useSyncExternalStore } from 'react'
import type { OverlayStackEntry, OverlayStackMountOptions } from './OverlayStackStore'
import { overlayStackStore } from './OverlayStackStore'

export interface UseOverlayStackOptions extends OverlayStackMountOptions {
  visible: boolean
}

export interface UseOverlayStackResult {
  entryKey: number | null
  zIndex?: number
  isTopMost: boolean
}

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
