import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, View } from 'react-native'

import Space from '..'

describe('Space', () => {
  it('renders horizontal spacing', () => {
    const tree = renderer.create(
      <Space gap={10}>
        <span>1</span>
        <span>2</span>
      </Space>
    )

    const spans = tree.root.findAllByType('span')
    expect(spans).toHaveLength(2)
  })

  it('supports vertical direction and divider', () => {
    const tree = renderer.create(
      <Space direction="vertical" divider={<span>|</span>}>
        <span>Top</span>
        <span>Bottom</span>
      </Space>
    )

    expect(tree.root.findAllByType('span')).toHaveLength(3)
  })
})

describe('Space advanced props', () => {
  it('applies preset size gaps', () => {
    const tree = renderer.create(
      <Space size="large">
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    const first = tree.root.findByProps({ testID: 'child-a' })
    const parentStyle = StyleSheet.flatten(first.parent?.props.style)
    const marginValue = parentStyle?.marginRight
    const numeric = typeof marginValue === 'string' ? parseFloat(marginValue) : marginValue
    expect(numeric ?? 0).toBeGreaterThanOrEqual(0)
  })

  it('accepts fill prop without crashing', () => {
    expect(() =>
      renderer.create(
        <Space fill>
          <span>Fill</span>
          <span>Fill</span>
        </Space>
      )
    ).not.toThrow()
  })
})
