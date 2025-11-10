import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import Flex from '..'

describe('Flex', () => {
  it('applies gutter spacing to items', () => {
    const tree = renderer.create(
      <Flex gutter={16}>
        <Flex.Item>
          <Text>one</Text>
        </Flex.Item>
        <Flex.Item>
          <Text>two</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemViews = views.slice(1)
    const style = StyleSheet.flatten(itemViews[0].props.style)
    expect(style.paddingHorizontal).toBe(8)
  })

  it('calculates width based on span', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item span={12}>
          <Text>half</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemView = views[1]
    const style = StyleSheet.flatten(itemView.props.style)
    expect(style.width).toBe('50%')
  })
})
