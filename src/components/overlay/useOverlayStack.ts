import React, { useSyncExternalStore } from 'react'

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
  const entryRef = React.useRef<OverlayStackEntry | null>(null)

  React.useEffect(() => {
    if (!visible) {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
      return
    }
    const entry = overlayStackStore.mount(options)
    entryRef.current = entry
    return () => {
      if (entryRef.current) {
        overlayStackStore.unmount(entryRef.current.key)
        entryRef.current = null
      }
    }
  }, [visible])

  React.useEffect(() => {
    if (!visible || !entryRef.current) {
      return
    }
    overlayStackStore.update(entryRef.current.key, options)
  }, [visible, options.onClose, options.closeOnBack, options.lockScroll, options.zIndex, options.type])

  const current = entryRef.current
  const snapshotEntry = current
    ? entries.find(entry => entry.key === current.key)
    : undefined

  const top = entries[entries.length - 1]

  return {
    entryKey: snapshotEntry?.key ?? null,
    zIndex: snapshotEntry?.zIndex ?? options.zIndex,
    isTopMost: !!snapshotEntry && (!!top && top.key === snapshotEntry.key),
  }
}
