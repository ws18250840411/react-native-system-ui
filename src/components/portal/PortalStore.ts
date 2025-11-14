import React from 'react'

type Listener = () => void

export interface PortalEntry {
  key: number
  children: React.ReactNode
}

export class PortalStore {
  private listeners = new Set<Listener>()
  private nextKey = 1
  private items = new Map<number, React.ReactNode>()
  private cachedSnapshot: PortalEntry[] | null = null

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getSnapshot = () => {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = Array.from(this.items.entries()).map(([key, children]) => ({ key, children }))
    }
    return this.cachedSnapshot
  }

  mount = (children: React.ReactNode, key?: number): number => {
    const resolvedKey = key ?? this.nextKey++
    this.items.set(resolvedKey, children)
    this.emit(true)
    return resolvedKey
  }

  update = (key: number, children: React.ReactNode) => {
    if (!this.items.has(key)) {
      this.mount(children, key)
      return
    }
    this.items.set(key, children)
    this.emit(true)
  }

  unmount = (key: number) => {
    if (this.items.delete(key)) {
      this.emit(true)
    }
  }

  clear = () => {
    if (this.items.size === 0) return
    this.items.clear()
    this.emit(true)
  }

  private emit(dirty = false) {
    if (dirty) {
      this.cachedSnapshot = null
    }
    this.listeners.forEach(listener => listener())
  }
}
