import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native'

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

  it('does not capture swipes towards missing side when closed', () => {
    const originalCreate = PanResponder.create
    let capturedConfig: any = null
    const spy = jest.spyOn(PanResponder, 'create').mockImplementation((config: any) => {
      capturedConfig = config
      return originalCreate(config)
    })

    renderer.create(
      <SwipeCell right={<View />} rightWidth={80}>
        <Text>content</Text>
      </SwipeCell>
    )

    expect(capturedConfig).toBeTruthy()
    expect(capturedConfig.onMoveShouldSetPanResponder({}, { dx: 10, dy: 0 })).toBe(false) // 右滑，但没有 left
    expect(capturedConfig.onMoveShouldSetPanResponder({}, { dx: -10, dy: 0 })).toBe(true) // 左滑，展示 right

    spy.mockRestore()
  })

  it('captures swipes while opened so it can be closed', () => {
    jest.useFakeTimers()
    const ref = React.createRef<SwipeCellRef>()

    const originalCreate = PanResponder.create
    let capturedConfig: any = null
    const spy = jest.spyOn(PanResponder, 'create').mockImplementation((config: any) => {
      capturedConfig = config
      return originalCreate(config)
    })

    renderer.create(
      <SwipeCell ref={ref} right={<View />} rightWidth={80}>
        <Text>content</Text>
      </SwipeCell>
    )

    act(() => {
      ref.current?.open('right')
      jest.advanceTimersByTime(200)
    })

    expect(capturedConfig).toBeTruthy()
    expect(capturedConfig.onMoveShouldSetPanResponder({}, { dx: 10, dy: 0 })).toBe(true)

    spy.mockRestore()
    jest.useRealTimers()
  })

  it('closes when content is pressed after opened', () => {
    jest.useFakeTimers()
    const ref = React.createRef<SwipeCellRef>()
    const onChange = jest.fn()

    const tree = renderer.create(
      <SwipeCell ref={ref} right={<View />} rightWidth={80} onChange={onChange}>
        <Text>content</Text>
      </SwipeCell>
    )

    act(() => {
      ref.current?.open('right')
      jest.advanceTimersByTime(200)
    })

    const overlay = tree.root.findByType(Pressable)
    act(() => {
      overlay.props.onPress?.()
      jest.advanceTimersByTime(200)
    })

    expect(onChange).toHaveBeenCalledWith('closed')

    jest.useRealTimers()
  })

  it('closes when action area is tapped after opened', () => {
    jest.useFakeTimers()
    const ref = React.createRef<SwipeCellRef>()
    const onChange = jest.fn()

    const tree = renderer.create(
      <SwipeCell ref={ref} right={<View />} rightWidth={80} onChange={onChange}>
        <Text>content</Text>
      </SwipeCell>
    )

    act(() => {
      ref.current?.open('right')
      jest.advanceTimersByTime(200)
    })

    const rightActionContainer = tree.root
      .findAllByType(View)
      .find((node) => StyleSheet.flatten(node.props.style as any)?.alignItems === 'flex-end')

    expect(rightActionContainer).toBeTruthy()

    act(() => {
      rightActionContainer?.props.onTouchStart?.({ nativeEvent: { pageX: 100, pageY: 100 } })
      rightActionContainer?.props.onTouchEnd?.({ nativeEvent: { pageX: 100, pageY: 100 } })
      jest.advanceTimersByTime(0)
      jest.advanceTimersByTime(200)
    })

    expect(onChange).toHaveBeenLastCalledWith('closed')

    jest.useRealTimers()
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

  it('falls back when duration is non-finite', () => {
    jest.useFakeTimers()
    const ref = React.createRef<SwipeCellRef>()
    const onOpen = jest.fn()

    renderer.create(
      <SwipeCell
        ref={ref}
        rightWidth={100}
        right={<View />}
        duration={Number.NaN as any}
        onOpen={onOpen}
      >
        <Text>content</Text>
      </SwipeCell>,
    )

    act(() => {
      ref.current?.open('right')
      jest.advanceTimersByTime(200)
    })

    expect(onOpen).toHaveBeenCalledWith('right')
    jest.useRealTimers()
  })
})
