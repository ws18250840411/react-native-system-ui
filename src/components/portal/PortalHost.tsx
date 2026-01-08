import React from 'react'
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

import { isFunction, isNumber } from '../../utils/validate'
import { PortalContext, type PortalManager } from './PortalContext'

interface PortalEntry {
  key: number
  children: React.ReactNode
  zIndex?: number
}

interface PortalLayerProps {
  fixed?: boolean
}

interface PortalLayerState {
  entries: PortalEntry[]
}

class PortalLayer extends React.PureComponent<PortalLayerProps, PortalLayerState> {
  state: PortalLayerState = {
    entries: [],
  }

  setEntries = (entries: PortalEntry[]) => {
    this.setState({ entries })
  }

  render() {
    const { fixed } = this.props
    const { entries } = this.state
    return (
      <View
        pointerEvents="box-none"
        style={[styles.portalLayer, fixed && webFixedStyle]}
        collapsable={false}
      >
        {entries.map(entry => (
          <View
            key={entry.key}
            pointerEvents="box-none"
            collapsable={false}
            style={[
              styles.portalEntry,
              isNumber(entry.zIndex) ? { zIndex: entry.zIndex } : null,
            ]}
          >
            {entry.children}
          </View>
        ))}
      </View>
    )
  }
}

const getMaxZIndex = (node: React.ReactNode): number | undefined => {
  if (!node) return undefined
  if (Array.isArray(node)) {
    let max: number | undefined
    node.forEach(child => {
      const value = getMaxZIndex(child)
      if (isNumber(value)) {
        max = isNumber(max) ? Math.max(max, value) : value
      }
    })
    return max
  }

  if (React.isValidElement(node)) {
    const style = (node.props as any)?.style
    if (style && !isFunction(style)) {
      const flattened = StyleSheet.flatten(style)
      const zIndex = flattened?.zIndex
      if (isNumber(zIndex)) {
        return zIndex
      }
    }

    // 支持 Fragment / 包装组件：继续向内找
    return getMaxZIndex((node.props as any)?.children)
  }

  return undefined
}

const hostStack: PortalLayer[] = []
const portalEntries = new Map<number, { children: React.ReactNode; zIndex?: number }>()
let nextPortalKey = 1
let warnedNative = false
let autoHostTeardownScheduled = false

const getEntriesSnapshot = (): PortalEntry[] =>
  Array.from(portalEntries.entries()).map(([key, entry]) => ({
    key,
    children: entry.children,
    zIndex: entry.zIndex,
  }))

const notifyCurrentHost = () => {
  const currentHost = hostStack[hostStack.length - 1]
  if (currentHost) {
    currentHost.setEntries(getEntriesSnapshot())
  }
}

const registerHost = (host: PortalLayer) => {
  hostStack.push(host)
  host.setEntries(getEntriesSnapshot())
  scheduleTeardownAutoHost()
}

const unregisterHost = (host: PortalLayer) => {
  const index = hostStack.lastIndexOf(host)
  if (index >= 0) {
    hostStack.splice(index, 1)
  }
  if (hostStack.length === 0) {
    clearPortals()
  } else {
    notifyCurrentHost()
  }
  scheduleTeardownAutoHost()
}

const mountPortal = (children: React.ReactNode, key?: number) => {
  const resolvedKey = key ?? nextPortalKey++
  portalEntries.set(resolvedKey, { children, zIndex: getMaxZIndex(children) })
  notifyCurrentHost()
  return resolvedKey
}

const updatePortal = (key: number, children: React.ReactNode) => {
  portalEntries.set(key, { children, zIndex: getMaxZIndex(children) })
  notifyCurrentHost()
}

const unmountPortal = (key: number) => {
  if (portalEntries.delete(key)) {
    notifyCurrentHost()
    scheduleTeardownAutoHost()
  }
}

const teardownAutoHost = () => {
  if (!autoHostRoot) return
  autoHostRoot?.unmount?.()
  autoHostRoot = null
  if (autoHostContainer?.parentNode) {
    autoHostContainer.parentNode.removeChild(autoHostContainer)
  }
  autoHostContainer = null
  autoHostTeardownScheduled = false
}

const scheduleTeardownAutoHost = () => {
  if (!autoHostRoot) return
  if (autoHostTeardownScheduled) return
  autoHostTeardownScheduled = true
  Promise.resolve().then(() => {
    autoHostTeardownScheduled = false
    if (!autoHostRoot) return
    if (hostStack.length > 1 || (portalEntries.size === 0 && hostStack.length <= 1)) {
      teardownAutoHost()
    }
  })
}

const clearPortals = () => {
  if (portalEntries.size > 0) {
    portalEntries.clear()
    notifyCurrentHost()
  }
  warnedNative = false
  scheduleTeardownAutoHost()
}

const globalManager: PortalManager = {
  mount: (children, key) => mountPortal(children, key),
  update: (key, children) => updatePortal(key, children),
  unmount: key => unmountPortal(key),
}

export interface PortalHostProps {
  children?: React.ReactNode
  fixed?: boolean
}

export class PortalHost extends React.Component<PortalHostProps> {
  private layer: PortalLayer | null = null

  componentWillUnmount(): void {
    if (this.layer) {
      unregisterHost(this.layer)
      this.layer = null
    }
  }

  private readonly setLayerRef = (layer: PortalLayer | null) => {
    if (this.layer === layer) return
    if (this.layer) {
      unregisterHost(this.layer)
    }
    this.layer = layer
    if (layer) {
      registerHost(layer)
    }
  }

  render() {
    const { children, fixed } = this.props

    return (
      <PortalContext.Provider value={globalManager}>
        <View style={styles.host} collapsable={false}>
          <View style={styles.root} collapsable={false} pointerEvents="box-none">
            {children}
          </View>
          <PortalLayer ref={this.setLayerRef} fixed={fixed} />
        </View>
      </PortalContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  host: {
    position: 'relative',
    flex: 1,
  },
  root: {
    flex: 1,
  },
  portalLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  portalEntry: {
    ...StyleSheet.absoluteFillObject,
  },
})

const webFixedStyle: ViewStyle | undefined =
  Platform.OS === 'web'
    ? ({ position: 'fixed' } as unknown as ViewStyle)
    : undefined

let autoHostContainer: HTMLElement | null = null
let autoHostRoot: any = null
let hostPromise: Promise<void> | null = null

export const ensureGlobalPortalHost = () => {
  if (hostStack.length > 0) {
    return Promise.resolve()
  }

  if (typeof document === 'undefined') {
    if (!warnedNative) {
      warnedNative = true
      console.warn('[Portal] 请在根节点挂载 <PortalHost> 或 <ConfigProvider> 以启用静态组件能力。')
    }
    return Promise.resolve()
  }

  if (autoHostRoot) return Promise.resolve()
  if (hostPromise) return hostPromise

  hostPromise = Promise.resolve()
    .then(async () => {
      if (hostStack.length > 0 || autoHostRoot) return

      const doc = document
      const { createRoot } = await import('react-dom/client')

      if (hostStack.length > 0 || autoHostRoot) return

      autoHostContainer = doc.createElement('div')
      autoHostContainer.setAttribute('data-rnsu-portal-host', 'true')
      doc.body.appendChild(autoHostContainer)
      autoHostRoot = createRoot(autoHostContainer)
      autoHostRoot.render(<PortalHost fixed />)
      scheduleTeardownAutoHost()
    })
    .catch(error => {
      teardownAutoHost()
      console.warn('[Portal] 无法自动挂载 PortalHost:', error)
    })
    .finally(() => {
      hostPromise = null
    })

  return hostPromise
}

export const portalManager = globalManager
export const portalStore = {
  clear: clearPortals,
  getSnapshot: () => getEntriesSnapshot(),
  hasHosts: () => hostStack.length > 0,
}
