import React from 'react'
import renderer from 'react-test-renderer'
import { Platform, StyleSheet, Text, View } from 'react-native'

import Flex from '..'

describe('Flex', () => {
  it('applies gutter spacing to items', () => {
    const originalOS = Platform.OS
    Object.defineProperty(Platform, 'OS', { get: () => 'ios', configurable: true })

    const tree = renderer.create(
      <Flex gutter={16}>
        <Flex.Item>
          <Text>one</Text>
        </Flex.Item>
        <Flex.Item>
          <Text>two</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemViews = views.slice(1)
    const style = StyleSheet.flatten(itemViews[0].props.style)
    expect(style.paddingHorizontal).toBe(8)

    Object.defineProperty(Platform, 'OS', { get: () => originalOS, configurable: true })
  })

  it('calculates width based on span', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item span={12}>
          <Text>half</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemView = views[1]
    const style = StyleSheet.flatten(itemView.props.style)
    expect(style.width).toBe('50%')
  })

  it('supports string flex shorthand keywords', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item flex="auto">
          <Text>auto</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemView = views[1]
    const style = StyleSheet.flatten(itemView.props.style)
    expect(style.flexGrow).toBe(1)
    expect(style.flexShrink).toBe(1)
    expect(style.flexBasis).toBe('auto')
  })

  it('parses flex grow/shrink/basis strings', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item flex="2 1 120px">
          <Text>basis</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemView = views[1]
    const style = StyleSheet.flatten(itemView.props.style)
    expect(style.flexGrow).toBe(2)
    expect(style.flexShrink).toBe(1)
    expect(style.flexBasis).toBe(120)
  })

  it('renders nothing when span is 0 or negative', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item span={0}>
          <Text>zero</Text>
        </Flex.Item>
        <Flex.Item span={-1}>
          <Text>negative</Text>
        </Flex.Item>
        <Flex.Item>
          <Text>visible</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    // The main container View plus one child View (for 'visible')
    // 'zero' and 'negative' items should return null
    // views[0] is container
    // views[1] is Flex.Item wrapper
    expect(views.length).toBe(2)
    const textNodes = tree.root.findAllByType(Text)
    expect(textNodes.length).toBe(1)
    expect(textNodes[0].props.children).toBe('visible')
  })

  it('handles invalid flex strings gracefully', () => {
    const tree = renderer.create(
      <Flex>
        <Flex.Item flex="invalid-flex-string">
          <Text>invalid</Text>
        </Flex.Item>
      </Flex>
    )

    const views = tree.root.findAllByType(View)
    const itemView = views[1]
    const style = StyleSheet.flatten(itemView.props.style)
    
    // Should not have flex properties set
    expect(style.flex).toBeUndefined()
    expect(style.flexGrow).toBeUndefined()
    expect(style.flexShrink).toBeUndefined()
  })

  it('uses gap on web instead of padding/margins', () => {
    const originalOS = Platform.OS
    Object.defineProperty(Platform, 'OS', { get: () => 'web', configurable: true })

    try {
      const tree = renderer.create(
        <Flex gutter={[16, 12]}>
          <Flex.Item>
            <Text>one</Text>
          </Flex.Item>
          <Flex.Item>
            <Text>two</Text>
          </Flex.Item>
        </Flex>
      )

      const views = tree.root.findAllByType(View)
      const containerStyle = StyleSheet.flatten(views[0].props.style)
      expect(containerStyle.columnGap).toBe(16)
      expect(containerStyle.rowGap).toBe(12)
      expect(containerStyle.marginHorizontal).toBeUndefined()
      expect(containerStyle.marginVertical).toBeUndefined()

      const itemStyle = StyleSheet.flatten(views[1].props.style)
      expect(itemStyle.paddingHorizontal).toBeUndefined()
      expect(itemStyle.paddingVertical).toBeUndefined()
    } finally {
      Object.defineProperty(Platform, 'OS', { get: () => originalOS, configurable: true })
    }
  })
})
