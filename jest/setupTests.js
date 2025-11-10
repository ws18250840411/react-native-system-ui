const renderer = require('react-test-renderer')

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const originalConsoleError = console.error
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated')) {
    return
  }
  originalConsoleError(...args)
}

const originalConsoleWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('pointerEvents is deprecated')) {
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
