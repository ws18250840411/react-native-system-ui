import React from 'react'
import renderer from 'react-test-renderer'
import { Text, StyleSheet, View } from 'react-native'

import Skeleton from '..'

describe('Skeleton', () => {
  it('renders configured rows and title', () => {
    const tree = renderer.create(<Skeleton row={2} title />)
    const rows = tree.root.findAll(node => node.props.testID?.startsWith('rv-skeleton-row-'))
    const unique = new Set(rows.map(row => row.props.testID))
    expect(unique.size).toBe(2)
  })

  it('renders children when loading is false', () => {
    const tree = renderer.create(
      <Skeleton loading={false}>
        <Text>loaded</Text>
      </Skeleton>
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('loaded')
  })

  it('renders avatar', () => {
    const tree = renderer.create(<Skeleton avatar avatarSize={40} />)
    // Avatar is an Animated.View before the content view
    // Content view has flex: 1
    // Avatar view has fixed width/height
    const views = tree.root.findAllByType(View) // Includes Animated.View if it renders View
    // However, Animated.View might be distinct in test renderer or just a View with animated props
    // Let's find by style

    // In Skeleton.tsx: <Animated.View style={[styles.avatar, ...]} />
    // We can check if any view has width 40 and height 40

    // Note: findAllByType(View) might not find Animated.View components directly if they are wrapped.
    // But usually Animated.View renders a View.

    // Let's use findAll and check props.style
    const avatar = tree.root.findAll(node => {
      const style = node.props.style
      if (!style) return false
      const flat = Array.isArray(style) ? Object.assign({}, ...style) : style
      return flat.width === 40 && flat.height === 40
    })

    expect(avatar.length).toBeGreaterThan(0)
  })

  it('supports custom row widths', () => {
    const tree = renderer.create(<Skeleton row={3} rowWidth={['100%', '50%', '20%']} />)
    const rows = tree.root.findAll(node => node.props.testID?.startsWith('rv-skeleton-row-'))
    // De-duplicate by testID to handle potential Animated.View wrapping behavior in tests
    const uniqueRows = Array.from(new Set(rows.map(r => r.props.testID)))
      .sort()
      .map(id => rows.find(r => r.props.testID === id)!)

    expect(uniqueRows).toHaveLength(3)

    const style0 = StyleSheet.flatten(uniqueRows[0].props.style)
    const style1 = StyleSheet.flatten(uniqueRows[1].props.style)
    const style2 = StyleSheet.flatten(uniqueRows[2].props.style)

    expect(style0.width).toBe('100%')
    expect(style1.width).toBe('50%')
    expect(style2.width).toBe('20%')
  })

  it('trims rowWidth and applies lastRowWidth rule', () => {
    const tree = renderer.create(<Skeleton row={2} rowWidth="100% " />)
    const rows = tree.root.findAll(node => node.props.testID?.startsWith('rv-skeleton-row-'))
    const uniqueRows = Array.from(new Set(rows.map(r => r.props.testID)))
      .sort()
      .map(id => rows.find(r => r.props.testID === id)!)

    const style0 = StyleSheet.flatten(uniqueRows[0].props.style)
    const style1 = StyleSheet.flatten(uniqueRows[1].props.style)

    expect(style0.width).toBe('100%')
    expect(style1.width).toBe('60%')
  })

  it('handles non-finite row safely', () => {
    const tree = renderer.create(<Skeleton row={Number.POSITIVE_INFINITY as any} />)
    const rows = tree.root.findAll(node => node.props.testID?.startsWith('rv-skeleton-row-'))
    expect(rows.length).toBe(0)
  })
})
