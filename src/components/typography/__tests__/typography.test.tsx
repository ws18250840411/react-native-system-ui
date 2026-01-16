import React from 'react'
import { Linking, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native'
import renderer, { act } from 'react-test-renderer'

import Typography from '..'

describe('Typography', () => {
  let openURLSpy: jest.SpyInstance

  beforeEach(() => {
    openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined as never)
  })

  afterEach(() => {
    openURLSpy.mockRestore()
  })

  it('applies type colors and strong weight', () => {
    const tree = renderer.create(
      <Typography.Text type="primary" strong>
        文字
      </Typography.Text>,
    )
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    expect(style.color).toBeTruthy()
    expect(style.fontWeight).toBeTruthy()
  })

  it('renders titles with level mapping', () => {
    const tree = renderer.create(
      <Typography.Title level={2}>标题</Typography.Title>,
    )
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    expect(style.fontSize).toBe(26)
  })

  it('shows expand action when ellipsis detects truncation', () => {
    const tree = renderer.create(
      <Typography.Text ellipsis={{ rows: 1, expandText: '展开', collapseText: '收起' }}>
        这是一段很长的描述文字，需要多行展示
      </Typography.Text>,
    )

    const textNode = tree.root.findAllByType(Text)[0]
    act(() => {
      textNode.props.onTextLayout?.({
        nativeEvent: {
          lines: [{ text: 'line1' }, { text: 'line2' }],
        },
      })
    })

    const action = tree.root.findAllByType(Text).find(node => node.props.children === '展开')
    expect(action).toBeDefined()
  })

  it('opens link when href provided', () => {
    const tree = renderer.create(
      <Typography.Link href="https://example.com">Link</Typography.Link>,
    )

    const text = tree.root.findByType(Text)

    act(() => {
      text.props.onPress?.({} as unknown as GestureResponderEvent)
    })

    expect(openURLSpy).toHaveBeenCalledWith('https://example.com')
  })

  it('supports color override', () => {
    const tree = renderer.create(
      <Typography.Text color="#ff0000">文字</Typography.Text>,
    )
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    expect(style.color).toBe('#ff0000')
  })

  it('renders different sizes', () => {
    const tree = renderer.create(<Typography size="xl">Extra Large</Typography>)
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    // xl size corresponds to fontSize.xl in tokens (usually 20 or similar, verify logic)
    expect(style.fontSize).toBeDefined()
  })

  it('applies decoration styles', () => {
    const tree = renderer.create(
      <Typography underline delete>
        Decorated
      </Typography>
    )
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    expect(style.textDecorationLine).toContain('underline')
    expect(style.textDecorationLine).toContain('line-through')
  })

  it('handles disabled state', () => {
    const tree = renderer.create(<Typography disabled>Disabled</Typography>)
    const text = tree.root.findByType(Text)
    const style = StyleSheet.flatten(text.props.style)
    expect(style.opacity).toBeLessThan(1)
  })

  it('centers text', () => {
    const tree = renderer.create(<Typography center>Centered</Typography>)
    // When center is true, it wraps in a View with alignItems: center
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.alignItems).toBe('center')
  })

  it('handles onPress', () => {
    const onPress = jest.fn()
    const tree = renderer.create(
      <Typography onPress={onPress}>Press Me</Typography>
    )
    const text = tree.root.findByType(Text)
    text.props.onPress({} as unknown as GestureResponderEvent)
    expect(onPress).toHaveBeenCalled()
  })
})
