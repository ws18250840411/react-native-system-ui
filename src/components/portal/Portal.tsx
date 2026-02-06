import React, { useContext, useLayoutEffect, useRef } from 'react'

import {
  PortalHost,
  portalManager as globalManager,
  portalStore,
} from './PortalHost'
import { PortalContext } from './PortalContext'

export interface PortalProps {
  children?: React.ReactNode
  isOpen?: boolean
  visible?: boolean
}

const PortalComponentImpl = (
  { children, isOpen, visible }: PortalProps,
  _ref: React.ForwardedRef<any>,
) => {
  const manager = useContext(PortalContext) ?? globalManager
  const keyRef = useRef<number | null>(null)
  const resolvedOpen = isOpen ?? visible ?? true
  const content = resolvedOpen ? children : null

  useLayoutEffect(() => {
    if (keyRef.current === null) keyRef.current = manager.mount(content)
    else manager.update(keyRef.current, content)
  }, [manager, content])

  useLayoutEffect(() => () => {
    if (keyRef.current !== null) {
      manager.unmount(keyRef.current)
      keyRef.current = null
    }
  }, [manager])

  return null
}

const PortalComponentRef = React.forwardRef<any, PortalProps>(PortalComponentImpl)
PortalComponentRef.displayName = 'Portal'
const PortalComponent = React.memo(PortalComponentRef)

const add = (children: React.ReactNode, key?: number) => globalManager.mount(children, key)
const remove = (key: number) => globalManager.unmount(key)
const update = (key: number, children: React.ReactNode) => globalManager.update(key, children)
const clear = () => portalStore.clear()

export const Portal = Object.assign(PortalComponent, { Host: PortalHost, add, remove, update, clear })
export default Portal
