import { randomFillSync, webcrypto } from 'node:crypto'

type ArrayBufferViewLike = ArrayBufferView | NodeJS.ArrayBufferView

const cryptoObject = (webcrypto ?? {}) as Crypto & {
  getRandomValues?: <T extends ArrayBufferViewLike | null>(array: T) => T
}

if (!cryptoObject.getRandomValues) {
  cryptoObject.getRandomValues = ((array: ArrayBufferViewLike | null) => {
    if (!array) return array
    randomFillSync(array as NodeJS.ArrayBufferView)
    return array
  }) as Crypto['getRandomValues']
}

Object.defineProperty(globalThis, 'crypto', {
  value: cryptoObject,
  configurable: true,
})
