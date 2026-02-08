import { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, Platform } from 'react-native'

let _reduced = false
let _inited = false
const _subs = new Set<(v: boolean) => void>()

const set = (v: boolean) => { if (v === _reduced) return; _reduced = v; _subs.forEach(fn => fn(v)) }

const init = () => {
  if (_inited) return
  _inited = true
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      try {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
        _reduced = mql.matches
        const h = (e: MediaQueryListEvent) => set(e.matches)
        mql.addEventListener?.('change', h) ?? mql.addListener?.(h)
      } catch {}
    }
    return
  }
  AccessibilityInfo.isReduceMotionEnabled?.().then(v => set(!!v)).catch(() => {})
  try { AccessibilityInfo.addEventListener('reduceMotionChanged' as any, (v: boolean) => set(v)) } catch {}
}

export const useReducedMotion = (): boolean => {
  const r = useRef(false)
  if (!r.current) { r.current = true; init() }
  const [v, sv] = useState(_reduced)
  useEffect(() => {
    if (_reduced !== v) sv(_reduced)
    _subs.add(sv)
    return () => { _subs.delete(sv) }
  }, [])
  return v
}

export const getReducedMotion = (): boolean => { init(); return _reduced }
export const _resetForTesting = () => { _reduced = false; _inited = false; _subs.clear() }
