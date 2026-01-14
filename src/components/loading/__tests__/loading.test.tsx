import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import Loading from '..'

describe('Loading', () => {
  it('renders circular indicator with text', () => {
    const tree = renderer.create(<Loading size={20}>加载中</Loading>)
    const circular = tree.root.findByProps({ testID: 'rv-loading-circular' })
    expect(circular).toBeTruthy()
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
    const spinner = tree.root.findByProps({ testID: 'rv-loading-spinner' })
    expect(spinner).toBeTruthy()
  })

  it('renders ball type', () => {
    const tree = renderer.create(<Loading type="ball" size={24} />)
    const ball = tree.root.findByProps({ testID: 'rv-loading-ball' })
    expect(ball).toBeTruthy()
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
