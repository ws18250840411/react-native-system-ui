import { randomFillSync, webcrypto } from 'node:crypto'
import { defineConfig } from 'vitest/config'

function ensureCrypto() {
  const cryptoFromNode = webcrypto ?? (globalThis.crypto as Crypto | undefined)

  const cryptoObject: Crypto = cryptoFromNode ?? ({} as Crypto)

  if (!cryptoObject.getRandomValues) {
    cryptoObject.getRandomValues = ((array: ArrayBufferView | null) => {
      if (!array) return array
      randomFillSync(array as NodeJS.ArrayBufferView)
      return array
    }) as Crypto['getRandomValues']
  }

  if (!globalThis.crypto) {
    Object.defineProperty(globalThis, 'crypto', {
      value: cryptoObject,
      configurable: true,
    })
  }
}

ensureCrypto()

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['tests/setupCrypto.ts'],
  },
})
