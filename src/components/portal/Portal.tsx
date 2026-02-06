import React, { useContext, useLayoutEffect, useMemo, useRef } from 'react'

import Overlay, { type OverlayProps } from '../overlay'
import {
  PortalHost,
  portalManager as globalManager,
  portalStore,
} from './PortalHost'
import { PortalContext } from './PortalContext'

export type PortalProps = OverlayProps

const PortalComponentImpl = (
  {
    children,
    isOpen,
    visible,
    useRNModal,
    useRNModalOnAndroid,
    isKeyboardDismissable,
    animationPreset,
    onRequestClose,
    style,
  }: PortalProps,
  _ref: React.ForwardedRef<React.ComponentRef<typeof Overlay>>,
) => {
  const manager = useContext(PortalContext) ?? globalManager
  const keyRef = useRef<number | null>(null)
  const resolvedOpen = isOpen ?? visible ?? true

  const overlayNode = useMemo(() => (
    <Overlay
      isOpen={resolvedOpen}
      useRNModal={useRNModal ?? false}
      useRNModalOnAndroid={useRNModalOnAndroid}
      isKeyboardDismissable={isKeyboardDismissable}
      animationPreset={animationPreset}
      onRequestClose={onRequestClose}
      style={style}
    >
      {children}
    </Overlay>
  ), [
    animationPreset,
    children,
    isKeyboardDismissable,
    onRequestClose,
    resolvedOpen,
    style,
    useRNModal,
    useRNModalOnAndroid,
  ])

  useLayoutEffect(() => {
    if (keyRef.current === null) {
      keyRef.current = manager.mount(overlayNode)
    } else {
      manager.update(keyRef.current, overlayNode)
    }
  }, [manager, overlayNode])

  useLayoutEffect(() => () => {
    if (keyRef.current !== null) {
      manager.unmount(keyRef.current)
      keyRef.current = null
    }
  }, [manager])

  return null
}

const PortalComponentRef = React.forwardRef<React.ComponentRef<typeof Overlay>, PortalProps>(PortalComponentImpl)
PortalComponentRef.displayName = 'Portal'
const PortalComponent = React.memo(PortalComponentRef)

const add = (children: React.ReactNode, key?: number) => globalManager.mount(children, key)
const remove = (key: number) => globalManager.unmount(key)
const update = (key: number, children: React.ReactNode) => globalManager.update(key, children)
const clear = () => portalStore.clear()

export const Portal = Object.assign(PortalComponent, { Host: PortalHost, add, remove, update, clear })
export default Portal
