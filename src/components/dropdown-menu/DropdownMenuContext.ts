import React from 'react'

import type { DropdownMenuDirection } from './types'

export interface DropdownMenuContextValue {
  activeIndex: number | null
  registerPanel: (index: number, panel: React.ReactNode) => void
  toggleItem: (index: number) => void
  showItem: (index: number) => void
  closeMenu: () => void
  activeColor?: string
  activeIcon?: React.ReactNode
  direction: DropdownMenuDirection
  disabled?: boolean
  menuValue?: Record<string, string | number>
  onMenuChange?: (value: Record<string, string | number>) => void
}

export const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export const useDropdownMenuContext = () => {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx) throw new Error('DropdownItem must be used within DropdownMenu')
  return ctx
}
