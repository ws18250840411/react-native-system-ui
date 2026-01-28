import * as React from 'react'
import { useContext } from 'react'
import type { TextStyle } from 'react-native'

import type { TabbarValue } from './types'

export interface TabbarContextValue {
  activeValue?: TabbarValue
  activeColor: string
  inactiveColor: string
  fontSize: number
  fontWeight: TextStyle['fontWeight']
  onSelect: (name: TabbarValue, index: number) => void
}

export const TabbarContext = React.createContext<TabbarContextValue | null>(null)

export const useTabbarContext = () => useContext(TabbarContext)
