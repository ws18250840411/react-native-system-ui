import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import { Radio } from '..'
import { RadioGroup } from '../RadioGroup'

describe('Radio', () => {
  it('invokes onChange when toggled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Radio onChange={handleChange}>单选</Radio>)

    const pressable = tree.root.findAllByType(Pressable)[0]
    act(() => {
      pressable.props.onPress()
    })

    expect(handleChange).toHaveBeenCalledWith(true)
  })
})

describe('RadioGroup', () => {
  it('switches selection inside group', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <RadioGroup value="a" onChange={value => onChange(value)}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const icon = tree.root.findByProps({ testID: 'radio-icon-b' })
    act(() => {
      icon.props.onPress()
    })

    expect(onChange).toHaveBeenCalledWith('b')
  })
})
