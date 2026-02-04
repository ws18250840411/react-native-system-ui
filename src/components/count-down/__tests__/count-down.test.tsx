import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import CountDown from '..'
import type { CountDownInstance } from '..'

describe('CountDown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('counts down automatically and calls onFinish', () => {
    const onFinish = jest.fn()
    renderer.create(<CountDown time={1000} onFinish={onFinish} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onFinish).toHaveBeenCalled()
  })

  it('exposes imperative methods', () => {
    const ref = React.createRef<CountDownInstance>()
    renderer.create(<CountDown ref={ref} autoStart={false} time={2000} />)

    act(() => {
      ref.current?.start()
      jest.advanceTimersByTime(1000)
      ref.current?.pause()
    })

    expect(ref.current).toBeTruthy()

    act(() => {
      ref.current?.reset()
    })
  })

  it('renders custom format', () => {
    
    const tree = renderer.create(<CountDown time={1000} format="HH:mm:ss" autoStart={false} />)
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('00:00:01')
  })

  it('supports custom renderer', () => {
    const rendererFn = jest.fn(({ total }) => `Total: ${total}`)
    const tree = renderer.create(
      <CountDown time={1000} autoStart={false}>
        {rendererFn}
      </CountDown>
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('Total: 1000')
    expect(rendererFn).toHaveBeenCalled()
  })

  it('supports millisecond format', () => {
    // 500ms -> SSS should be 500
    const tree = renderer.create(
      <CountDown time={500} format="SSS" millisecond autoStart={false} />
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('500')
  })

  it('does not reset when onChange callback changes', () => {
    const onChangeA = jest.fn()
    const onChangeB = jest.fn()
    const tree = renderer.create(<CountDown time={2000} onChange={onChangeA} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    const textBefore = tree.root.findByType(Text)
    expect(textBefore.props.children).toBe('00:00:01')

    const calledA = onChangeA.mock.calls.length
    act(() => {
      tree.update(<CountDown time={2000} onChange={onChangeB} />)
    })
    const textAfter = tree.root.findByType(Text)
    expect(textAfter.props.children).toBe('00:00:01')

    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(onChangeA.mock.calls.length).toBe(calledA)
    expect(onChangeB.mock.calls.length).toBeGreaterThan(0)

    act(() => {
      jest.advanceTimersByTime(2000)
    })
  })

  it('does not start when autoStart is false', () => {
    const onChange = jest.fn()
    renderer.create(
      <CountDown time={1000} autoStart={false} onChange={onChange} />
    )
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(onChange).not.toHaveBeenCalled()
  })
})
