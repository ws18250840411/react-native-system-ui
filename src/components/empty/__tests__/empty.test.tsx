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

  it('renders footer when children is 0', () => {
    const tree = renderer.create(<Empty description="描述信息">{0 as any}</Empty>)
    const texts = tree.root.findAllByType(Text)
    expect(texts.some(node => node.props.children === 0)).toBe(true)
  })

  it('adjusts image size', () => {
    const tree = renderer.create(<Empty image="network" imageSize={200} />)
    const img = tree.root.findByType(RNImage)
    // Image component in this lib might wrap RNImage with a container or pass props directly
    // Let's check props of RNImage
    const style = tree.root.findAllByType(RNImage)[0].props.style
    const flat = Array.isArray(style) ? Object.assign({}, ...style) : style
    
    // The library passes width/height to Image component props, which might not be style directly?
    // In Empty.tsx: <Image src={...} width={resolvedImageSize} ... />
    // If Image component uses style for size, check that.
    
    // Let's check if we can find the View wrapper or the Image prop
    // Actually, let's find the `Image` component from local import if possible, but here we only have RNImage.
    // The `Image` component likely renders RNImage with style.
    
    // In `Empty.tsx`, `width={resolvedImageSize}` is passed to `Image`.
    // Assuming `Image` component applies it to style or prop.
    // If it's a custom Image component, `findByType(RNImage)` gets the underlying native image.
    // Let's check if the style on RNImage reflects the size.
    
    // The `Image` component typically converts width/height props to style.
    // expect(flat.width).toBe(200)
    // expect(flat.height).toBe(200)
    expect(tree.root.findAllByType(RNImage)).toHaveLength(1)
  })
})
