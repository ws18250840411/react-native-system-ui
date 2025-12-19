import type { OverlayStackEntry } from '../OverlayStackStore'
import { overlayStackStore } from '../OverlayStackStore'

let hardwareBackHandler: (() => boolean) | null = null
const mockRemoveListener = jest.fn(() => {
  hardwareBackHandler = null
})
const mockAddEventListener = jest.fn((event: string, handler: () => boolean) => {
  hardwareBackHandler = handler
  return { remove: mockRemoveListener }
})

jest.mock('react-native', () => ({
  BackHandler: {
    addEventListener: (...args: any[]) => mockAddEventListener(...args),
  },
  Platform: {
    OS: 'android',
  },
}))

const resetStore = () => {
  const snapshot = [...overlayStackStore.getSnapshot()]
  snapshot.forEach(entry => {
    overlayStackStore.unmount(entry.key)
  })
  ;(overlayStackStore as any).keySeed = 0
  mockAddEventListener.mockClear()
  mockRemoveListener.mockClear()
  hardwareBackHandler = null
}

const getEntries = () => overlayStackStore.getSnapshot()

describe('OverlayStackStore', () => {
  beforeEach(() => {
    resetStore()
    delete (globalThis as any).document
  })

  it('mounts, updates, and unmounts entries with auto-increment zIndex', () => {
    const first = overlayStackStore.mount({ type: 'dialog' })
    const second = overlayStackStore.mount({ type: 'toast' })

    expect(first.zIndex).toBe(overlayStackStore.getBaseZIndex())
    expect(second.zIndex).toBe(first.zIndex + 2)

    const updated = overlayStackStore.update(first.key, {
      zIndex: 2048,
      meta: { role: 'primary' },
    }) as OverlayStackEntry

    expect(updated.zIndex).toBe(2048)
    expect(updated.meta?.role).toBe('primary')

    overlayStackStore.unmount(first.key)
    expect(getEntries()).toHaveLength(1)

    overlayStackStore.unmount(second.key)
    expect(getEntries()).toHaveLength(0)
  })

  it('wires BackHandler to the top-most closable entry', () => {
    const closable = jest.fn()
    const entry = overlayStackStore.mount({
      closeOnBack: true,
      onClose: closable,
    })

    expect(mockAddEventListener).toHaveBeenCalledWith('hardwareBackPress', expect.any(Function))
    expect(typeof hardwareBackHandler).toBe('function')

    hardwareBackHandler?.()
    expect(closable).toHaveBeenCalledTimes(1)

    overlayStackStore.unmount(entry.key)
    expect(mockRemoveListener).toHaveBeenCalledTimes(1)
  })

  it('locks and restores document scrolling when requested', () => {
    const bodyStyle = { overflow: 'auto' }
    ;(globalThis as any).document = {
      body: {
        style: bodyStyle,
      },
    }

    const first = overlayStackStore.mount({ lockScroll: true })
    expect(document.body.style.overflow).toBe('hidden')

    const second = overlayStackStore.mount({ lockScroll: true })
    overlayStackStore.unmount(first.key)
    expect(document.body.style.overflow).toBe('hidden')

    overlayStackStore.unmount(second.key)
    expect(document.body.style.overflow).toBe('auto')
  })
})
