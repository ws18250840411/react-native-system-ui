import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Switch as RNSwitch, type GestureResponderEvent } from 'react-native'

import Switch from '..'

describe('Switch', () => {
  it('toggles and calls onChange (uncontrolled)', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Switch defaultChecked onChange={handleChange} />)
    let nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onValueChange?.(false)
    })

    expect(handleChange).toHaveBeenLastCalledWith(false)

    nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onValueChange?.(true)
    })

    expect(handleChange).toHaveBeenLastCalledWith(true)
  })

  it('works in controlled mode', () => {
    const onChange = jest.fn()
    const tree = renderer.create(<Switch checked={true} onChange={onChange} />)
    const nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onValueChange?.(false)
    })

    expect(onChange).toHaveBeenLastCalledWith(false)
  })

  it('does not call onClick/onChange when disabled', () => {
    const handleClick = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch disabled defaultChecked onClick={handleClick} onChange={handleChange} />,
    )
    const nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onTouchEnd?.({} as unknown as GestureResponderEvent)
    })

    expect(nativeSwitch.props.disabled).toBe(true)
    expect(handleClick).not.toHaveBeenCalled()
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports custom activeValue/inactiveValue', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch activeValue={1} inactiveValue={0} defaultChecked={0} onChange={handleChange} />,
    )
    let nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onValueChange?.(true)
    })

    expect(handleChange).toHaveBeenLastCalledWith(1)

    nativeSwitch = tree.root.findByType(RNSwitch)
    act(() => {
      nativeSwitch.props.onValueChange?.(false)
    })

    expect(handleChange).toHaveBeenLastCalledWith(0)
  })

  it('adjusts size based on prop', () => {
    const tree = renderer.create(<Switch size={30} />)
    const nativeSwitch = tree.root.findByType(RNSwitch)
    const styleProp = nativeSwitch.props.style
    const flattened = Array.isArray(styleProp)
      ? Object.assign({}, ...styleProp)
      : styleProp
    const transform = flattened?.transform ?? []
    const scaleX = transform.find((entry: { scaleX?: number }) => entry.scaleX)?.scaleX
    const scaleY = transform.find((entry: { scaleY?: number }) => entry.scaleY)?.scaleY
    const expected = 30 / 28

    expect(scaleX).toBeCloseTo(expected, 4)
    expect(scaleY).toBeCloseTo(expected, 4)
  })
})
