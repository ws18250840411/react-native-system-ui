const renderer = require('react-test-renderer')

process.env.JEST_ENV = 'true'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = cb => setTimeout(() => cb(Date.now()), 16)
}
if (typeof globalThis.cancelAnimationFrame !== 'function') {
  globalThis.cancelAnimationFrame = id => clearTimeout(id)
}

const originalConsoleError = console.error
console.error = (...args) => {
  const asString = args
    .map(arg => (typeof arg === 'string' ? arg : ''))
    .join(' ')

  if (asString.includes('react-test-renderer is deprecated')) {
    return
  }

  if (asString.includes('VirtualizedList') && asString.includes('act')) {
    return
  }

  originalConsoleError(...args)
}

const originalConsoleWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('pointerEvents is deprecated')) {
    return
  }
  if (typeof args[0] === 'string' && args[0].includes('"shadow*" style props are deprecated')) {
    return
  }
  if (typeof args[0] === 'string' && args[0].includes('[Portal] 请在根节点挂载 <PortalHost> 或 <ConfigProvider> 以启用静态组件能力。')) {
    return
  }
  originalConsoleWarn(...args)
}

const originalCreate = renderer.create
const { act } = renderer

renderer.create = (...args) => {
  let result
  act(() => {
    result = originalCreate(...args)
  })
  return result
}
