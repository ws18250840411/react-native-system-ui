import React from 'react'
import renderer from 'react-test-renderer'
import { View } from 'react-native'

import Slider from '..'

describe('Slider', () => {
  it('renders single value slider', () => {
    const tree = renderer.create(<Slider value={30} min={0} max={100} />)
    expect(tree.toJSON()).toBeTruthy()
  })

  it('renders range slider with two thumbs', () => {
    const tree = renderer.create(<Slider range value={[20, 60]} />)
    const thumbViews = tree.root.findAll(
      node =>
        node.type === View &&
        Array.isArray(node.props.style) &&
        node.props.style.some((style: any) => style?.position === 'absolute' && style?.borderWidth !== undefined),
    )
    expect(thumbViews.length).toBeGreaterThanOrEqual(2)
  })
})
