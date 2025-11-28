import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import NumberKeyboard from '..'

describe('NumberKeyboard', () => {
  it('emits input events and updates value when uncontrolled', () => {
    const handleInput = jest.fn()
    const handleChange = jest.fn()
    const tree = renderer.create(
      <NumberKeyboard visible onInput={handleInput} onChange={handleChange} />
    )

    const key = tree.root.findAllByType(Pressable)[0]
    act(() => {
      key.props.onPress()
    })

    expect(handleInput).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.stringMatching(/\d/))
  })

  it('calls delete handler', () => {
    const onDelete = jest.fn()
    const tree = renderer.create(
      <NumberKeyboard visible defaultValue="12" onDelete={onDelete} />
    )
    const keys = tree.root.findAllByType(Pressable)
    const deleteKey = keys[keys.length - 1]
    act(() => {
      deleteKey.props.onPress()
    })
    expect(onDelete).toHaveBeenCalled()
  })
})
