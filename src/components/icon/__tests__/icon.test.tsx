import React from 'react'
import { Pressable, Text } from 'react-native'
import renderer from 'react-test-renderer'

import Icon from '..'

describe('Icon', () => {
  it('renders built-in icon via name', () => {
    const tree = renderer.create(<Icon name="close" />)
    const svg = tree.root.findByType('svg')
    expect(svg.props.viewBox).toBe('0 0 1024 1024')
    expect(tree.root.findAllByType('path').length).toBeGreaterThan(0)
  })

  it('supports custom component prop', () => {
    const Custom = ({ size = 0 }: { size?: number }) => <Text>{size}</Text>
    const tree = renderer.create(<Icon component={Custom} size={32} />)
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe(32)
  })

  it('handles press events when onPress is provided', () => {
    const onPress = jest.fn()
    const tree = renderer.create(<Icon name="check" onPress={onPress} />)
    const pressable = tree.root.findByType(Pressable)
    pressable.props.onPress()
    expect(onPress).toHaveBeenCalled()
  })
})
