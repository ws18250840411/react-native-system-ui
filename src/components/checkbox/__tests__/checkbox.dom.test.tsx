

import React, { act, useState } from 'react'
import renderer from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import { Checkbox } from '..'

const hasCheckmark = (tree: renderer.ReactTestRenderer) =>
  tree.root.findAllByType(Text).some(node => node.props.children === '✓')

describe('Checkbox (DOM)', () => {
  it('toggles controlled state when clicking label', () => {
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return (
        <Checkbox checked={checked} onChange={setChecked}>
          复选框
        </Checkbox>
      )
    }

    const tree = renderer.create(<Controlled />)
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress()
    })
    expect(hasCheckmark(tree)).toBe(true)

    act(() => {
      pressable.props.onPress()
    })
    expect(hasCheckmark(tree)).toBe(false)
  })

  it('respects labelDisabled (label does not toggle, icon toggles)', () => {
    const tree = renderer.create(
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    )

    expect(hasCheckmark(tree)).toBe(true)

    const labelWrapper = tree.root.findAllByType(View).find(node =>
      node.props.pointerEvents === 'none' &&
      node.findAllByType(Text).some(t => t.props.children === '禁止文本点击')
    )
    expect(labelWrapper).toBeTruthy()
    expect(labelWrapper?.props.onPress).toBeUndefined()

    const checkbox = tree.root.findByProps({ accessibilityRole: 'checkbox' })
    act(() => {
      checkbox.props.onPress()
    })
    expect(hasCheckmark(tree)).toBe(false)
  })
})
