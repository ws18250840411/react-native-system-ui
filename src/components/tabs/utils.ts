import React from 'react'
import { isFunction } from '../../utils'
import type { TabPaneProps } from './types'
import TabPane from './TabPane'

const canUseRaf =
  typeof requestAnimationFrame !== 'undefined' &&
  isFunction(requestAnimationFrame) &&
  typeof cancelAnimationFrame !== 'undefined' &&
  isFunction(cancelAnimationFrame)

export const requestFrame = canUseRaf
  ? (cb: (time?: number) => void) => requestAnimationFrame(cb)
  : (cb: (time?: number) => void) => setTimeout(cb, 16) as unknown as number

export const cancelFrame = (id: number | null) => {
  if (id == null) return
  if (canUseRaf) {
    cancelAnimationFrame(id)
  } else {
    clearTimeout(id)
  }
}

export const isTabPaneElement = (child: React.ReactNode): child is React.ReactElement<TabPaneProps> => {
  if (!React.isValidElement(child)) return false
  if (child.type === TabPane) return true
  const type = child.type as unknown as { displayName?: string }
  return type.displayName === 'Tabs.TabPane'
}
