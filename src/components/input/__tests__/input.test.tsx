import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, TextInput } from 'react-native'

import Input from '..'

describe('Input', () => {
  it('triggers onChange when typing', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Input value= onChange={handleChange} />)
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText?.('hello')
    })

    expect(handleChange).toHaveBeenCalledWith('hello')
  })

  it('clears value via clear icon', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Input
        defaultValue=123
        clearable
        clearTrigger=always
        onChange={handleChange}
      />
    )

    const pressables = tree.root.findAllByType(Pressable)
    const clearButton = pressables.find(node => node.props.accessibilityRole !== 'button')
    expect(clearButton).toBeTruthy()

    act(() => {
      clearButton?.props.onPress?.()
    })

    expect(handleChange).toHaveBeenLastCalledWith('')
  })

  it('renders custom word limit content in TextArea', () => {
    const tree = renderer.create(
      <Input.TextArea
        defaultValue=abcd
        showWordLimit={({ currentCount }) => (
          <Text testID=counter>当前：{currentCount}</Text>
        )}
      />
    )

    const counter = tree.root.findByProps({ testID: 'counter' })
    expect(counter.props.children).toContain(4)
  })
})
