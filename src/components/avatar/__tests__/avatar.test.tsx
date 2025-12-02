import React from 'react'
import renderer from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Avatar from '..'

describe('Avatar', () => {
  it('renders fallback text when source missing', () => {
    const tree = renderer.create(<Avatar text="张三" />)
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('张三')
  })

  it('accepts numeric size', () => {
    const tree = renderer.create(<Avatar text="A" size={60} />)
    const pressable = tree.root.findByType(Pressable)
    const style = Array.isArray(pressable.props.style)
      ? Object.assign({}, ...pressable.props.style)
      : pressable.props.style
    expect(style.width).toBe(60)
    expect(style.height).toBe(60)
  })
})
