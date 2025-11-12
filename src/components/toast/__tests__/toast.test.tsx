import React from 'react'
import renderer, { act } from 'react-test-renderer'

import Toast from '..'

describe('Toast', () => {
  jest.useFakeTimers()

  it('auto closes after duration', () => {
    const onClose = jest.fn()
    renderer.create(<Toast visible message="hello" duration={1000} onClose={onClose} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onClose).toHaveBeenCalled()
  })
})
