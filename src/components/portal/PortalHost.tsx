import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSyncExternalStore } from 'react'

import { PortalContext, type PortalManager } from './PortalContext'
import { PortalStore } from './PortalStore'

const globalStore = new PortalStore()
let mountedHosts = 0
let autoHostContainer: HTMLElement | null = null
let autoHostRoot: any = null
let hostPromise: Promise<void> | null = null
let warnedNative = false

const createManager = (store: PortalStore): PortalManager => ({
  mount: (children, key) => store.mount(children, key),
  update: (key, children) => store.update(key, children),
  unmount: key => store.unmount(key),
})

const globalManager = createManager(globalStore)

export interface PortalHostProps {
  children?: React.ReactNode
}

export const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const entries = useSyncExternalStore(globalStore.subscribe, globalStore.getSnapshot, globalStore.getSnapshot)
  const registeredRef = React.useRef(false)

  if (!registeredRef.current) {
    mountedHosts += 1
    registeredRef.current = true
  }

  React.useEffect(() => {
    return () => {
      if (registeredRef.current) {
        mountedHosts = Math.max(0, mountedHosts - 1)
        registeredRef.current = false
      }
    }
  }, [])

  return (
    <PortalContext.Provider value={globalManager}>
      <View style={styles.container} pointerEvents="box-none">
        {children}
        {entries.map(entry => (
          <React.Fragment key={entry.key}>{entry.children}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
})

export const portalManager = globalManager
export const portalStore = globalStore

export const ensureGlobalPortalHost = () => {
  if (mountedHosts > 0 || typeof document === 'undefined') {
    if (mountedHosts === 0 && typeof document === 'undefined' && !warnedNative) {
      warnedNative = true
      console.warn('[Portal] 请在根节点挂载 <PortalHost> 或 <ConfigProvider> 以启用静态组件能力。')
    }
    return Promise.resolve()
  }
  if (autoHostContainer) return Promise.resolve()
  if (hostPromise) return hostPromise

  const doc = document
  hostPromise = import('react-dom/client')
    .then(({ createRoot }) => {
      if (autoHostContainer) return
      autoHostContainer = doc.createElement('div')
      autoHostContainer.setAttribute('data-rnsu-portal-host', 'true')
      doc.body.appendChild(autoHostContainer)
      autoHostRoot = createRoot(autoHostContainer)
      autoHostRoot.render(<PortalHost />)
    })
    .catch(error => {
      console.warn('[Portal] 无法自动挂载 PortalHost:', error)
    })
    .finally(() => {
      hostPromise = null
    })

  return hostPromise
}
