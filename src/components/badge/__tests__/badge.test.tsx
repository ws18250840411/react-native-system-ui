import React from 'react'
import renderer, { act } from 'react-test-renderer'
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

    const badgeView = tree.root.findAllByProps({ pointerEvents: 'none' })[0]
    const style = StyleSheet.flatten(badgeView.props.style)

    expect(style.right).toBe(12)
    expect(style.top).toBe(4)
  })

  it('translates badge outside the corner after layout', () => {
    const tree = renderer.create(
      <Badge content={5}>
        <View />
      </Badge>
    )

    const badgeView = tree.root.findAllByProps({ pointerEvents: 'none' })[0]

    act(() => {
      badgeView.props.onLayout?.({
        nativeEvent: { layout: { width: 24, height: 16 } },
      } as any)
    })

    const style = StyleSheet.flatten(tree.root.findAllByProps({ pointerEvents: 'none' })[0].props.style)
    expect(style.transform).toEqual([
      { translateX: 12 },
      { translateY: -8 },
    ])
  })
})
