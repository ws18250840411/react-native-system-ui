import * as React from 'react'

export interface SidebarContextValue {
  activeIndex: number
  onSelect: (index: number) => void
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export const useSidebarContext = () => React.useContext(SidebarContext)
