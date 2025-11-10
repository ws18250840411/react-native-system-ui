import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import Empty from '..'

describe('Empty', () => {
  it('renders default image and description', () => {
    const tree = renderer.create(<Empty description="暂无数据" />)
    const texts = tree.root.findAllByType(Text)
    const descriptionNode = texts.find(node => node.props.children === '暂无数据')
    expect(descriptionNode).toBeDefined()
  })

  it('accepts custom image node', () => {
    const Custom = () => <View testID="custom" />
    const tree = renderer.create(
      <Empty image={<Custom />} description="custom" />,
    )
    expect(tree.root.findByProps({ testID: 'custom' })).toBeDefined()
  })
})
