import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  StyleSheet,
  View,
} from 'react-native'

import { isNumber } from '../../utils'
import { PortalContext, type PortalManager } from './PortalContext'

interface PortalEntry {
  key: number
  children: React.ReactNode
}

interface PortalManagerHandle extends PortalManager {
  mount: (children: React.ReactNode, key?: number) => number
  clear: () => void
}

type Operation =
  | { type: 'mount'; key: number; children: React.ReactNode }
  | { type: 'update'; key: number; children: React.ReactNode }
  | { type: 'unmount'; key: number }
  | { type: 'clear' }

const ADD_EVENT = 'RNSU_PORTAL_ADD'
const UPDATE_EVENT = 'RNSU_PORTAL_UPDATE'
const REMOVE_EVENT = 'RNSU_PORTAL_REMOVE'
const CLEAR_EVENT = 'RNSU_PORTAL_CLEAR'
const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter()
const IS_WEB = Platform.OS === 'web'

const applyOperation = (manager: PortalManagerHandle, operation: Operation) => {
  if (operation.type === 'mount') {
    manager.mount(operation.children, operation.key)
  } else if (operation.type === 'update') {
    manager.update(operation.key, operation.children)
  } else if (operation.type === 'clear') {
    manager.clear()
  } else {
    manager.unmount(operation.key)
  }
}

const PortalManagerView = React.forwardRef<PortalManagerHandle, {}>(
  (_, ref) => {
    const [entries, setEntries] = useState<PortalEntry[]>([])
    const keySeed = useRef(0)

    const upsert = useCallback((entry: PortalEntry) => {
      setEntries(prev => {
        const i = prev.findIndex(item => item.key === entry.key)
        return i === -1 ? [...prev, entry] : [...prev.slice(0, i), entry, ...prev.slice(i + 1)]
      })
    }, [])

    const mount = useCallback((children: React.ReactNode, key?: number) => {
      const resolvedKey = key ?? ++keySeed.current
      if (isNumber(key) && key >= keySeed.current) keySeed.current = key + 1
      upsert({ key: resolvedKey, children })
      return resolvedKey
    }, [upsert])

    const update = useCallback((key: number, children: React.ReactNode) => {
      upsert({ key, children })
    }, [upsert])

    const unmount = useCallback((key: number) => {
      setEntries(prev => prev.filter(item => item.key !== key))
    }, [])

    const clear = useCallback(() => {
      setEntries([])
    }, [])

    React.useImperativeHandle(ref, () => ({ mount, update, unmount, clear }), [mount, update, unmount, clear])

    if (entries.length === 0) return null
    return <View pointerEvents="box-none" style={styles.portalLayer} collapsable={false}>
      {entries.map(entry => <View key={entry.key} pointerEvents="box-none" collapsable={false} style={styles.portalEntry}>{entry.children}</View>)}
    </View>
  }
)

let activeHostId = 0
let nextHostId = 1
let nextGlobalKey = 10000

const globalManager: PortalManager = {
  mount: (children: React.ReactNode, key?: number) => {
    if (typeof __DEV__ !== 'undefined' && __DEV__ && activeHostId === 0) {
      console.warn('[Portal] 请在根节点挂载 <PortalHost> 或 <ConfigProvider> 以启用静态组件能力。')
    }
    const resolvedKey = key ?? nextGlobalKey++
    if (isNumber(key) && key >= nextGlobalKey) {
      nextGlobalKey = key + 1
    }
    TopViewEventEmitter.emit(ADD_EVENT, { key: resolvedKey, children })
    return resolvedKey
  },
  update: (key: number, children: React.ReactNode) => {
    TopViewEventEmitter.emit(UPDATE_EVENT, { key, children })
  },
  unmount: (key: number) => {
    TopViewEventEmitter.emit(REMOVE_EVENT, { key })
  },
}

export interface PortalHostProps {
  children?: React.ReactNode
}

const PortalHostImpl: React.FC<PortalHostProps> = ({ children }) => {
  const hostIdRef = useRef(nextHostId++)
  const managerRef = useRef<PortalManagerHandle | null>(null)
  const queueRef = useRef<Operation[]>([])
  const nextKeyRef = useRef(1)

  const enqueueOrRun = useCallback((operation: Operation) => {
    const manager = managerRef.current
    if (manager) {
      applyOperation(manager, operation)
    } else {
      queueRef.current.push(operation)
    }
  }, [])

  const scopedManager = useMemo<PortalManager>(() => ({
    mount: (children: React.ReactNode, key?: number) => {
      const resolvedKey = key ?? nextKeyRef.current++
      if (isNumber(key) && key >= nextKeyRef.current) {
        nextKeyRef.current = key + 1
      }
      enqueueOrRun({ type: 'mount', key: resolvedKey, children })
      return resolvedKey
    },
    update: (key: number, children: React.ReactNode) => {
      enqueueOrRun({ type: 'update', key, children })
    },
    unmount: (key: number) => {
      enqueueOrRun({ type: 'unmount', key })
    },
  }), [enqueueOrRun])

  const handleManagerRef = useCallback((manager: PortalManagerHandle | null) => {
    managerRef.current = manager
    if (manager) {
      if (queueRef.current.length > 0) {
        const pending = queueRef.current.splice(0, queueRef.current.length)
        pending.forEach(operation => applyOperation(manager, operation))
      }
      if (activeHostId === 0 || activeHostId === hostIdRef.current) {
        activeHostId = hostIdRef.current
      } else if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn(
          '[PortalHost] 检测到多个 Portal.Host，静态 API 仅会使用第一个挂载的 Host。建议全局只挂载一个。',
        )
      }
    }
  }, [])

  useEffect(() => () => {
    if (activeHostId === hostIdRef.current) {
      activeHostId = 0
      queueRef.current = []
      portalStore.clear()
    }
  }, [])

  useEffect(() => {
    const handleAdd = ({ key, children }: { key: number; children: React.ReactNode }) => {
      if (activeHostId !== hostIdRef.current) return
      enqueueOrRun({ type: 'mount', key, children })
    }
    const handleUpdate = ({ key, children }: { key: number; children: React.ReactNode }) => {
      if (activeHostId !== hostIdRef.current) return
      enqueueOrRun({ type: 'update', key, children })
    }
    const handleRemove = ({ key }: { key: number }) => {
      if (activeHostId !== hostIdRef.current) return
      enqueueOrRun({ type: 'unmount', key })
    }
    const handleClear = () => {
      if (activeHostId !== hostIdRef.current) return
      queueRef.current = []
      enqueueOrRun({ type: 'clear' })
    }

    const addSub = TopViewEventEmitter.addListener(ADD_EVENT, handleAdd)
    const updateSub = TopViewEventEmitter.addListener(UPDATE_EVENT, handleUpdate)
    const removeSub = TopViewEventEmitter.addListener(REMOVE_EVENT, handleRemove)
    const clearSub = TopViewEventEmitter.addListener(CLEAR_EVENT, handleClear)

    return () => {
      addSub.remove()
      updateSub.remove()
      removeSub.remove()
      clearSub.remove()
    }
  }, [enqueueOrRun])

  return <PortalContext.Provider value={scopedManager}>
    <View style={styles.host} collapsable={false}>
      <View style={styles.root} collapsable={false} pointerEvents="box-none">{children}</View>
      <PortalManagerView ref={handleManagerRef} />
    </View>
  </PortalContext.Provider>
}

export const PortalHost = React.memo(PortalHostImpl)
PortalHost.displayName = 'PortalHost'

const styles = StyleSheet.create({
  host: { position: 'relative', flex: 1 },
  root: { flex: 1 },
  portalLayer: IS_WEB ? { position: 'fixed' as 'absolute', top: 0, left: 0, right: 0, bottom: 0 } : { ...StyleSheet.absoluteFillObject },
  portalEntry: { ...StyleSheet.absoluteFillObject },
})

export const portalManager = globalManager
export const portalStore = {
  clear: () => {
    TopViewEventEmitter.emit(CLEAR_EVENT)
  },
  hasHosts: () => activeHostId !== 0,
}
