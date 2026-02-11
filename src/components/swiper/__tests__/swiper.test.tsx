var mockScrollToIndex: jest.Mock

jest.mock('react-native', () => {
  const React = require('react')
  const actual = jest.requireActual('react-native')
  mockScrollToIndex = jest.fn()
  const { forwardRef, useImperativeHandle } = React
  const FlatList = forwardRef((_props: any, ref: any) => {
    useImperativeHandle(ref, () => ({ scrollToIndex: mockScrollToIndex }))
    return null
  })
  FlatList.displayName = 'FlatList'
  return { ...actual, FlatList }
})

import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text, FlatList, Platform } from 'react-native'

import Swiper from '..'

describe('Swiper', () => {
  const originalOS = Platform.OS

  beforeEach(() => {
    jest.useFakeTimers()
    Platform.OS = 'ios'
    mockScrollToIndex.mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
    Platform.OS = originalOS
  })

  it.skip('renders children correctly', () => {
    const tree = renderer.create(
      <Swiper loop={false}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )

    const flatList = tree.root.findByType(FlatList)
    expect(flatList).toBeTruthy()
    expect(flatList.props.data).toHaveLength(2)
  })

  it.skip('renders loop data correctly', () => {
    const tree = renderer.create(
      <Swiper
        loop
        data={[1, 2, 3]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    )
    const flatList = tree.root.findByType(FlatList)
    expect(flatList).toBeTruthy()
    expect(flatList.props.data).toHaveLength(5)
  })

  it('autoplay schedules timer', () => {
    const tree = renderer.create(
      <Swiper autoplay={1000}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
        <Swiper.Item><Text>3</Text></Swiper.Item>
      </Swiper>
    )

    expect(jest.getTimerCount()).toBeGreaterThan(0)
    act(() => {
      tree.unmount()
    })
  })

  it.skip('swipeNext wraps in loop mode', () => {
    const swiperRef = React.createRef<any>()
    renderer.create(
      <Swiper ref={swiperRef} loop initialSwipe={2}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
        <Swiper.Item><Text>3</Text></Swiper.Item>
      </Swiper>
    )

    act(() => {
      swiperRef.current?.swipeNext()
    })

    expect(mockScrollToIndex).toHaveBeenCalledWith({ index: 4, animated: true })
  })

  it.skip('swipePrev wraps in loop mode', () => {
    const swiperRef = React.createRef<any>()
    renderer.create(
      <Swiper ref={swiperRef} loop initialSwipe={0}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
        <Swiper.Item><Text>3</Text></Swiper.Item>
      </Swiper>
    )

    act(() => {
      swiperRef.current?.swipePrev()
    })

    expect(mockScrollToIndex).toHaveBeenCalledWith({ index: 0, animated: true })
  })

  /**
   * Bug reproduction: On web, after CSS scroll-snap completes, the last onScroll
   * event often has a scroll offset that differs from the exact page boundary by
   * more than 0.5px. The current alignment check `Math.abs(off - aligned) < 0.5`
   * fails, so reset() is never called → animRef stays true → subsequent swipeTo
   * calls just queue → the swiper gets stuck.
   */
  it('[web] swiper gets stuck when onScroll offset is not perfectly aligned', () => {
    Platform.OS = 'web'

    const tree = renderer.create(
      <Swiper loop autoplay={1000}>
        <Swiper.Item><Text>A</Text></Swiper.Item>
        <Swiper.Item><Text>B</Text></Swiper.Item>
        <Swiper.Item><Text>C</Text></Swiper.Item>
      </Swiper>
    )

    // Step 1: Trigger onLayout so Swiper becomes "ready" and renders FlatList
    const layoutNode = tree.root.findAll(
      node => node.props && typeof node.props.onLayout === 'function'
    )[0]
    act(() => {
      layoutNode.props.onLayout({
        nativeEvent: { layout: { width: 300, height: 160 } }
      })
    })

    // Clear the initial scrollToIndex from the layout effect
    mockScrollToIndex.mockClear()

    // Step 2: Advance timer 1000ms → autoplay fires → swipeTo(1, true)
    //   → animRef.current = true
    //   → scrollToIndex({ index: 2, animated: true })  [dispIdx(1) = 2 in loop mode]
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(mockScrollToIndex).toHaveBeenCalledTimes(1)
    mockScrollToIndex.mockClear()

    // Step 3: Simulate onScroll with offset NOT perfectly aligned
    // mainSz=300, target display index 2 → aligned offset = 600
    // But CSS scroll-snap reports 597.8 → |597.8 - 600| = 2.2 > 0.5
    // → alignment check FAILS → reset() NOT called → animRef stays true
    const scrollNode = tree.root.findAll(
      node => node.props && typeof node.props.onScroll === 'function'
    )[0]
    act(() => {
      scrollNode.props.onScroll({
        nativeEvent: { contentOffset: { x: 597.8, y: 0 } }
      })
    })

    // Step 4: The fix adds a 150ms fallback timer when alignment fails.
    // Advance 150ms → fallback fires → reset() → animRef cleared
    // Then advance 1000ms → autoplay fires → swipeTo succeeds
    act(() => {
      jest.advanceTimersByTime(150) // fallback scroll-end timer
    })
    act(() => {
      jest.advanceTimersByTime(1000) // autoplay interval
    })

    // EXPECTED (correct behavior): autoplay should work → scrollToIndex called
    // ACTUAL (bug without fix): animRef stuck at true → swipeTo queues → NOT called
    //
    // This test FAILS with the original code, proving the bug exists.
    // After applying the fix, it PASSES.
    expect(mockScrollToIndex).toHaveBeenCalled()

    act(() => { tree.unmount() })
  })
})
