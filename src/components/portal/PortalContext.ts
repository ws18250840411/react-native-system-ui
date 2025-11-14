import React from 'react'

export interface PortalManager {
  mount: (children: React.ReactNode, key?: number) => number
  update: (key: number, children: React.ReactNode) => void
  unmount: (key: number) => void
}

export const PortalContext = React.createContext<PortalManager | null>(null)
