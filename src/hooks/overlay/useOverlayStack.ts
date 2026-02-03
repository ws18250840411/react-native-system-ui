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

const useOverlayEntries = () =>
  useSyncExternalStore(
    overlayStackStore.subscribe,
    overlayStackStore.getSnapshot,
    overlayStackStore.getSnapshot
  )

export const useOverlayStack = ({
  visible,
  ...options
}: UseOverlayStackOptions): UseOverlayStackResult => {
  const entries = useOverlayEntries()
  const entryRef = useRef<OverlayStackEntry | null>(null)
  const optionsRef = useRef(options)
  if (
    optionsRef.current.onClose !== options.onClose ||
    optionsRef.current.closeOnBack !== options.closeOnBack ||
    optionsRef.current.lockScroll !== options.lockScroll ||
    optionsRef.current.zIndex !== options.zIndex ||
    optionsRef.current.type !== options.type ||
    optionsRef.current.meta !== options.meta
  ) {
    optionsRef.current = options
  }
  const stableOptions = optionsRef.current

  useEffect(() => {
    if (!visible) {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
      return
    }
    const entry = overlayStackStore.mount(stableOptions)
    entryRef.current = entry
    return () => {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
    }
  }, [visible])

  useEffect(() => {
    if (!visible || !entryRef.current) {
      return
    }
    overlayStackStore.update(entryRef.current.key, stableOptions)
  }, [stableOptions, visible])

  const current = entryRef.current
  const snapshotEntry = current
    ? entries.find(entry => entry.key === current.key)
    : undefined

  const top = entries[entries.length - 1]

  return {
    entryKey: snapshotEntry?.key ?? null,
    zIndex: snapshotEntry?.zIndex ?? stableOptions.zIndex,
    isTopMost: !!snapshotEntry && (!!top && top.key === snapshotEntry.key),
  }
}
