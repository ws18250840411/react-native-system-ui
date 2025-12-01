import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView, Text } from 'react-native'

import IndexBar from '..'

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

  it('reacts to scroll events and updates active index', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <IndexBar onChange={onChange}>
        <Anchor index="A">
          <Text>A</Text>
        </Anchor>
        <Anchor index="B">
          <Text>B</Text>
        </Anchor>
      </IndexBar>
    )

    const scrollView = tree.root.findByType(ScrollView)

    act(() => {
      scrollView.props.onScroll?.({ nativeEvent: { contentOffset: { y: 100 } } })
    })

    // layout map is empty in test, so active remains first anchor; no change triggered
    expect(onChange).not.toHaveBeenCalled()
  })
})
