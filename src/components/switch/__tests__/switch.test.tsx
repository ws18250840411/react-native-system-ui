import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import Switch from '..'

describe('Switch', () => {
  it('toggles and calls onChange (uncontrolled)', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Switch defaultChecked onChange={handleChange} />)
    let pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).toHaveBeenLastCalledWith(false)

    pressable = tree.root.findByType(Pressable)
    act(() => {
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).toHaveBeenLastCalledWith(true)
  })

  it('calls onClick but does not toggle when loading', () => {
    const handleClick = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Switch loading defaultChecked onClick={handleClick} onChange={handleChange} />,
    )
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as any)
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
      pressable.props.onPress?.({} as any)
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
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).toHaveBeenLastCalledWith(1)

    pressable = tree.root.findByType(Pressable)
    act(() => {
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).toHaveBeenLastCalledWith(0)
  })
})
