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

    expect(left.props.accessibilityLabel).toBe('返回')
    expect(right.props.accessibilityLabel).toBe('完成')

    act(() => {
      left.props.onPress?.({})
      right.props.onPress?.({})
    })

    expect(onPressLeft).toHaveBeenCalledTimes(1)
    expect(onPressRight).toHaveBeenCalledTimes(1)

    const texts = tree.root.findAllByType(Text)
    expect(texts.some(node => node.props.children === '标题')).toBe(true)
  })

  it('renders 0 for title and side text', () => {
    const tree = renderer.create(
      <NavBar title={0} leftArrow={false} leftText={0} rightText={0} />
    )

    expect(tree.root.findByProps({ testID: 'rv-navbar-left' })).toBeDefined()
    expect(tree.root.findByProps({ testID: 'rv-navbar-right' })).toBeDefined()

    const zeros = tree.root.findAllByType(Text).filter(node => node.props.children === 0)
    expect(zeros).toHaveLength(3)
  })

  it('renders placeholder when fixed', () => {
    const tree = renderer.create(<NavBar fixed placeholder title="Nav" />)
    expect(tree.root.findAllByProps({ testID: 'rv-navbar-placeholder' }).length).toBe(1)
  })

  it('applies tint color', () => {
    const tree = renderer.create(<NavBar title="Title" leftArrow tintColor="red" />)
    const title = tree.root.findAllByType(Text).find(node => node.props.children === 'Title')
    expect(title).toBeDefined()
    const titleStyle = title!.props.style
    // style is array
    const flatStyle = Object.assign({}, ...[].concat(titleStyle))
    expect(flatStyle.color).toBe('red')
  })
})
