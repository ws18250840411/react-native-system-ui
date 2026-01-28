import React from 'react'
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

import { isNumber } from '../../utils'
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

  if (!React.isValidElement(node)) return undefined

  const element = node as React.ReactElement<{ style?: unknown; children?: React.ReactNode }>
  const style = element.props.style
  let max: number | undefined
  if (style && typeof style !== 'function') {
    const flattened =
      typeof style === 'object' && !Array.isArray(style) && style !== null
        ? (style as { zIndex?: unknown })
        : (StyleSheet.flatten(style) as { zIndex?: unknown } | null)
    const zIndex = flattened?.zIndex
    if (isNumber(zIndex)) {
      max = zIndex
    }
  }

  const childMax = getMaxZIndex(element.props.children)
  if (!isNumber(childMax)) return max
  if (!isNumber(max)) return childMax
  return Math.max(max, childMax)
}

const hostStack: PortalLayer[] = []
const portalEntries = new Map<number, PortalEntry>()
const emptyEntries: PortalEntry[] = []
let nextPortalKey = 1
let warnedNative = false
const isJestEnv =
  typeof globalThis !== 'undefined' &&
  (globalThis as any)?.process?.env?.JEST_ENV === 'true'
let snapshotDirty = true
let snapshotCache = emptyEntries
const markSnapshotDirty = () => {
  snapshotDirty = true
}
const getEntriesSnapshot = () => {
  if (!snapshotDirty) return snapshotCache
  snapshotDirty = false
  snapshotCache =
    portalEntries.size === 0 ? emptyEntries : Array.from(portalEntries.values())
  return snapshotCache
}
const syncCurrentHost = () => {
  const currentHost = hostStack[hostStack.length - 1]
  if (currentHost) {
    currentHost.setEntries(getEntriesSnapshot())
  }
}

const setHostPresence = (host: PortalLayer, present: boolean) => {
  if (present) {
    hostStack.push(host)
    syncCurrentHost()
    maybeTeardownAutoHost()
    return
  }
  const index = hostStack.lastIndexOf(host)
  if (index >= 0) {
    hostStack.splice(index, 1)
  }
  if (hostStack.length === 0) {
    clearPortals()
    return
  }
  syncCurrentHost()
  maybeTeardownAutoHost()
}

const mountPortal = (children: React.ReactNode, key?: number) => {
  const resolvedKey = key ?? nextPortalKey++
  portalEntries.set(resolvedKey, { key: resolvedKey, children, zIndex: getMaxZIndex(children) })
  markSnapshotDirty()
  syncCurrentHost()
  return resolvedKey
}

const updatePortal = (key: number, children: React.ReactNode) => {
  const prev = portalEntries.get(key)
  if (prev) {
    prev.children = children
    prev.zIndex = getMaxZIndex(children)
  } else {
    portalEntries.set(key, { key, children, zIndex: getMaxZIndex(children) })
  }
  markSnapshotDirty()
  syncCurrentHost()
}

const unmountPortal = (key: number) => {
  if (portalEntries.delete(key)) {
    markSnapshotDirty()
    syncCurrentHost()
    maybeTeardownAutoHost()
  }
}

const scheduleTeardown = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : (task: () => void) => {
    Promise.resolve().then(task)
  }

const teardownAutoHost = () => {
  if (!autoHostRoot || teardownScheduled) return
  teardownScheduled = true
  scheduleTeardown(() => {
    teardownScheduled = false
    if (!autoHostRoot) return
    if (hostStack.length > 1 || portalEntries.size === 0) {
      const root = autoHostRoot
      const container = autoHostContainer
      autoHostRoot = null
      autoHostContainer = null
      root.unmount()
      if (container?.parentNode) {
        container.parentNode.removeChild(container)
      }
    }
  })
}

const maybeTeardownAutoHost = () => {
  if (!autoHostRoot) return
  if (hostStack.length > 1 || portalEntries.size === 0) {
    teardownAutoHost()
  }
}

const clearPortals = () => {
  if (portalEntries.size > 0) {
    portalEntries.clear()
    markSnapshotDirty()
    syncCurrentHost()
  }
  warnedNative = false
  maybeTeardownAutoHost()
}

const globalManager: PortalManager = {
  mount: mountPortal,
  update: updatePortal,
  unmount: unmountPortal,
}

export interface PortalHostProps {
  children?: React.ReactNode
  fixed?: boolean
}

export class PortalHost extends React.Component<PortalHostProps> {
  private layer: PortalLayer | null = null

  componentWillUnmount(): void {
    if (this.layer) {
      setHostPresence(this.layer, false)
      this.layer = null
    }
  }

  private readonly setLayerRef = (layer: PortalLayer | null) => {
    if (this.layer === layer) return
    if (this.layer) {
      setHostPresence(this.layer, false)
    }
    this.layer = layer
    if (layer) {
      setHostPresence(layer, true)
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
type AutoHostRoot = import('react-dom/client').Root
let autoHostRoot: AutoHostRoot | null = null
let hostPromise: Promise<void> | null = null
let teardownScheduled = false

export const ensureGlobalPortalHost = () => {
  if (hostStack.length > 0) {
    return Promise.resolve()
  }

  if (typeof document === 'undefined') {
    if (!warnedNative) {
      warnedNative = true
      if ((typeof __DEV__ !== 'undefined' && __DEV__) || isJestEnv) {
        console.warn('[Portal] 请在根节点挂载 <PortalHost> 或 <ConfigProvider> 以启用静态组件能力。')
      }
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
      maybeTeardownAutoHost()
    })
    .catch(error => {
      teardownAutoHost()
      if ((typeof __DEV__ !== 'undefined' && __DEV__) || isJestEnv) {
        console.warn('[Portal] 无法自动挂载 PortalHost:', error)
      }
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
