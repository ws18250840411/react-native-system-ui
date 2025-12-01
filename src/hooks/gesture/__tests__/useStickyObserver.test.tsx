import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Animated } from 'react-native'

import type { StickyObserverOptions, StickyObserverResult } from '../useStickyObserver'
import { useStickyObserver } from '../useStickyObserver'

const TestComponent = React.forwardRef<StickyObserverResult | null, StickyObserverOptions>(
  (props, ref) => {
    const value = useStickyObserver(props)
    React.useImperativeHandle(ref, () => value, [value])
    return null
  }
)

describe('useStickyObserver', () => {
  it('reports sticky state after reaching threshold', () => {
    const scrollValue = new Animated.Value(0)
    const onStateChange = jest.fn()
    const onScroll = jest.fn()
    const ref = React.createRef<StickyObserverResult>()

    renderer.create(
      <TestComponent
        ref={ref}
        scrollValue={scrollValue}
        offset={20}
        onStateChange={onStateChange}
        onScroll={onScroll}
      />
    )

    act(() => {
      ref.current?.onLayout?.({
        nativeEvent: { layout: { x: 0, y: 100, width: 200, height: 40 } },
      } as any)
    })

    expect(ref.current?.placeholderHeight).toBe(40)
    expect(ref.current?.isSticky).toBe(false)

    act(() => {
      scrollValue.setValue(50)
    })

    expect(ref.current?.isSticky).toBe(false)

    act(() => {
      scrollValue.setValue(120)
    })

    expect(ref.current?.isSticky).toBe(true)
    expect(onStateChange).toHaveBeenLastCalledWith(true)
    expect(onScroll).toHaveBeenLastCalledWith({ scrollTop: 120, isFixed: true })

    act(() => {
      scrollValue.setValue(0)
    })

    expect(ref.current?.isSticky).toBe(false)
    expect(onStateChange).toHaveBeenLastCalledWith(false)
  })

  it('remains disabled when flag is passed', () => {
    const scrollValue = new Animated.Value(0)
    const ref = React.createRef<StickyObserverResult>()

    renderer.create(
      <TestComponent ref={ref} scrollValue={scrollValue} disabled />
    )

    act(() => {
      ref.current?.onLayout?.({
        nativeEvent: { layout: { x: 0, y: 10, width: 100, height: 30 } },
      } as any)
      scrollValue.setValue(200)
    })

    expect(ref.current?.isSticky).toBe(false)
  })
})
