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
    this.setState(prev => (prev.entries === entries ? null : { entries }))
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
    for (const child of node) {
      const value = getMaxZIndex(child)
      if (!isNumber(value)) continue
      max = isNumber(max) ? Math.max(max, value) : value
    }
    return max
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ style?: unknown; children?: React.ReactNode }>
    const style = element.props.style
    let max: number | undefined
    if (style && !isFunction(style)) {
      const zIndex =
        typeof style === 'object' && !Array.isArray(style) && style !== null
          ? (style as { zIndex?: unknown }).zIndex
          : (StyleSheet.flatten(style) as { zIndex?: unknown } | null)?.zIndex
      if (isNumber(zIndex)) {
        max = zIndex
      }
    }

    const childMax = getMaxZIndex(element.props.children)
    if (!isNumber(childMax)) return max
    if (!isNumber(max)) return childMax
    return Math.max(max, childMax)
  }

  return undefined
}

const hostStack: PortalLayer[] = []
const portalEntries = new Map<number, PortalEntry>()
let nextPortalKey = 1
let warnedNative = false
let autoHostTeardownScheduled = false
let snapshotDirty = true
let snapshotCache: PortalEntry[] = []

const markSnapshotDirty = () => {
  snapshotDirty = true
}

const getEntriesSnapshot = (): PortalEntry[] => {
  if (!snapshotDirty) return snapshotCache
  snapshotDirty = false
  snapshotCache = Array.from(portalEntries.values())
  return snapshotCache
}

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
  portalEntries.set(resolvedKey, { key: resolvedKey, children, zIndex: getMaxZIndex(children) })
  markSnapshotDirty()
  notifyCurrentHost()
  return resolvedKey
}

const updatePortal = (key: number, children: React.ReactNode) => {
  const prev = portalEntries.get(key)
  if (prev && prev.children === children) return
  portalEntries.set(key, { key, children, zIndex: getMaxZIndex(children) })
  markSnapshotDirty()
  notifyCurrentHost()
}

const unmountPortal = (key: number) => {
  if (portalEntries.delete(key)) {
    markSnapshotDirty()
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
    markSnapshotDirty()
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
let autoHostRoot: { render: (node: React.ReactNode) => void; unmount: () => void } | null = null
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
      autoHostRoot = createRoot(autoHostContainer) as unknown as { render: (node: React.ReactNode) => void; unmount: () => void }
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
