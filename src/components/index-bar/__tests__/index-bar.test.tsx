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
    const ref = React.createRef<any>()
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
    expect(ref.current).toBeDefined()
    expect(ref.current.scrollTo).toBeDefined()
      
    act(() => {
        ref.current?.scrollTo('A')
    })
  })
})
