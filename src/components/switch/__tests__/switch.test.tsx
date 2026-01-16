import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, type GestureResponderEvent } from 'react-native'

import Switch from '..'

describe('Switch', () => {
  it('toggles and calls onChange (uncontrolled)', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Switch defaultChecked onChange={handleChange} />)
    let pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(handleChange).toHaveBeenLastCalledWith(false)

    pressable = tree.root.findByType(Pressable)
    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(handleChange).toHaveBeenLastCalledWith(true)
  })

  it('works in controlled mode', () => {
    const onChange = jest.fn()
    const tree = renderer.create(<Switch checked={true} onChange={onChange} />)
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(onChange).toHaveBeenLastCalledWith(false)
  })

  it('calls onClick but does not toggle when loading', () => {
    const handleClick = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch loading defaultChecked onClick={handleClick} onChange={handleChange} />,
    )
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('does not call onClick/onChange when disabled', () => {
    const handleClick = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch disabled defaultChecked onClick={handleClick} onChange={handleChange} />,
    )
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(pressable.props.disabled).toBe(true)
    expect(handleClick).not.toHaveBeenCalled()
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports custom activeValue/inactiveValue', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch activeValue={1} inactiveValue={0} defaultChecked={0} onChange={handleChange} />,
    )
    let pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(handleChange).toHaveBeenLastCalledWith(1)

    pressable = tree.root.findByType(Pressable)
    act(() => {
      pressable.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(handleChange).toHaveBeenLastCalledWith(0)
  })

  it('adjusts size based on prop', () => {
    const tree = renderer.create(<Switch size={30} />)
    const json = tree.toJSON()
    if (!json || Array.isArray(json) || typeof json === 'string') {
      throw new Error('Unexpected Switch render output')
    }
    const firstChild = json.children?.[0]
    if (!firstChild || Array.isArray(firstChild) || typeof firstChild === 'string') {
      throw new Error('Unexpected Switch track output')
    }
    const trackStyle = (firstChild as renderer.ReactTestRendererJSON).props.style

    // In test environment (likely web preset), styles are strings with 'px'
    expect(trackStyle.width).toBe('60px')
    expect(trackStyle.height).toBe('30px')
    expect(trackStyle.borderTopLeftRadius).toBe('15px')
  })
})
