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

  it('renders dot badge in wrapper mode with immediate transform', () => {
    const tree = renderer.create(
      <Badge dot>
        <View />
      </Badge>
    )
    const badgeView = tree.root.findAllByProps({ pointerEvents: 'none' })[0]
    const style = StyleSheet.flatten(badgeView.props.style)

    // Dot should have transform applied immediately without layout
    // Half of dotSize (8) is 4
    expect(style.transform).toEqual([{ translateX: 4 }, { translateY: -4 }])
  })

  it('renders wrapper as View when onPress is not provided', () => {
    const tree = renderer.create(
      <Badge content={1}>
        <View testID="child" />
      </Badge>
    )

    const wrapper = tree.root.findAllByType(View).find(node => {
      const style = StyleSheet.flatten(node.props.style)
      return style?.position === 'relative'
    })

    expect(wrapper).toBeDefined()
    expect(typeof wrapper!.props.style).not.toBe('function')
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

  it('applies offset in standalone mode', () => {
    const tree = renderer.create(<Badge content={5} offset={[10, 20]} />)
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)

    // Standalone offset uses marginLeft/marginTop
    expect(style.marginLeft).toBe(10)
    expect(style.marginTop).toBe(20)
  })

  it('supports custom content node', () => {
    const tree = renderer.create(
      <Badge content={<View testID="custom" />}>
        <View />
      </Badge>
    )
    expect(tree.root.findByProps({ testID: 'custom' })).toBeTruthy()
  })

  it('handles onPress', () => {
    const onPress = jest.fn()
    // Standalone
    const tree = renderer.create(<Badge content={1} onPress={onPress} />)
    const pressable = tree.root.findByType(View).parent // Pressable wraps View
    // Badge returns cloneElement if no children and no onPress?
    // If onPress, it returns Pressable -> View
    // Let's check implementation

    // Code:
    // if (!visible && !dot) return null
    // const badgeNode = renderBadgeNode(true)
    // if (onPress) return <Pressable>{badgeNode}</Pressable>

    // badgeNode is a View

    // In test renderer, Pressable might be mocked or we look for onPress prop

    // Let's just find element with onPress
    const node = tree.root.findByProps({ onPress })
    act(() => {
      node.props.onPress()
    })
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
