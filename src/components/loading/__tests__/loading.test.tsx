import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import Loading from '..'

describe('Loading', () => {
  it('renders spinner indicator with text', () => {
    const tree = renderer.create(<Loading size={20}>加载中</Loading>)
    const spinner = tree.root.findByProps({ testID: 'rv-loading-spinner' })
    expect(spinner).toBeTruthy()
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

  it('supports vertical prop', () => {
    const tree = renderer.create(<Loading vertical>Vertical</Loading>)
    const root = tree.root.findByType(View)
    const style = root.props.style
    const flexDirection = Array.isArray(style)
      ? style.find(s => s?.flexDirection)?.flexDirection
      : style?.flexDirection

    expect(flexDirection).toBe('column')
  })
})
