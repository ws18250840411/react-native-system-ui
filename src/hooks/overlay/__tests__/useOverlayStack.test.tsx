import React from 'react'
import renderer, { act } from 'react-test-renderer'
import type { OverlayStackMountOptions } from '../useOverlayStack'
import { overlayStackStore } from '../useOverlayStack'
import { useOverlayStack, type UseOverlayStackResult } from '../useOverlayStack'
const mockAddEventListener = jest.fn((_e: any, _h: any) => ({ remove: jest.fn() }))
jest.mock('react-native', () => ({
  BackHandler: { addEventListener: (e: string, h: any) => mockAddEventListener(e, h) },
  Platform: { OS: 'android' },
}))
const resetStore = () => { ;[...overlayStackStore.getSnapshot()].forEach(e => overlayStackStore.unmount(e.key)); (overlayStackStore as any).keySeed = 0 }
type RecP = { name: string; visible: boolean; options?: OverlayStackMountOptions; onValue: (n: string, v: UseOverlayStackResult) => void }
const Rec: React.FC<RecP> = ({ name, visible, options = {}, onValue }) => { onValue(name, useOverlayStack({ visible, ...options })); return null }
describe('useOverlayStack', () => {
  beforeEach(resetStore)
  it('normalizes small zIndex values relative to base', () => {
    const values = new Map<string, UseOverlayStackResult>(); const base = overlayStackStore.getBaseZIndex()
    const App = ({ zIndex }: { zIndex: number }) => <Rec name="only" visible options={{ zIndex }} onValue={(n, v) => values.set(n, v)} />
    const tree = renderer.create(<App zIndex={10} />); expect(values.get('only')?.zIndex).toBe(base + 10)
    act(() => { tree.update(<App zIndex={2048} />) }); expect(values.get('only')?.zIndex).toBe(2048); act(() => { tree.unmount() })
  })
  it('mounts/unmounts entries with visibility flag and reports top-most state', () => {
    const values = new Map<string, UseOverlayStackResult>()
    const App = ({ visibleA, visibleB }: { visibleA: boolean; visibleB: boolean }) => (
      <>
        <Rec name="first" visible={visibleA} options={{ closeOnBack: true, type: 'dialog' }} onValue={(n, v) => values.set(n, v)} />
        <Rec name="second" visible={visibleB} options={{ lockScroll: true, type: 'sheet', zIndex: 2048 }} onValue={(n, v) => values.set(n, v)} />
      </>
    )
    const tree = renderer.create(<App visibleA={false} visibleB={false} />)
    expect(values.get('first')?.entryKey).toBeNull(); expect(values.get('second')?.entryKey).toBeNull()
    act(() => { tree.update(<App visibleA visibleB={false} />) })
    expect(values.get('first')?.entryKey).not.toBeNull(); expect(values.get('first')?.isTopMost).toBe(true)
    act(() => { tree.update(<App visibleA visibleB />) })
    expect(values.get('second')?.entryKey).not.toBeNull(); expect(values.get('second')?.zIndex).toBe(2048); expect(values.get('second')?.isTopMost).toBe(true); expect(values.get('first')?.isTopMost).toBe(false)
    act(() => { tree.update(<App visibleA={false} visibleB />) }); expect(values.get('first')?.entryKey).toBeNull(); expect(values.get('second')?.isTopMost).toBe(true)
    act(() => { tree.update(<App visibleA={false} visibleB={false} />) }); expect(values.get('second')?.entryKey).toBeNull(); act(() => { tree.unmount() })
  })
  it('updates overlay options when props change', () => {
    const values = new Map<string, UseOverlayStackResult>(); const onCloseA = jest.fn(); const onCloseB = jest.fn()
    const App = ({ handler }: { handler: () => void }) => <Rec name="only" visible options={{ closeOnBack: true, onClose: handler }} onValue={(n, v) => values.set(n, v)} />
    const tree = renderer.create(<App handler={onCloseA} />); const entryKey = values.get('only')?.entryKey; expect(entryKey).not.toBeNull()
    act(() => { tree.update(<App handler={onCloseB} />) }); expect(overlayStackStore.getSnapshot().find(e => e.key === entryKey)?.onClose).toBe(onCloseB)
    act(() => { tree.unmount() })
  })
})
