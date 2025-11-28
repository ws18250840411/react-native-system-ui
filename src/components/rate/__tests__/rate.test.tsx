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

  it('supports half selection', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate allowHalf onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[0].props.onPress?.({ nativeEvent: { locationX: 5 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(0.5)
  })

  it('does not render interactive nodes when disabled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate disabled onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)
    expect(items.length).toBe(0)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
