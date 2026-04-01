import React from 'react'
import renderer, { act } from 'react-test-renderer'
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

  it('uses default tone colors when type is omitted', () => {
    const tree = renderer.create(<Tag>默认</Tag>)

    const container = tree.root.findByType(View)
    const style = StyleSheet.flatten(container.props.style)
    expect(style.backgroundColor).toBe('#888f9f')

    const text = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.color).toBe('#ffffff')
  })

  it('renders plain tags with custom colors', () => {
    const tree = renderer.create(
      <Tag plain color="#123456" textColor="#654321">
        Plain
      </Tag>
    )

    const views = tree.root.findAllByType(View)
    const hairline = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s?.borderColor !== undefined
    })
    expect(hairline).toBeDefined()
    const hairlineStyle = StyleSheet.flatten(hairline!.props.style)
    expect(hairlineStyle.borderColor).toBe('#123456')

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

  it('fires onPress when tag is pressed', () => {
    const onPress = jest.fn()
    const tree = renderer.create(<Tag onPress={onPress}>Press Me</Tag>)
    const container = tree.root.findByType(Pressable)

    act(() => {
      container.props.onPress?.({})
    })

    expect(onPress).toHaveBeenCalled()
  })

  it('does not bubble press from close icon to tag', () => {
    const onPress = jest.fn()
    const onClose = jest.fn()
    const tree = renderer.create(
      <Tag closeable onPress={onPress} onClose={onClose}>
        Both
      </Tag>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const closeButton = pressables[1]

    act(() => {
      closeButton.props.onPress?.({ stopPropagation: jest.fn() })
    })

    expect(onClose).toHaveBeenCalled()
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders mark style', () => {
    const tree = renderer.create(<Tag mark>Mark</Tag>)
    const container = tree.root.findByType(View)
    const style = StyleSheet.flatten(container.props.style)
    
    
    
    expect(style.borderTopLeftRadius).toBe(0)
    expect(style.borderBottomLeftRadius).toBe(0)
    expect(style.borderTopRightRadius).toBeGreaterThan(10)
  })

  it('renders different sizes', () => {
    const tree = renderer.create(<Tag size="large">Large</Tag>)
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    
    expect(style.fontSize).toBe(14)
  })

  it('supports custom close icon', () => {
    const tree = renderer.create(
      <Tag closeable closeIcon={<View testID="custom-close" />}>
        Tag
      </Tag>
    )
    expect(tree.root.findByProps({ testID: 'custom-close' })).toBeDefined()
  })

  it('supports custom close icon render function', () => {
    const tree = renderer.create(
      <Tag 
        closeable 
        closeIcon={(_color, size) => <View testID="func-close" style={{ width: size }} />} 
      >
        Tag
      </Tag>
    )
    expect(tree.root.findByProps({ testID: 'func-close' })).toBeDefined()
  })
})
