import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeviceEventEmitter, NativeEventEmitter, Platform, StyleSheet, View } from 'react-native'
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

type Operation = { type: 'mount'; key: number; children: React.ReactNode } | { type: 'update'; key: number; children: React.ReactNode } | { type: 'unmount'; key: number } | { type: 'clear' }

const AE = 'RNSU_PORTAL_ADD'
const UE = 'RNSU_PORTAL_UPDATE'
const RE = 'RNSU_PORTAL_REMOVE'
const CE = 'RNSU_PORTAL_CLEAR'
const TVE = DeviceEventEmitter || new NativeEventEmitter()
const IW = Platform.OS === 'web'

const ao = (m: PortalManagerHandle, o: Operation) => { if (o.type === 'mount') m.mount(o.children, o.key); else if (o.type === 'update') m.update(o.key, o.children); else if (o.type === 'clear') m.clear(); else m.unmount(o.key) }

const PortalManagerView = React.forwardRef<PortalManagerHandle, {}>((_, ref) => {
  const [e, setE] = useState<PortalEntry[]>([])
  const ks = useRef(0)
  const us = useCallback((en: PortalEntry) => { setE(p => { const i = p.findIndex(it => it.key === en.key); return i === -1 ? [...p, en] : [...p.slice(0, i), en, ...p.slice(i + 1)] }) }, [])
  const mt = useCallback((c: React.ReactNode, k?: number) => { const rk = k ?? ++ks.current; if (isNumber(k) && k >= ks.current) ks.current = k + 1; us({ key: rk, children: c }); return rk }, [us])
  const up = useCallback((k: number, c: React.ReactNode) => { us({ key: k, children: c }) }, [us])
  const um = useCallback((k: number) => { setE(p => p.filter(it => it.key !== k)) }, [])
  const cl = useCallback(() => { setE([]) }, [])
  React.useImperativeHandle(ref, () => ({ mount: mt, update: up, unmount: um, clear: cl }), [mt, up, um, cl])
  if (e.length === 0) return null
  return <View pointerEvents="box-none" style={S.pl} collapsable={false}>{e.map(en => <View key={en.key} pointerEvents="box-none" collapsable={false} style={S.pe}>{en.children}</View>)}</View>
})

let ah = 0
let nh = 1
let ngk = 10000

const gm: PortalManager = {
  mount: (c: React.ReactNode, k?: number) => { if (typeof __DEV__ !== 'undefined' && __DEV__ && ah === 0) console.warn('[Portal] Please mount <PortalHost> or <ConfigProvider> at the root to enable imperative APIs.'); const rk = k ?? ngk++; if (isNumber(k) && k >= ngk) ngk = k + 1; TVE.emit(AE, { key: rk, children: c }); return rk },
  update: (k: number, c: React.ReactNode) => { TVE.emit(UE, { key: k, children: c }) },
  unmount: (k: number) => { TVE.emit(RE, { key: k }) },
}

export interface PortalHostProps {
  children?: React.ReactNode
}

const PortalHostImpl: React.FC<PortalHostProps> = ({ children }) => {
  const hir = useRef(nh++), mr = useRef<PortalManagerHandle | null>(null), qr = useRef<Operation[]>([]), nkr = useRef(1)
  const eor = useCallback((o: Operation) => { const m = mr.current; if (m) ao(m, o); else qr.current.push(o) }, [])
  const sm = useMemo<PortalManager>(() => ({ mount: (c: React.ReactNode, k?: number) => { const rk = k ?? nkr.current++; if (isNumber(k) && k >= nkr.current) nkr.current = k + 1; eor({ type: 'mount', key: rk, children: c }); return rk }, update: (k: number, c: React.ReactNode) => { eor({ type: 'update', key: k, children: c }) }, unmount: (k: number) => { eor({ type: 'unmount', key: k }) } }), [eor])
  const hmr = useCallback((m: PortalManagerHandle | null) => { mr.current = m; if (m) { if (qr.current.length > 0) { const pd = qr.current.splice(0, qr.current.length); pd.forEach(o => ao(m, o)) }; if (ah === 0 || ah === hir.current) ah = hir.current; else if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('[PortalHost] Multiple PortalHost instances detected. Imperative APIs will only use the first mounted host.') } }, [])
  useEffect(() => () => { if (ah === hir.current) { ah = 0; qr.current = []; portalStore.clear() } }, [])
  useEffect(() => { const ha = ({ key: k, children: c }: { key: number; children: React.ReactNode }) => { if (ah !== hir.current) return; eor({ type: 'mount', key: k, children: c }) }; const hu = ({ key: k, children: c }: { key: number; children: React.ReactNode }) => { if (ah !== hir.current) return; eor({ type: 'update', key: k, children: c }) }; const hr = ({ key: k }: { key: number }) => { if (ah !== hir.current) return; eor({ type: 'unmount', key: k }) }; const hc = () => { if (ah !== hir.current) return; qr.current = []; eor({ type: 'clear' }) }; const as = TVE.addListener(AE, ha); const us = TVE.addListener(UE, hu); const rs = TVE.addListener(RE, hr); const cs = TVE.addListener(CE, hc); return () => { as.remove(); us.remove(); rs.remove(); cs.remove() } }, [eor])
  return <PortalContext.Provider value={sm}><View style={S.h} collapsable={false}><View style={S.r} collapsable={false} pointerEvents="box-none">{children}</View><PortalManagerView ref={hmr} /></View></PortalContext.Provider>
}

export const PortalHost = React.memo(PortalHostImpl)
PortalHost.displayName = 'PortalHost'

const S = StyleSheet.create({
  h: { position: 'relative', flex: 1 },
  r: { flex: 1 },
  pl: IW ? { position: 'fixed' as 'absolute', top: 0, left: 0, right: 0, bottom: 0 } : { ...StyleSheet.absoluteFillObject },
  pe: { ...StyleSheet.absoluteFillObject },
})

export const portalManager = gm
export const portalStore = {
  clear: () => { TVE.emit(CE) },
  hasHosts: () => ah !== 0,
}
