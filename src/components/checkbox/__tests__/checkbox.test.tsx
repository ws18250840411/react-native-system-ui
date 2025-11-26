import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import { Checkbox } from '..'
import { CheckboxGroup } from '../CheckboxGroup'

describe('Checkbox', () => {
  it('toggles uncontrolled state', () => {
    const tree = renderer.create(<Checkbox aria-label="选项A">选项A</Checkbox>)

    const pressable = tree.root.findAllByType(Pressable)[0]
    act(() => {
      pressable.props.onPress()
    })

    const iconText = tree.root.findAllByType(Text).find(node => node.props.children === '✓')
    expect(iconText).toBeTruthy()
  })

  it('respects controlled checked prop', () => {
    const tree = renderer.create(<Checkbox checked>受控</Checkbox>)
    const iconText = tree.root.findAllByType(Text).find(node => node.props.children === '✓')
    expect(iconText).toBeTruthy()
  })
})

describe('CheckboxGroup', () => {
  it('notifies value changes', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <CheckboxGroup value={['a']} onChange={onChange}>
        <Checkbox name="a" aria-label="选项A">A</Checkbox>
        <Checkbox name="b" aria-label="选项B">B</Checkbox>
      </CheckboxGroup>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const first = pressables[0]
    act(() => {
      first.props.onPress()
    })

    expect(onChange).toHaveBeenCalledWith([])
  })
})
