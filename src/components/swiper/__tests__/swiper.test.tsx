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

  it('renders children correctly', () => {
    const tree = renderer.create(
      <Swiper>
        <Swiper.Item><Text>1</Text></Swiper.Item>
        <Swiper.Item><Text>2</Text></Swiper.Item>
      </Swiper>
    )

    const flatList = tree.root.findByType(FlatList)
    expect(flatList).toBeTruthy()
    expect(flatList.props.data).toHaveLength(2)
  })

  it('renders loop data correctly', () => {
    const tree = renderer.create(
      <Swiper
        loop
        data={[1, 2, 3]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    )
    const flatList = tree.root.findByType(FlatList)
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
    tree.unmount()
  })

  it('swipeNext wraps in loop mode', () => {
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

  it('swipePrev wraps in loop mode', () => {
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
})
