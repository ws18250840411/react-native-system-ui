import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView } from 'react-native'

import PullRefresh from '..'

describe('PullRefresh', () => {
  it('calls onRefresh when triggered', async () => {
    const onRefresh = jest.fn()
    const tree = renderer.create(
      <PullRefresh onRefresh={onRefresh} successText={null}>
        <></>
      </PullRefresh>
    )

    const scroll = tree.root.findByType(ScrollView)
    await act(async () => {
      await scroll.props.refreshControl.props.onRefresh()
    })

    expect(onRefresh).toHaveBeenCalled()
  })
})
