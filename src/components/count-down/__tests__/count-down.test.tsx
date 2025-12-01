import React from 'react'
import renderer, { act } from 'react-test-renderer'

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
})
