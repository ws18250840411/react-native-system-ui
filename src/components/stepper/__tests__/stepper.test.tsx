import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { TextInput } from 'react-native'

import Stepper from '..'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

describe('Stepper', () => {
  it('increments and decrements value', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Stepper defaultValue={1} onChange={handleChange} />)

    const plus = tree.root.findByProps({ testID: 'stepper-plus' }) as React.ReactElement<any>
    const minus = tree.root.findByProps({ testID: 'stepper-minus' }) as React.ReactElement<any>

    act(() => {
      plus.props.onPress({})
    })
    expect(handleChange).toHaveBeenCalledWith(2, { name: undefined })

    act(() => {
      minus.props.onPress({})
    })
    expect(handleChange).toHaveBeenLastCalledWith(1, { name: undefined })
  })

  it('respects min/max limits', () => {
    const onOverlimit = jest.fn()
    const tree = renderer.create(
      <Stepper value={1} min={1} max={2} onOverlimit={onOverlimit} />, 
    )
    const minus = tree.root.findByProps({ testID: 'stepper-minus' }) as React.ReactElement<any>
    act(() => {
      minus.props.onPress({})
    })
    expect(onOverlimit).toHaveBeenCalledWith('minus')
  })

  it('updates value via input', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Stepper defaultValue={1} onChange={handleChange} />)
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText?.('3')
    })

    expect(handleChange).toHaveBeenCalledWith(3, { name: undefined })
  })

  it('avoids float precision issues', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Stepper defaultValue={0.2} step={0.1} onChange={handleChange} />,
    )
    const plus = tree.root.findByProps({ testID: 'stepper-plus' }) as React.ReactElement<any>

    act(() => {
      plus.props.onPress({})
    })

    expect(handleChange).toHaveBeenLastCalledWith(0.3, { name: undefined })
  })

  it('does not trigger extra step after long press', () => {
    jest.useFakeTimers()
    const handleChange = jest.fn()
    const tree = renderer.create(<Stepper defaultValue={0} onChange={handleChange} />)
    const plus = tree.root.findByProps({ testID: 'stepper-plus' }) as React.ReactElement<any>

    act(() => {
      plus.props.onPressIn?.()
      jest.advanceTimersByTime(800)
    })

    act(() => {
      plus.props.onPressOut?.()
      plus.props.onPress({})
    })

    expect(handleChange).toHaveBeenCalledTimes(3)
    expect(handleChange.mock.calls.map(call => call[0])).toEqual([1, 2, 3])
    jest.useRealTimers()
  })
})
