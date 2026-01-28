import React, { useImperativeHandle } from 'react'
import renderer, { act } from 'react-test-renderer'

import type { UseGestureScrollOptions, UseGestureScrollResult } from '../useGestureScroll'
import { useGestureScroll } from '../useGestureScroll'

const TestComponent = React.forwardRef<UseGestureScrollResult | null, { options?: UseGestureScrollOptions }>(
  ({ options }, ref) => {
    const value = useGestureScroll(options)
    useImperativeHandle(ref, () => value, [value])
    return null
  }
)

describe('useGestureScroll', () => {
  it('tracks scroll offset, direction and velocity', () => {
    const ref = React.createRef<UseGestureScrollResult>()

    renderer.create(<TestComponent ref={ref} />)

    act(() => {
      ref.current?.scrollProps.onScroll?.({
        nativeEvent: { contentOffset: { y: 40 } },
        timeStamp: 10,
      } as any)
      ref.current?.scrollProps.onScroll?.({
        nativeEvent: { contentOffset: { y: 120 } },
        timeStamp: 30,
      } as any)
    })

    expect(ref.current?.getCurrentOffset()).toBe(120)
    expect(ref.current?.direction).toBe('forward')
    expect(ref.current?.getVelocity()).toBeGreaterThan(0)

    act(() => {
      ref.current?.scrollProps.onScroll?.({
        nativeEvent: { contentOffset: { y: 60 } },
        timeStamp: 60,
      } as any)
    })

    expect(ref.current?.direction).toBe('backward')
  })

  it('toggles dragging and momentum flags', () => {
    const ref = React.createRef<UseGestureScrollResult>()
    renderer.create(<TestComponent ref={ref} />)

    act(() => {
      ref.current?.scrollProps.onScrollBeginDrag?.({} as any)
    })
    expect(ref.current?.isDragging).toBe(true)

    act(() => {
      ref.current?.scrollProps.onScrollEndDrag?.({} as any)
    })
    expect(ref.current?.isDragging).toBe(false)

    act(() => {
      ref.current?.scrollProps.onMomentumScrollBegin?.({} as any)
    })
    expect(ref.current?.isMomentum).toBe(true)

    act(() => {
      ref.current?.scrollProps.onMomentumScrollEnd?.({} as any)
    })
    expect(ref.current?.isMomentum).toBe(false)
  })

  it('resets offset and clears direction when calling resetOffset', () => {
    const ref = React.createRef<UseGestureScrollResult>()
    renderer.create(<TestComponent ref={ref} />)

    act(() => {
      ref.current?.scrollProps.onScroll?.({
        nativeEvent: { contentOffset: { y: 80 } },
        timeStamp: 16,
      } as any)
    })
    expect(ref.current?.getCurrentOffset()).toBe(80)

    act(() => {
      ref.current?.resetOffset(5)
    })

    expect(ref.current?.getCurrentOffset()).toBe(5)
    expect(ref.current?.direction).toBeNull()
  })
})
