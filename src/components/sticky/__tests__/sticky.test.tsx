import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Animated, StyleSheet, Text, View } from 'react-native'

import Sticky from '..'

describe('Sticky', () => {
  it('applies fixed styles when scroll exceeds offset', () => {
    const scrollValue = new Animated.Value(0)
    const onChange = jest.fn()

    const tree = renderer.create(
      <Sticky scrollValue={scrollValue} offsetTop={12} onChange={onChange}>
        <Text>导航</Text>
      </Sticky>
    )

    const [container, content] = tree.root.findAllByType(View)

    act(() => {
      content.props.onLayout?.({
        nativeEvent: { layout: { x: 0, y: 64, width: 320, height: 48 } },
      } as any)
    })

    act(() => {
      scrollValue.setValue(150)
    })

    const stickyContent = tree.root.findAllByType(View)[1]
    const contentStyle = StyleSheet.flatten(stickyContent.props.style)
    const containerStyle = StyleSheet.flatten(container.props.style)

    expect(contentStyle.position).toBe('absolute')
    expect(contentStyle.top).toBe(12)
    expect(containerStyle.height).toBe(48)
    expect(onChange).toHaveBeenCalledWith(true)

    act(() => {
      scrollValue.setValue(0)
    })

    const updatedContent = tree.root.findAllByType(View)[1]
    const updatedStyle = StyleSheet.flatten(updatedContent.props.style)
    expect(updatedStyle.position).toBeUndefined()
    expect(onChange).toHaveBeenLastCalledWith(false)
  })

  it('renders as a normal container when scrollValue is not provided', () => {
    const tree = renderer.create(
      <Sticky>
        <Text>内容</Text>
      </Sticky>
    )

    const content = tree.root.findAllByType(View)[1]
    const style = StyleSheet.flatten(content.props.style)
    expect(style.position).toBeUndefined()
  })
})
