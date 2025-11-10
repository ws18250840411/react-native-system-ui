import React from 'react'
import renderer from 'react-test-renderer'
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
    const closeButton = pressables.find(node => node.props.onPress === onClose)
    closeButton?.props.onPress?.()
    expect(onClose).toHaveBeenCalled()
  })
})
