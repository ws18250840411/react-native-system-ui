import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import Progress from '..'

describe('Progress', () => {
  it('renders percentage width and pivot text', () => {
    const tree = renderer.create(<Progress percentage={40} />)
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.width === 'string' && style.width.endsWith('%'))

    expect(indicator?.width).toBe('40%')

    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('40%')
  })

  it('respects custom color and hides pivot', () => {
    const tree = renderer.create(
      <Progress percentage={80} color="#ff0000" showPivot={false} />,
    )

    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.backgroundColor === '#ff0000')

    expect(indicator?.backgroundColor).toBe('#ff0000')
    const textNodes = tree.root.findAllByType(Text)
    expect(textNodes.length).toBe(0)
  })
})
