import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import NoticeBar from '..'

describe('NoticeBar', () => {
  it('renders text and handles close mode', () => {
    const onClose = jest.fn()
    const tree = renderer.create(
      <NoticeBar mode="closeable" text="hello" onClose={onClose} />,
    )

    const texts = tree.root.findAllByType(Text)
    const message = texts.find(node => node.props.children === 'hello')
    expect(message).toBeDefined()

    const pressables = tree.root.findAllByType(Pressable)
    const closeButton = pressables.find(node => node.props.hitSlop)
    act(() => {
      closeButton?.props.onPress?.()
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onPress when bar pressed', () => {
    const onPress = jest.fn()
    const tree = renderer.create(
      <NoticeBar text="tap" onPress={onPress} />,
    )

    const pressables = tree.root.findAllByType(Pressable)
    const rootPressable = pressables[0]
    act(() => {
      rootPressable.props.onPress?.()
    })
    expect(onPress).toHaveBeenCalled()
  })

  it('supports vertical marquee items', () => {
    const tree = renderer.create(
      <NoticeBar direction="vertical" items={['foo', 'bar']} />,
    )

    const texts = tree.root.findAllByType(Text)
    const hasFoo = texts.some(node => node.props.children === 'foo')
    expect(hasFoo).toBe(true)
  })

  it('supports non-text children', () => {
    const tree = renderer.create(
      <NoticeBar scrollable>
        <View>
          <Text>hello</Text>
        </View>
      </NoticeBar>,
    )

    const texts = tree.root.findAllByType(Text)
    const hasHello = texts.some(node => node.props.children === 'hello')
    expect(hasHello).toBe(true)
  })
})
