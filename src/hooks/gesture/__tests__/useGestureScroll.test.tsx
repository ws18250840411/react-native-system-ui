import React, { useImperativeHandle } from 'react'
import renderer, { act } from 'react-test-renderer'
import type { UseGestureScrollOptions, UseGestureScrollResult } from '../useGestureScroll'
import { useGestureScroll } from '../useGestureScroll'
const TC = React.forwardRef<UseGestureScrollResult | null, { options?: UseGestureScrollOptions }>(({ options }, r) => {
  const v = useGestureScroll(options); useImperativeHandle(r, () => v, [v]); return null
})
const ev = (y: number, ts: number) => ({ nativeEvent: { contentOffset: { y } }, timeStamp: ts } as any)
describe('useGestureScroll', () => {
  it('tracks scroll offset, direction and velocity', () => {
    const r = React.createRef<UseGestureScrollResult>(); renderer.create(<TC ref={r} />)
    act(() => { r.current?.scrollProps.onScroll?.(ev(40, 10)); r.current?.scrollProps.onScroll?.(ev(120, 30)) })
    expect(r.current?.getCurrentOffset()).toBe(120); expect(r.current?.direction).toBe('forward'); expect(r.current?.getVelocity()).toBeGreaterThan(0)
    act(() => { r.current?.scrollProps.onScroll?.(ev(60, 60)) }); expect(r.current?.direction).toBe('backward')
  })
  it('toggles dragging and momentum flags', () => {
    const r = React.createRef<UseGestureScrollResult>(); renderer.create(<TC ref={r} />)
    act(() => { r.current?.scrollProps.onScrollBeginDrag?.({} as any) }); expect(r.current?.isDragging).toBe(true)
    act(() => { r.current?.scrollProps.onScrollEndDrag?.({} as any) }); expect(r.current?.isDragging).toBe(false)
    act(() => { r.current?.scrollProps.onMomentumScrollBegin?.({} as any) }); expect(r.current?.isMomentum).toBe(true)
    act(() => { r.current?.scrollProps.onMomentumScrollEnd?.({} as any) }); expect(r.current?.isMomentum).toBe(false)
  })
  it('resets offset and clears direction when calling resetOffset', () => {
    const r = React.createRef<UseGestureScrollResult>(); renderer.create(<TC ref={r} />)
    act(() => { r.current?.scrollProps.onScroll?.(ev(80, 16)) }); expect(r.current?.getCurrentOffset()).toBe(80)
    act(() => { r.current?.resetOffset(5) }); expect(r.current?.getCurrentOffset()).toBe(5); expect(r.current?.direction).toBeNull()
  })
})
