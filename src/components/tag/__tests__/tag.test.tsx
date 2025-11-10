import React from 'react'
import renderer from 'react-test-renderer'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Tag from '..'

describe('Tag', () => {
  it('renders solid tags with themed colors', () => {
    const tree = renderer.create(<Tag type="primary">标签</Tag>)
    const text = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(text.props.style)

    expect(text.props.children).toBe('标签')
    expect(textStyle.color).toBeDefined()
  })

  it('renders plain tags with custom colors', () => {
    const tree = renderer.create(
      <Tag plain color="#123456" textColor="#654321">
        Plain
      </Tag>
    )

    const container = tree.root.findByType(View)
    const style = StyleSheet.flatten(container.props.style)

    expect(style.borderColor).toBe('#123456')
    const text = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.color).toBe('#654321')
  })

  it('fires onClose when close icon is pressed', () => {
    const onClose = jest.fn()
    const tree = renderer.create(
      <Tag closeable onClose={onClose}>
        Close Me
      </Tag>
    )

    const closeButton = tree.root.findByType(Pressable)
    closeButton.props.onPress({ stopPropagation: jest.fn() })
    expect(onClose).toHaveBeenCalled()
  })

  it('honors round size styles when interactive', () => {
    const tree = renderer.create(
      <Tag round size="large" onPress={() => {}}>
        Round
      </Tag>
    )

    const pressable = tree.root.findByType(Pressable)
    const style = pressable.props.style({ pressed: false })
    const flattened = StyleSheet.flatten(style)

    expect(flattened.borderRadius).toBeGreaterThan(10)
  })
})
