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
