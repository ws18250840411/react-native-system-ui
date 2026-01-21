import React from 'react'
import { isFunction } from '../../utils'
import type { TabPaneProps } from './types'
import TabPane from './TabPane'

export const requestFrame =
  typeof requestAnimationFrame !== 'undefined' && isFunction(requestAnimationFrame)
    ? requestAnimationFrame
    : (cb: (time?: number) => void) => setTimeout(cb, 16)

export const isTabPaneElement = (child: React.ReactNode): child is React.ReactElement<TabPaneProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type === TabPane) return true
  const type = child.type as unknown as { displayName?: string }
  return type.displayName === 'Tabs.TabPane'
}
