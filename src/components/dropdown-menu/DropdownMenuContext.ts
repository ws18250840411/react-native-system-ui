import * as React from 'react'

export interface DropdownMenuContextValue {
  activeIndex: number | null
  toggleItem: (index: number, panel: React.ReactNode) => void
  updatePanel: (index: number, panel: React.ReactNode) => void
  closeMenu: () => void
  activeColor?: string
}

export const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export const useDropdownMenuContext = () => {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx) {
    throw new Error('DropdownItem must be used within DropdownMenu')
  }
  return ctx
}
