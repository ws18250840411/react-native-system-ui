import React from 'react'
import renderer from 'react-test-renderer'
import { View } from 'react-native'

import Flex from '..'

describe('Flex', () => {
  it('applies gutter spacing to items', () => {
    const tree = renderer.create(
      <Flex gutter={16}>
        <Flex.Item>1</Flex.Item>
        <Flex.Item>2</Flex.Item>
      </Flex>
    )

    const items = tree.root.findAllByType(View).filter(node => node.props.children === '1' || node.props.children === '2')
    expect(items[0].props.style[0].paddingHorizontal).toBe(8)
  })

  it('calculates width based on span', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item span={12}>half</Flex.Item>
      </Flex>
    )

    const item = tree.root.findByProps({ children: 'half' })
    expect(item.props.style[1].width).toBe('50%')
  })
})
