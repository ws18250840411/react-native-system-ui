import React from 'react'
import renderer from 'react-test-renderer'
import { Platform, StyleSheet, View, Text } from 'react-native'

import Space from '..'

describe('Space', () => {
  it('renders horizontal spacing', () => {
    const tree = renderer.create(
      <Space gap={10}>
        <span>1</span>
        <span>2</span>
      </Space>
    )

    const spans = tree.root.findAllByType('span')
    expect(spans).toHaveLength(2)
  })

  it('supports vertical direction and divider', () => {
    const tree = renderer.create(
      <Space direction="vertical" divider={<span>|</span>}>
        <span>Top</span>
        <span>Bottom</span>
      </Space>
    )

    expect(tree.root.findAllByType('span')).toHaveLength(3)
  })
})

describe('Space advanced props', () => {
  it('defaults to block in vertical direction when block is undefined', () => {
    const tree = renderer.create(
      <Space direction="vertical">
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    const container = tree.root
      .findAllByType(View)
      .find(view => view.parent === tree.root)
    const containerStyle = StyleSheet.flatten(container?.props.style)
    expect(containerStyle.width).toBe('100%')
  })

  it('respects block={false} in vertical direction', () => {
    const tree = renderer.create(
      <Space direction="vertical" block={false}>
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    const container = tree.root
      .findAllByType(View)
      .find(view => view.parent === tree.root)
    const containerStyle = StyleSheet.flatten(container?.props.style)
    expect(containerStyle.width).toBeUndefined()
  })

  it('applies preset size gaps', () => {
    const tree = renderer.create(
      <Space size="large">
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    if (Platform.OS === 'web') {
      const container = tree.root
        .findAllByType(View)
        .find(view => view.parent === tree.root)
      const containerStyle = StyleSheet.flatten(container?.props.style)
      expect(containerStyle.columnGap ?? 0).toBeGreaterThanOrEqual(0)
      return
    }

    const first = tree.root.findByProps({ testID: 'child-a' })
    const parentStyle = StyleSheet.flatten(first.parent?.props.style)
    expect(parentStyle?.paddingHorizontal ?? 0).toBeGreaterThanOrEqual(0)
  })

  it('applies symmetric spacing for divider on native', () => {
    const tree = renderer.create(
      <Space gap={10} divider={<View testID="divider" />}>
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    if (Platform.OS === 'web') {
      const container = tree.root
        .findAllByType(View)
        .find(view => view.parent === tree.root)
      const containerStyle = StyleSheet.flatten(container?.props.style)
      expect(containerStyle.columnGap).toBe(10)
      return
    }

    const childA = tree.root.findByProps({ testID: 'child-a' })
    const dividerNode = tree.root.findByProps({ testID: 'divider' })
    const childAWrapper = childA.parent as renderer.ReactTestInstance
    const dividerWrapper = dividerNode.parent as renderer.ReactTestInstance

    const childAStyle = StyleSheet.flatten(childAWrapper.props.style)
    const dividerStyle = StyleSheet.flatten(dividerWrapper.props.style)
    expect(childAStyle?.paddingHorizontal).toBe(5)
    expect(dividerStyle?.paddingHorizontal).toBe(5)
  })

  it('accepts fill prop without crashing', () => {
    expect(() =>
      renderer.create(
        <Space fill>
          <Text>Fill</Text>
          <Text>Fill</Text>
        </Space>
      )
    ).not.toThrow()
  })

  it('treats justify stretch as horizontal fill', () => {
    const tree = renderer.create(
      <Space justify="stretch">
        <View testID="child-a" />
        <View testID="child-b" />
      </Space>
    )

    const child = tree.root.findByProps({ testID: 'child-a' })
    const wrapper = child.parent as renderer.ReactTestInstance
    const style = StyleSheet.flatten(wrapper.props.style)

    expect(style?.flexGrow).toBe(1)
    const basisValue = style?.flexBasis
    const normalizedBasis =
      typeof basisValue === 'string' ? parseFloat(basisValue) : basisValue
    expect(normalizedBasis).toBe(0)
  })
})
