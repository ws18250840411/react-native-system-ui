export const addPopStateListener = (listener: () => void) => {
  if (typeof window === 'undefined' || !window.addEventListener) return () => {}
  window.addEventListener('popstate', listener)
  return () => { window.removeEventListener('popstate', listener) }
}
