import React from 'react'
import renderer from 'react-test-renderer'
import { Image as RNImage, Text, View } from 'react-native'

import Empty from '..'
import Image from '../../image'

beforeAll(() => {
  ; (global as any).window = (global as any).window ?? {}
    ; (global as any).window.Image = (global as any).window.Image ?? function () { }
})

describe('Empty', () => {
  it('renders default image and description', () => {
    const tree = renderer.create(<Empty description="描述信息" />)
    const texts = tree.root.findAllByType(Text)
    const descriptionNode = texts.find(node => node.props.children === '描述信息')
    expect(descriptionNode).toBeDefined()
    
    expect(tree.root.findAllByType(RNImage).length).toBe(0)
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
    
    expect(tree.root.findAllByType(RNImage).length).toBe(0)
  })

  it('renders network image by url', () => {
    const tree = renderer.create(<Empty image="https://example.com/test.png" description="描述信息" />)
    expect(tree.root.findAllByType(RNImage).length).toBeGreaterThan(0)
  })

  it('renders footer when children is 0', () => {
    const tree = renderer.create(<Empty description="描述信息">{0 as any}</Empty>)
    const texts = tree.root.findAllByType(Text)
    expect(texts.some(node => node.props.children === 0)).toBe(true)
  })

  it('adjusts image size for URL image', () => {
    const tree = renderer.create(<Empty image="https://example.com/test.png" imageSize={200} />)
    const imageComp = tree.root.findByType(Image)
    expect(imageComp.props.width).toBe(200)
    expect(imageComp.props.height).toBe(200)
  })
})
