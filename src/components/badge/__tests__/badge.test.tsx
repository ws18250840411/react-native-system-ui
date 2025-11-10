import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import Badge from '..'

describe('Badge', () => {
  it('clamps numeric content when max is provided', () => {
    const tree = renderer.create(
      <Badge content={120} max={99}>
        <View />
      </Badge>
    )

    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('99+')
  })

  it('hides when value is zero and showZero is false', () => {
    const tree = renderer.create(<Badge content={0} showZero={false} />)
    expect(tree.toJSON()).toBeNull()
  })

  it('renders dot badge with custom color', () => {
    const tree = renderer.create(<Badge dot color="#00ff00" />)
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)

    expect(style.backgroundColor).toBe('#00ff00')
    expect(style.width).toBe(style.height)
  })

  it('applies offset styles when wrapping children', () => {
    const tree = renderer.create(
      <Badge content={5} offset={[12, 4]}>
        <View />
      </Badge>
    )

    const views = tree.root.findAllByType(View)
    const badgeView = views[2]
    const style = StyleSheet.flatten(badgeView.props.style)

    expect(style.right).toBe(12)
    expect(style.top).toBe(4)
  })
})
