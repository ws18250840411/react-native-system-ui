import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import Tabbar from '..'

const { Item } = Tabbar

describe('Tabbar', () => {
  it('changes active item on press and triggers onChange', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Tabbar defaultValue="home" onChange={onChange} activeColor="#ff5500">
        <Item name="home">首页</Item>
        <Item name="me">我的</Item>
      </Tabbar>
    )

    const meItem = tree.root.findByProps({ testID: 'rv-tabbar-item-me' })

    act(() => {
      meItem.props.onPress?.({})
    })

    expect(onChange).toHaveBeenCalledWith('me', 1)

    const label = meItem.findByType(Text)
    const style = StyleSheet.flatten(label.props.style)
    expect(style?.color).toBe('#ff5500')
  })

  it('renders placeholder when fixed with placeholder flag', () => {
    const tree = renderer.create(
      <Tabbar fixed placeholder>
        <Item name="home">首页</Item>
        <Item name="me">我的</Item>
      </Tabbar>
    )

    expect(tree.root.findAllByProps({ testID: 'rv-tabbar-placeholder' }).length).toBe(1)
  })

  it('wraps content with SafeAreaView when safeAreaInsetBottom is true', () => {
    const tree = renderer.create(
      <Tabbar fixed>
        <Item name="home">首页</Item>
      </Tabbar>
    )

    expect(tree.root.findAllByType(SafeAreaView).length).toBe(1)
  })
})
