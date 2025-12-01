import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView } from 'react-native'

import List from '..'

describe('List', () => {
  it('triggers onLoad when scrolled to bottom', async () => {
    const onLoad = jest.fn(() => Promise.resolve())
    const tree = renderer.create(
      <List onLoad={onLoad}>
        <></>
      </List>
    )

    const scroll = tree.root.findByType(ScrollView)

    await act(async () => {
      scroll.props.onContentSizeChange?.(0, 1200)
      scroll.props.onLayout?.({ nativeEvent: { layout: { height: 300 } } })
      scroll.props.onScroll?.({ nativeEvent: { layoutMeasurement: { height: 300 }, contentOffset: { y: 920 }, contentSize: { height: 1200 } } })
    })

    expect(onLoad).toHaveBeenCalled()
  })
})
