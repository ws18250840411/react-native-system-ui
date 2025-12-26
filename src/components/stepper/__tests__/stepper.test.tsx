import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { TextInput } from 'react-native'

import Stepper from '..'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => { } },
  }
}

describe('Stepper', () => {
  it('increments and decrements value', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Stepper defaultValue={1} onChange={handleChange} />)

    const plus = tree.root.findByProps({ testID: 'stepper-plus' })
    const minus = tree.root.findByProps({ testID: 'stepper-minus' })

    act(() => {
      plus.props.onPress({})
    })
    expect(handleChange).toHaveBeenCalledWith(2, { name: undefined })

    act(() => {
      minus.props.onPress({})
    })
    expect(handleChange).toHaveBeenLastCalledWith(1, { name: undefined })
  })

  it('formats value with decimalLength', () => {
    const tree = renderer.create(
      <Stepper value={1.5} decimalLength={2} />
    )

    const input = tree.root.findByType(TextInput)
    expect(input.props.value).toBe('1.50')
  })

  it('enforces integer prop', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Stepper value={1} integer step={0.5} onChange={onChange} />
    )

    let plus = tree.root.findByProps({ testID: 'stepper-plus' })
    act(() => {
      plus.props.onPress({})
    })

    // 1 + 0.5 = 1.5 -> trunc -> 1. No change.
    expect(onChange).not.toHaveBeenCalled()

    // 1 + 1.5 = 2.5 -> trunc -> 2.
    act(() => {
      tree.update(<Stepper value={1} integer step={1.5} onChange={onChange} />)
    })

    plus = tree.root.findByProps({ testID: 'stepper-plus' })
    act(() => {
      plus.props.onPress({})
    })
    expect(onChange).toHaveBeenCalledWith(2, { name: undefined })
  })

  it('allows empty input if allowEmpty is true', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Stepper value={1} allowEmpty onChange={onChange} />
    )

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onChangeText('')
    })

    expect(onChange).toHaveBeenCalledWith(null, { name: undefined })
  })

  it('disables input editing', () => {
    const tree = renderer.create(
      <Stepper value={1} disableInput />
    )

    const input = tree.root.findByType(TextInput)
    expect(input.props.editable).toBe(false)
  })

  it('respects min/max limits', () => {
    const onOverlimit = jest.fn()
    const tree = renderer.create(
      <Stepper value={1} min={1} max={2} onOverlimit={onOverlimit} />,
    )
    const minus = tree.root.findByProps({ testID: 'stepper-minus' })
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
    const plus = tree.root.findByProps({ testID: 'stepper-plus' })

    act(() => {
      plus.props.onPress({})
    })

    expect(handleChange).toHaveBeenLastCalledWith(0.3, { name: undefined })
  })

  it('does not trigger extra step after long press', () => {
    jest.useFakeTimers()
    const handleChange = jest.fn()
    const tree = renderer.create(<Stepper defaultValue={0} onChange={handleChange} />)
    const plus = tree.root.findByProps({ testID: 'stepper-plus' })

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

  it('supports beforeChange to block updates', () => {
    const beforeChange = jest.fn(() => false)
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Stepper defaultValue={1} onChange={handleChange} beforeChange={beforeChange} />,
    )
    const plus = tree.root.findByProps({ testID: 'stepper-plus' })

    act(() => {
      plus.props.onPress({})
    })

    expect(beforeChange).toHaveBeenCalledWith(2)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports async beforeChange', async () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Stepper defaultValue={1} onChange={handleChange} beforeChange={() => Promise.resolve(true)} />,
    )
    const plus = tree.root.findByProps({ testID: 'stepper-plus' })

    await act(async () => {
      plus.props.onPress({})
      await Promise.resolve()
    })

    expect(handleChange).toHaveBeenCalledWith(2, { name: undefined })
  })
})
