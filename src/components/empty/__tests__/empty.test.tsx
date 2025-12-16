import React from 'react'
import renderer from 'react-test-renderer'
import { Image as RNImage, Text, View } from 'react-native'

import Empty from '..'

beforeAll(() => {
  ;(global as any).window = (global as any).window ?? {}
  ;(global as any).window.Image = (global as any).window.Image ?? function () {}
})

describe('Empty', () => {
  it('renders default image and description', () => {
    const tree = renderer.create(<Empty description="描述信息" />)
    const texts = tree.root.findAllByType(Text)
    const descriptionNode = texts.find(node => node.props.children === '描述信息')
    expect(descriptionNode).toBeDefined()
  })

  it('accepts custom image node', () => {
    const Custom = () => <View testID="custom" />
    const tree = renderer.create(
      <Empty image={<Custom />} description="custom" />,
    )
    expect(tree.root.findByProps({ testID: 'custom' })).toBeDefined()
  })

  it('renders preset image by string type', () => {
    const tree = renderer.create(<Empty image="error" description="描述信息" />)
    expect(tree.root.findAllByType(RNImage).length).toBeGreaterThan(0)
  })
})
