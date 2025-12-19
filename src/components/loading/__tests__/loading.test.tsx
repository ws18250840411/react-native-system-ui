import React from 'react'
import renderer from 'react-test-renderer'
import { ActivityIndicator, Text, View } from 'react-native'

import Loading from '..'

describe('Loading', () => {
  it('renders circular indicator with text', () => {
    const tree = renderer.create(<Loading size={20}>加载中</Loading>)
    expect(() => tree.root.findByType(ActivityIndicator)).not.toThrow()
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('加载中')
  })

  it('accepts non-text children', () => {
    const tree = renderer.create(
      <Loading>
        <View testID="loading-custom" />
      </Loading>,
    )
    expect(tree.root.findByProps({ testID: 'loading-custom' })).toBeTruthy()
  })

  it('renders spinner type', () => {
    const tree = renderer.create(<Loading type="spinner" size={24} />)
    const lines = tree.root.findAll(
      node =>
        node.type === View &&
        Array.isArray(node.props.style) &&
        node.props.style.some((item: any) => item?.position === 'absolute'),
    )
    expect(lines.length).toBeGreaterThanOrEqual(12)
  })
})
