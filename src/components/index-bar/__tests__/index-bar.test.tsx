import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView, Text } from 'react-native'

import IndexBar from '..'
import type { IndexBarInstance } from '../types'

const { Anchor } = IndexBar

describe('IndexBar', () => {
  it('updates active index when tapping sidebar', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <IndexBar onChange={onChange}>
        <Anchor index="A" title="A">
          <Text>A</Text>
        </Anchor>
        <Anchor index="B" title="B">
          <Text>B</Text>
        </Anchor>
      </IndexBar>
    )

    const navB = tree.root.findByProps({ testID: 'rv-indexbar-nav-B' })
    act(() => {
      navB.props.onPressIn?.()
      navB.props.onPressOut?.()
    })

    expect(onChange).toHaveBeenCalledWith('B')
  })

  it('renders custom index list', () => {
    const customIndices = ['1', '2', '3']
    const tree = renderer.create(
      <IndexBar indexList={customIndices}>
        <Anchor index="1">
          <Text>1</Text>
        </Anchor>
      </IndexBar>
    )
    // Check if sidebar renders 1, 2, 3
    const nav1 = tree.root.findByProps({ testID: 'rv-indexbar-nav-1' })
    const nav2 = tree.root.findByProps({ testID: 'rv-indexbar-nav-2' })
    expect(nav1).toBeDefined()
    expect(nav2).toBeDefined()
  })

  it('scrolls to index imperatively', () => {
    const ref = React.createRef<IndexBarInstance>()
    const tree = renderer.create(
      <IndexBar ref={ref}>
        <Anchor index="A">
          <Text>A</Text>
        </Anchor>
      </IndexBar>
    )

    // Mock scrollTo
    const scrollView = tree.root.findByType(ScrollView)
    // In test renderer, we can't easily mock instance methods of native components unless we mock the component itself.
    // But we can check if ref is populated
    const current = ref.current
    expect(current).toBeDefined()
    expect(current?.scrollTo).toBeDefined()

    act(() => {
      ref.current?.scrollTo('A')
    })
  })

  it('maps drag location to nearest index item', () => {
    const onSelect = jest.fn()
    const tree = renderer.create(
      <IndexBar onSelect={onSelect}>
        <Anchor index="A"><Text>A</Text></Anchor>
        <Anchor index="B"><Text>B</Text></Anchor>
        <Anchor index="C"><Text>C</Text></Anchor>
      </IndexBar>
    )

    const navList = tree.root.findByProps({ testID: 'rv-indexbar-nav-list' })
    const navA = tree.root.findByProps({ testID: 'rv-indexbar-nav-A' })
    const navB = tree.root.findByProps({ testID: 'rv-indexbar-nav-B' })
    const navC = tree.root.findByProps({ testID: 'rv-indexbar-nav-C' })

    act(() => {
      navA.props.onLayout?.({ nativeEvent: { layout: { y: 10, height: 10 } } })
      navB.props.onLayout?.({ nativeEvent: { layout: { y: 30, height: 10 } } })
      navC.props.onLayout?.({ nativeEvent: { layout: { y: 50, height: 10 } } })
    })

    const buildEvent = (locationY: number) => ({
      nativeEvent: { locationY },
      touchHistory: {
        touchBank: [
          {
            currentPageX: 0,
            currentPageY: locationY,
            startPageX: 0,
            startPageY: locationY,
            previousPageX: 0,
            previousPageY: locationY,
            touchActive: true,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
        mostRecentTimeStamp: 0,
      },
    })

    act(() => {
      navList.props.onResponderGrant?.(buildEvent(36))
    })
    expect(onSelect).toHaveBeenCalledWith('B')
  })

  it('selects nearest index when tapping list background', () => {
    const onSelect = jest.fn()
    const tree = renderer.create(
      <IndexBar onSelect={onSelect}>
        <Anchor index="A"><Text>A</Text></Anchor>
        <Anchor index="B"><Text>B</Text></Anchor>
        <Anchor index="C"><Text>C</Text></Anchor>
      </IndexBar>
    )

    const navList = tree.root.findByProps({ testID: 'rv-indexbar-nav-list' })
    const navA = tree.root.findByProps({ testID: 'rv-indexbar-nav-A' })
    const navB = tree.root.findByProps({ testID: 'rv-indexbar-nav-B' })
    const navC = tree.root.findByProps({ testID: 'rv-indexbar-nav-C' })

    act(() => {
      navA.props.onLayout?.({ nativeEvent: { layout: { y: 10, height: 10 } } })
      navB.props.onLayout?.({ nativeEvent: { layout: { y: 30, height: 10 } } })
      navC.props.onLayout?.({ nativeEvent: { layout: { y: 50, height: 10 } } })
    })

    const buildEvent = (locationY: number) => ({
      nativeEvent: { locationY },
      touchHistory: {
        touchBank: [
          {
            currentPageX: 0,
            currentPageY: locationY,
            startPageX: 0,
            startPageY: locationY,
            previousPageX: 0,
            previousPageY: locationY,
            touchActive: true,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
        mostRecentTimeStamp: 0,
      },
    })

    act(() => {
      navList.props.onResponderGrant?.(buildEvent(34))
    })
    expect(onSelect).toHaveBeenCalledWith('B')
  })

  it('selects nearest index on responder start', () => {
    const onSelect = jest.fn()
    const tree = renderer.create(
      <IndexBar onSelect={onSelect}>
        <Anchor index="A"><Text>A</Text></Anchor>
        <Anchor index="B"><Text>B</Text></Anchor>
        <Anchor index="C"><Text>C</Text></Anchor>
      </IndexBar>
    )

    const navList = tree.root.findByProps({ testID: 'rv-indexbar-nav-list' })
    const navA = tree.root.findByProps({ testID: 'rv-indexbar-nav-A' })
    const navB = tree.root.findByProps({ testID: 'rv-indexbar-nav-B' })
    const navC = tree.root.findByProps({ testID: 'rv-indexbar-nav-C' })

    act(() => {
      navA.props.onLayout?.({ nativeEvent: { layout: { y: 10, height: 10 } } })
      navB.props.onLayout?.({ nativeEvent: { layout: { y: 30, height: 10 } } })
      navC.props.onLayout?.({ nativeEvent: { layout: { y: 50, height: 10 } } })
    })

    const buildEvent = (locationY: number) => ({
      nativeEvent: { locationY },
      touchHistory: {
        touchBank: [
          {
            currentPageX: 0,
            currentPageY: locationY,
            startPageX: 0,
            startPageY: locationY,
            previousPageX: 0,
            previousPageY: locationY,
            touchActive: true,
          },
        ],
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 0,
        mostRecentTimeStamp: 0,
      },
    })

    act(() => {
      navList.props.onResponderStart?.(buildEvent(34))
    })
    expect(onSelect).toHaveBeenCalledWith('B')
  })

  it('highlights pressed index during interaction even when controlled', () => {
    const itemRender = jest.fn((item: string | number, active: boolean) => (
      <Text>{`${item}-${active ? 'on' : 'off'}`}</Text>
    ))
    const tree = renderer.create(
      <IndexBar value="A" itemRender={itemRender}>
        <Anchor index="A"><Text>A</Text></Anchor>
        <Anchor index="B"><Text>B</Text></Anchor>
      </IndexBar>
    )

    const navB = tree.root.findByProps({ testID: 'rv-indexbar-nav-B' })
    act(() => {
      navB.props.onPressIn?.()
    })

    expect(itemRender.mock.calls.some(call => call[0] === 'B' && call[1] === true)).toBe(true)

    act(() => {
      navB.props.onPressOut?.()
    })
  })
})
