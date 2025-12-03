import React from 'react'
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

import { PortalContext, type PortalManager } from './PortalContext'

interface PortalEntry {
  key: number
  children: React.ReactNode
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
            style={styles.portalEntry}
          >
            {entry.children}
          </View>
        ))}
      </View>
    )
  }
}

const hostStack: PortalLayer[] = []
const portalEntries = new Map<number, React.ReactNode>()
let nextPortalKey = 1
let warnedNative = false

const getEntriesSnapshot = (): PortalEntry[] =>
  Array.from(portalEntries.entries()).map(([key, children]) => ({
    key,
    children,
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
}

const unregisterHost = (host: PortalLayer) => {
  const index = hostStack.lastIndexOf(host)
  if (index >= 0) {
    hostStack.splice(index, 1)
  }
  notifyCurrentHost()
}

const mountPortal = (children: React.ReactNode, key?: number) => {
  const resolvedKey = key ?? nextPortalKey++
  portalEntries.set(resolvedKey, children)
  notifyCurrentHost()
  return resolvedKey
}

const updatePortal = (key: number, children: React.ReactNode) => {
  portalEntries.set(key, children)
  notifyCurrentHost()
}

const unmountPortal = (key: number) => {
  if (portalEntries.delete(key)) {
    notifyCurrentHost()
  }
}

const clearPortals = () => {
  if (portalEntries.size === 0) return
  portalEntries.clear()
  notifyCurrentHost()
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
        <View style={styles.root} collapsable={false} pointerEvents="box-none">
          {children}
        </View>
        <PortalLayer ref={this.setLayerRef} fixed={fixed} />
      </PortalContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
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

  const doc = document
  hostPromise = import('react-dom/client')
    .then(({ createRoot }) => {
      if (autoHostRoot) return
      autoHostContainer = doc.createElement('div')
      autoHostContainer.setAttribute('data-rnsu-portal-host', 'true')
      doc.body.appendChild(autoHostContainer)
      autoHostRoot = createRoot(autoHostContainer)
      autoHostRoot.render(<PortalHost fixed />)
    })
    .catch(error => {
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
}
