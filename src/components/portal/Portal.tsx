import React from 'react'

import { PortalContext } from './PortalContext'
import {
  PortalHost,
  ensureGlobalPortalHost,
  portalManager as globalManager,
  portalStore,
} from './PortalHost'

export interface PortalProps {
  children?: React.ReactNode
}

const usePortalManager = () => React.useContext(PortalContext) ?? globalManager

const PortalComponent: React.FC<PortalProps> = ({ children }) => {
  const manager = usePortalManager()
  const keyRef = React.useRef<number | null>(null)
  const skipNextUpdateRef = React.useRef(false)

  React.useEffect(() => {
    if (manager === globalManager && typeof document === 'undefined') {
      void ensureGlobalPortalHost()
    }
  }, [manager])

  React.useLayoutEffect(() => {
    if (manager === globalManager && typeof document !== 'undefined') {
      void ensureGlobalPortalHost()
    }

    const key = manager.mount(children ?? null)
    keyRef.current = key
    skipNextUpdateRef.current = true
    return () => {
      if (keyRef.current !== null) {
        manager.unmount(keyRef.current)
        keyRef.current = null
      }
    }
  }, [manager])

  React.useLayoutEffect(() => {
    if (skipNextUpdateRef.current) {
      skipNextUpdateRef.current = false
      return
    }
    if (keyRef.current === null) return
    manager.update(keyRef.current, children ?? null)
  }, [children, manager])

  return null
}

const add = (children: React.ReactNode, key?: number) => {
  ensureGlobalPortalHost()
  return globalManager.mount(children, key)
}

const remove = (key: number) => globalManager.unmount(key)
const update = (key: number, children: React.ReactNode) => globalManager.update(key, children)
const clear = () => portalStore.clear()

export const Portal = Object.assign(PortalComponent, { Host: PortalHost, add, remove, update, clear })

export default Portal
