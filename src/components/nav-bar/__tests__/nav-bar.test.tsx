import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { SafeAreaView, Text } from 'react-native'

import NavBar from '..'

describe('NavBar', () => {
  it('renders title and triggers left/right handlers', () => {
    const onPressLeft = jest.fn()
    const onPressRight = jest.fn()

    const tree = renderer.create(
      <NavBar title="标题" leftText="返回" rightText="完成" onPressLeft={onPressLeft} onPressRight={onPressRight} />
    )

    const left = tree.root.findByProps({ testID: 'rv-navbar-left' })
    const right = tree.root.findByProps({ testID: 'rv-navbar-right' })

    act(() => {
      left.props.onPress?.({})
      right.props.onPress?.({})
    })

    expect(onPressLeft).toHaveBeenCalledTimes(1)
    expect(onPressRight).toHaveBeenCalledTimes(1)

    const texts = tree.root.findAllByType(Text)
    expect(texts.some(node => node.props.children === '标题')).toBe(true)
  })

  it('renders placeholder when fixed', () => {
    const tree = renderer.create(<NavBar fixed placeholder title="Nav" />)
    expect(tree.root.findAllByProps({ testID: 'rv-navbar-placeholder' }).length).toBe(1)
  })

  it('applies SafeAreaView when safeAreaInsetTop is true', () => {
    const tree = renderer.create(<NavBar fixed />)
    expect(tree.root.findAllByType(SafeAreaView).length).toBe(1)
  })
})
