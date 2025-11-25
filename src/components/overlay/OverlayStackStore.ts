import * as React from 'react'
import { BackHandler } from 'react-native'

export interface OverlayStackEntry {
  key: number
  zIndex: number
  onClose?: () => void
  closeOnBack?: boolean
  lockScroll?: boolean
  type?: string
  meta?: Record<string, any>
}

export type OverlayStackSnapshot = readonly OverlayStackEntry[]

export interface OverlayStackMountOptions {
  onClose?: () => void
  closeOnBack?: boolean
  lockScroll?: boolean
  type?: string
  zIndex?: number
  meta?: Record<string, any>
}

type Listener = () => void

const DEFAULT_BASE_Z_INDEX = 1000
const DEFAULT_Z_INDEX_STEP = 2

export class OverlayStackStore {
  private listeners = new Set<Listener>()
  private entries: OverlayStackEntry[] = []
  private keySeed = 0

  constructor(
    private readonly baseZIndex: number = DEFAULT_BASE_Z_INDEX,
    private readonly zIndexStep: number = DEFAULT_Z_INDEX_STEP
  ) {}

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getSnapshot = (): OverlayStackSnapshot => this.entries

  mount = (options: OverlayStackMountOptions): OverlayStackEntry => {
    const key = ++this.keySeed
    const entry: OverlayStackEntry = {
      key,
      zIndex: this.resolveZIndex(options.zIndex),
      onClose: options.onClose,
      closeOnBack: options.closeOnBack,
      lockScroll: options.lockScroll,
      type: options.type,
      meta: options.meta,
    }
    this.entries = [...this.entries, entry]
    this.emit()
    return entry
  }

  update = (
    key: number,
    options: Partial<OverlayStackMountOptions>
  ): OverlayStackEntry | undefined => {
    const index = this.entries.findIndex(item => item.key === key)
    if (index === -1) return undefined
    const prev = this.entries[index]
    const next: OverlayStackEntry = {
      ...prev,
      ...options,
      zIndex: options.zIndex ?? prev.zIndex,
    }
    this.entries = [...this.entries.slice(0, index), next, ...this.entries.slice(index + 1)]
    this.emit()
    return next
  }

  unmount = (key: number) => {
    const next = this.entries.filter(entry => entry.key !== key)
    if (next.length === this.entries.length) {
      return
    }
    this.entries = next
    this.emit()
  }

  peek = (): OverlayStackEntry | undefined => this.entries[this.entries.length - 1]

  size = () => this.entries.length

  getBaseZIndex = () => this.baseZIndex

  private resolveZIndex = (provided?: number) => {
    if (typeof provided === 'number') {
      return provided
    }
    const top = this.peek()
    if (!top) {
      return this.baseZIndex
    }
    return top.zIndex + this.zIndexStep
  }

  private emit = () => {
    this.listeners.forEach(listener => {
      listener()
    })
  }
}

export const overlayStackStore = new OverlayStackStore()

let backHandlerSubscription: ReturnType<typeof BackHandler.addEventListener> | null = null
let locked = false
let previousOverflow = ''

const syncBackHandler = () => {
  const entries = overlayStackStore.getSnapshot()
  const hasClosable = entries.some(entry => entry.closeOnBack && entry.onClose)
  if (hasClosable && !backHandlerSubscription && BackHandler?.addEventListener) {
    backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const currentEntries = overlayStackStore.getSnapshot()
      for (let i = currentEntries.length - 1; i >= 0; i -= 1) {
        const entry = currentEntries[i]
        if (entry.closeOnBack && entry.onClose) {
          entry.onClose()
          return true
        }
      }
      return false
    })
    return
  }
  if (!hasClosable && backHandlerSubscription) {
    backHandlerSubscription.remove()
    backHandlerSubscription = null
  }
}

const syncScrollLock = () => {
  if (typeof document === 'undefined') return
  const shouldLock = overlayStackStore.getSnapshot().some(entry => entry.lockScroll)
  if (shouldLock && !locked) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    locked = true
  } else if (!shouldLock && locked) {
    document.body.style.overflow = previousOverflow
    locked = false
  }
}

const handleStoreChange = () => {
  syncBackHandler()
  syncScrollLock()
}

overlayStackStore.subscribe(handleStoreChange)
handleStoreChange()
