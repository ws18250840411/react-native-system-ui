import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, View } from 'react-native'

import Circle from '..'

describe('Circle', () => {
  it('renders with rate and children', () => {
    const tree = renderer.create(<Circle rate={50}>50%</Circle>)
    expect(tree.toJSON()).toBeTruthy()
  })

  it('applies web mask to render a ring', () => {
    const tree = renderer.create(<Circle rate={70}>70%</Circle>)
    const ringStyle = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.backgroundImage === 'string' && style.backgroundImage.includes('conic-gradient'))

    expect(ringStyle?.maskImage ?? (ringStyle as any)?.WebkitMaskImage).toBeTruthy()
  })

  it('renders inner fill when fill is provided on web', () => {
    const tree = renderer.create(<Circle rate={40} fill="#ffffff" />)
    const innerStyle = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.position === 'absolute' && style?.backgroundColor === '#ffffff')

    expect(innerStyle?.backgroundColor).toBe('#ffffff')
  })
})
