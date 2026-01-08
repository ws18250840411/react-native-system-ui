import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text, FlatList, Platform, View } from 'react-native'

import Swiper from '..'

describe('Swiper', () => {
  const originalOS = Platform.OS

  beforeEach(() => {
    jest.useFakeTimers()
    Platform.OS = 'ios'
  })

  afterEach(() => {
    jest.useRealTimers()
    Platform.OS = originalOS
  })

  it('renders children correctly', () => {
    const tree = renderer.create(
      <Swiper>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )

    // Check if FlatList is rendered (assuming Native env)
    const flatList = tree.root.findByType(FlatList)
    expect(flatList).toBeTruthy()

    // itemsData: [1, 2].
    // loop is true by default.
    // displayData: [2, 1, 2, 1] -> 4 items
    expect(flatList.props.data).toHaveLength(4)
    expect(flatList.props.nestedScrollEnabled).toBe(false)
    expect(flatList.props.directionalLockEnabled).toBe(true)
  })

  it('renders data prop correctly', () => {
    const tree = renderer.create(
      <Swiper
        data={[1, 2, 3]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    )
    const flatList = tree.root.findByType(FlatList)
    // [3, 1, 2, 3, 1] -> 5 items
    expect(flatList.props.data).toHaveLength(5)
  })

  it('autoplay triggers timer', () => {
    const tree = renderer.create(
      <Swiper autoplay={1000}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
        <Swiper.Item><Text>3</Text></Swiper.Item>
      </Swiper>
    )

    expect(jest.getTimerCount()).toBeGreaterThan(0)
  })

  it('disables loop when not enough items', () => {
    const tree = renderer.create(
      <Swiper>
        <Swiper.Item><Text>1</Text></Swiper.Item>
      </Swiper>
    )
    const flatList = tree.root.findByType(FlatList)
    // 1 item -> no loop -> 1 item
    expect(flatList.props.data).toHaveLength(1)
  })

  it('renders custom indicator', () => {
    const tree = renderer.create(
      <Swiper indicator={() => <Text testID="custom-indicator">Indicator</Text>}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )
    expect(tree.root.findByProps({ testID: 'custom-indicator' })).toBeTruthy()
  })

  it('allows nested scrolling when preventScroll=false', () => {
    const tree = renderer.create(
      <Swiper preventScroll={false}>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )
    const flatList = tree.root.findByType(FlatList)
    expect(flatList.props.nestedScrollEnabled).toBe(true)
    expect(flatList.props.directionalLockEnabled).toBe(false)
  })

  it('stuckAtBoundary adjusts snapToOffsets in non-loop mode', () => {
    const tree = renderer.create(
      <Swiper
        testID="stuck-swiper"
        loop={false}
        slideSize={80}
        trackOffset={10}
        stuckAtBoundary
      >
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )

    const container = tree.root
      .findAllByType(View)
      .find((node) => node.props.testID === 'stuck-swiper')
    expect(container).toBeTruthy()
    expect(container!.props.onLayout).toBeInstanceOf(Function)

    act(() => {
      container!.props.onLayout({
        nativeEvent: { layout: { width: 200, height: 100 } },
      })
    })

    const flatList = tree.root.findByType(FlatList)
    expect(flatList.props.snapToOffsets).toEqual([20, 140])
  })
})
