import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import Rate from '..'

describe('Rate', () => {
  it('updates value when pressing icons', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate defaultValue={1} onChange={handleChange} />)

    const items = tree.root.findAllByType(Pressable)
    act(() => {
      items[2].props.onPress?.({ nativeEvent: { locationX: 20 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it('does not select half when allowHalf is false', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[0].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('supports half selection', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate allowHalf onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[0].props.onPress?.({ nativeEvent: { locationX: 5 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(0.5)
  })

  it('still allows click when touchable is false', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate touchable={false} onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[3].props.onPress?.({ nativeEvent: { locationX: 20 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('only calls onIconPress when value changes', () => {
    const handleChange = jest.fn()
    const handleIconPress = jest.fn()
    const tree = renderer.create(
      <Rate
        defaultValue={1}
        allowHalf
        onChange={handleChange}
        onIconPress={handleIconPress}
      />,
    )

    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[1].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(1.5)
    expect(handleIconPress).toHaveBeenCalledWith(1.5)

    handleChange.mockClear()
    handleIconPress.mockClear()

    act(() => {
      items[1].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).not.toHaveBeenCalled()
    expect(handleIconPress).not.toHaveBeenCalled()
  })

  it('supports count as string', () => {
    const tree = renderer.create(<Rate count="8" />)
    const items = tree.root.findAllByType(Pressable)
    expect(items.length).toBe(8)
  })

  it('does not render interactive nodes when disabled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate disabled onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)
    expect(items.length).toBe(0)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
