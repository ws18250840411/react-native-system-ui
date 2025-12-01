import * as React from 'react'

import type { TabbarValue } from './types'

export interface TabbarContextValue {
  activeValue?: TabbarValue
  activeColor: string
  inactiveColor: string
  fontSize: number
  fontWeight: string | number
  onSelect: (name: TabbarValue, index: number) => void
}

export const TabbarContext = React.createContext<TabbarContextValue | null>(null)

export const useTabbarContext = () => React.useContext(TabbarContext)
