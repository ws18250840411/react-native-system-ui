import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

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

  it('supports vertical marquee items', () => {
    const tree = renderer.create(
      <NoticeBar direction="vertical" items={['foo', 'bar']} />,
    )

    const texts = tree.root.findAllByType(Text)
    const hasFoo = texts.some(node => node.props.children === 'foo')
    expect(hasFoo).toBe(true)
  })
})
