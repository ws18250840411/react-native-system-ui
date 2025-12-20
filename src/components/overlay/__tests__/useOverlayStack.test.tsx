import React from 'react'
import renderer, { act } from 'react-test-renderer'

import type { OverlayStackMountOptions } from '../OverlayStackStore'
import { overlayStackStore } from '../OverlayStackStore'
import { useOverlayStack, type UseOverlayStackResult } from '../useOverlayStack'

const mockAddEventListener = jest.fn(() => ({ remove: jest.fn() }))

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
}

interface RecorderProps {
  name: string
  visible: boolean
  options?: OverlayStackMountOptions
  onValue: (name: string, value: UseOverlayStackResult) => void
}

const Recorder: React.FC<RecorderProps> = ({ name, visible, options = {}, onValue }) => {
  const value = useOverlayStack({ visible, ...options })
  onValue(name, value)
  return null
}

describe('useOverlayStack', () => {
  beforeEach(() => {
    resetStore()
  })

  it('normalizes small zIndex values relative to base', () => {
    const values = new Map<string, UseOverlayStackResult>()
    const base = overlayStackStore.getBaseZIndex()

    const App = ({ zIndex }: { zIndex: number }) => (
      <Recorder
        name="only"
        visible
        options={{ zIndex }}
        onValue={(name, value) => values.set(name, value)}
      />
    )

    const tree = renderer.create(<App zIndex={10} />)
    expect(values.get('only')?.zIndex).toBe(base + 10)

    act(() => {
      tree.update(<App zIndex={2048} />)
    })
    expect(values.get('only')?.zIndex).toBe(2048)

    act(() => {
      tree.unmount()
    })
  })

  it('mounts/unmounts entries with visibility flag and reports top-most state', () => {
    const values = new Map<string, UseOverlayStackResult>()

    const App = ({ visibleA, visibleB }: { visibleA: boolean; visibleB: boolean }) => (
      <>
        <Recorder
          name="first"
          visible={visibleA}
          options={{ closeOnBack: true, type: 'dialog' }}
          onValue={(name, value) => values.set(name, value)}
        />
        <Recorder
          name="second"
          visible={visibleB}
          options={{ lockScroll: true, type: 'sheet', zIndex: 2048 }}
          onValue={(name, value) => values.set(name, value)}
        />
      </>
    )

    const tree = renderer.create(<App visibleA={false} visibleB={false} />)
    expect(values.get('first')?.entryKey).toBeNull()
    expect(values.get('second')?.entryKey).toBeNull()

    act(() => {
      tree.update(<App visibleA visibleB={false} />)
    })

    const firstAfterOpen = values.get('first')
    expect(firstAfterOpen?.entryKey).not.toBeNull()
    expect(firstAfterOpen?.isTopMost).toBe(true)

    act(() => {
      tree.update(<App visibleA visibleB />)
    })

    const secondAfterOpen = values.get('second')
    expect(secondAfterOpen?.entryKey).not.toBeNull()
    expect(secondAfterOpen?.zIndex).toBe(2048)
    expect(secondAfterOpen?.isTopMost).toBe(true)
    expect(values.get('first')?.isTopMost).toBe(false)

    act(() => {
      tree.update(<App visibleA={false} visibleB />)
    })

    expect(values.get('first')?.entryKey).toBeNull()
    expect(values.get('second')?.isTopMost).toBe(true)

    act(() => {
      tree.update(<App visibleA={false} visibleB={false} />)
    })

    expect(values.get('second')?.entryKey).toBeNull()

    act(() => {
      tree.unmount()
    })
  })

  it('updates overlay options when props change', () => {
    const values = new Map<string, UseOverlayStackResult>()
    const onCloseA = jest.fn()
    const onCloseB = jest.fn()

    const App = ({ handler }: { handler: () => void }) => (
      <Recorder
        name="only"
        visible
        options={{ closeOnBack: true, onClose: handler }}
        onValue={(name, value) => values.set(name, value)}
      />
    )

    const tree = renderer.create(<App handler={onCloseA} />)
    const entryKey = values.get('only')?.entryKey
    expect(entryKey).not.toBeNull()

    act(() => {
      tree.update(<App handler={onCloseB} />)
    })

    const snapshot = overlayStackStore.getSnapshot().find(entry => entry.key === entryKey)
    expect(snapshot?.onClose).toBe(onCloseB)

    act(() => {
      tree.unmount()
    })
  })
})
