import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import SwipeCell, { type SwipeCellRef } from '..'

describe('SwipeCell', () => {
  it('renders content and action slots', () => {
    const tree = renderer.create(
      <SwipeCell
        left={<View />}
        right={<View />}
      >
        <Text>content</Text>
      </SwipeCell>
    )
    expect(tree.toJSON()).toBeTruthy()
  })

  it('captures horizontal swipes on the root container', () => {
    const tree = renderer.create(
      <SwipeCell
        left={<View />}
        right={<View />}
      >
        <Text>content</Text>
      </SwipeCell>
    )

    // Check if PanResponder handlers are attached
    const root = tree.root.findByType(View)
    // The root View has panHandlers spread onto it
    expect(root.props.onMoveShouldSetResponder).toBeDefined()
    expect(root.props.onResponderGrant).toBeDefined()
  })

  it('exposes open/close methods via ref', () => {
    const ref = React.createRef<SwipeCellRef>()
    const onOpen = jest.fn()
    const onClose = jest.fn()

    renderer.create(
      <SwipeCell
        ref={ref}
        leftWidth={100}
        rightWidth={100}
        left={<View />}
        right={<View />}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Text>content</Text>
      </SwipeCell>
    )

    expect(ref.current).toBeTruthy()

    act(() => {
      ref.current?.open('left')
    })
    // Animation takes time, but in test renderer without fake timers, 
    // Animated might run synchronously if mocked or might need advance.
    // Assuming standard RN mock for Animated:
    
    // We can't easily verify animation completion without fake timers
    // But we can verify method calls didn't crash
  })
  
  it('calls callbacks when opened/closed via ref', () => {
    jest.useFakeTimers()
    const ref = React.createRef<SwipeCellRef>()
    const onOpen = jest.fn()
    const onClose = jest.fn()
    const onChange = jest.fn()

    renderer.create(
      <SwipeCell
        ref={ref}
        leftWidth={100}
        rightWidth={100}
        left={<View />}
        right={<View />}
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
      >
        <Text>content</Text>
      </SwipeCell>
    )

    act(() => {
      ref.current?.open('left')
      jest.advanceTimersByTime(200) // default duration 180
    })

    expect(onOpen).toHaveBeenCalledWith('left')
    expect(onChange).toHaveBeenCalledWith('left')

    act(() => {
      ref.current?.close()
      jest.advanceTimersByTime(200)
    })

    expect(onClose).toHaveBeenCalledWith('left')
    expect(onChange).toHaveBeenCalledWith('closed')
    
    jest.useRealTimers()
  })
})
