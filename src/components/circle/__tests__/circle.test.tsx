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

    const ringObj = ringStyle as unknown as Record<string, unknown> | undefined
    expect((ringObj as Record<string, unknown> | undefined)?.maskImage ?? ringObj?.WebkitMaskImage).toBeTruthy()
  })

  it('renders inner fill when fill is provided on web', () => {
    const tree = renderer.create(<Circle rate={40} fill="#ffffff" />)
    const innerStyle = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.position === 'absolute' && style?.backgroundColor === '#ffffff')

    expect(innerStyle?.backgroundColor).toBe('#ffffff')
  })

  it('adjusts size and strokeWidth', () => {
    const tree = renderer.create(<Circle size={120} strokeWidth={10} />)
    const root = tree.root.findByType(View)
    const style = StyleSheet.flatten(root.props.style)
    
    expect(style.width).toBe(120)
    expect(style.height).toBe(120)
  })

  it('renders children node', () => {
    const tree = renderer.create(
      <Circle>
        <View testID="child" />
      </Circle>
    )
    expect(tree.root.findByProps({ testID: 'child' })).toBeTruthy()
  })
})
