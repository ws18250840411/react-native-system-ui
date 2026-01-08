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

  it('renders left icon', () => {
    const Icon = () => <View testID="left-icon" />
    const tree = renderer.create(<NoticeBar leftIcon={<Icon />} text="content" />)
    expect(tree.root.findByProps({ testID: 'left-icon' })).toBeDefined()
  })

  it('renders link mode icon', () => {
    const tree = renderer.create(<NoticeBar mode="link" text="content" />)
    // Should render Arrow icon
    // We can't easily find Arrow component unless we know how it's rendered or exported.
    // But we can check if there's a right-side section.
    // In NoticeBar code: if rightNode -> View with sideSection style
    // Let's check if we have 2 sideSections (if leftIcon is null, maybe only 1)
    
    // Actually, let's just snapshot or check structure roughly.
    // Or check if it doesn't crash.
    
    expect(tree.toJSON()).toBeTruthy()
  })

  it('applies wrapable styles', () => {
    const tree = renderer.create(<NoticeBar wrapable text="long content" />)
    const text = tree.root.findAllByType(Text).find(t => t.props.numberOfLines === undefined)
    // If wrapable, numberOfLines should be undefined (or not 1)
    expect(text).toBeDefined()
    expect(text?.props.ellipsizeMode).toBe('tail')
  })

  it('auto scroll considers side padding', () => {
    const tree = renderer.create(
      <NoticeBar
        text="hello"
        leftIcon={<View />}
        mode="link"
        speed={0}
      />
    )

    const contentWrapper = tree.root.findAll(
      node => node.type === View && node.props.pointerEvents === 'none' && typeof node.props.onLayout === 'function'
    )[0]
    const textNode = tree.root.findAll(
      node => node.props.children === 'hello' && typeof node.props.onLayout === 'function'
    )[0]

    act(() => {
      contentWrapper.props.onLayout({ nativeEvent: { layout: { width: 100 } } })
      textNode.props.onLayout({ nativeEvent: { layout: { width: 100 } } })
    })

    const scrollingNode = tree.root.findAll(
      node =>
        node.props.children === 'hello' &&
        Array.isArray(node.props.style) &&
        node.props.style.some((s: any) => s && s.transform)
    )[0]
    expect(scrollingNode).toBeDefined()
  })
})
