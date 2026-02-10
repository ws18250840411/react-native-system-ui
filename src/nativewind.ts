import type { ComponentType } from 'react'
import * as _selfLib from 'react-native-system-ui'

type CssInteropFn = (comp: ComponentType<any>, mapping: Record<string, string>) => any

const FWD_REF = Symbol.for('react.forward_ref')
const MEMO = Symbol.for('react.memo')

const isComponent = (x: unknown): x is ComponentType<any> => {
  if (typeof x === 'function') return true
  if (typeof x === 'object' && x !== null) {
    const t = (x as { $$typeof?: symbol }).$$typeof
    return t === FWD_REF || t === MEMO
  }
  return false
}

let _registered = false

export function enableNativeWind(cssInterop: CssInteropFn, lib?: Record<string, unknown>) {
  if (_registered) return
  _registered = true

  const modules = lib ?? (_selfLib as unknown as Record<string, unknown>)
  if (!modules || typeof modules !== 'object') return

  for (const [name, value] of Object.entries(modules)) {
    if (/^[A-Z]/.test(name) && isComponent(value)) {
      try {
        cssInterop(value, { className: 'style' })
      } catch (_) {}
    }
  }
}
