import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Switch from '..'

describe('Switch', () => {
  it('calls onChange when toggled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Switch defaultChecked onChange={handleChange} />)
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).toHaveBeenCalled()
  })

  it('does not toggle when loading/disabled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Switch loading defaultChecked onChange={handleChange} />)
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.({} as any)
    })

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders label in the correct position', () => {
    const tree = renderer.create(<Switch label="通知" labelPosition="left" />)
    const labels = tree.root.findAllByType(Text)
    const labelText = labels.find(node => node.props.children === '通知')
    expect(labelText).toBeDefined()
  })
})
