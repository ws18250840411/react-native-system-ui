const os = require('os')
const crypto = require('crypto')

if (typeof os.availableParallelism !== 'function') {
  os.availableParallelism = () => {
    const cpus = os.cpus?.() ?? []
    return Math.max(1, cpus.length || 1)
  }
}

if (
  typeof globalThis.crypto === 'undefined' ||
  typeof globalThis.crypto.getRandomValues !== 'function'
) {
  globalThis.crypto = {
    getRandomValues(buffer) {
      return crypto.randomFillSync(buffer)
    },
  }
}

if (typeof crypto.getRandomValues !== 'function') {
  crypto.getRandomValues = buffer => crypto.randomFillSync(buffer)
}

if (typeof crypto.hash !== 'function') {
  crypto.hash = (algorithm, data, encoding = 'hex') => {
    return crypto.createHash(algorithm).update(data).digest(encoding)
  }
}

const originalSetTimeout = globalThis.setTimeout
const isJest =
  Array.isArray(process.argv) &&
  process.argv.some(
    arg =>
      typeof arg === 'string' &&
      (arg.includes('/jest/bin/jest.js') || arg.includes('\\jest\\bin\\jest.js'))
  )
if (typeof originalSetTimeout === 'function' && !isJest) {
  globalThis.setTimeout = (callback, delay, ...args) => {
    const timer = originalSetTimeout(callback, delay, ...args)
    if (timer && typeof timer.unref === 'function') {
      timer.unref()
    }
    return timer
  }
}

const originalSetInterval = globalThis.setInterval
if (typeof originalSetInterval === 'function' && !isJest) {
  globalThis.setInterval = (callback, delay, ...args) => {
    const timer = originalSetInterval(callback, delay, ...args)
    if (timer && typeof timer.unref === 'function') {
      timer.unref()
    }
    return timer
  }
}
