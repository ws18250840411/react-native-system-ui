import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView, Text } from 'react-native'

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

  it('renders children correctly', () => {
    const tree = renderer.create(
      <PullRefresh>
        <Text>Content</Text>
      </PullRefresh>
    )
    expect(tree.root.findByType(Text).props.children).toBe('Content')
  })

  it('supports controlled refreshing', () => {
    const tree = renderer.create(
      <PullRefresh refreshing={true}>
        <Text>Content</Text>
      </PullRefresh>
    )
    const scroll = tree.root.findByType(ScrollView)
    expect(scroll.props.refreshControl.props.refreshing).toBe(true)
  })

  it('disables refresh control when disabled', () => {
    const tree = renderer.create(
      <PullRefresh disabled>
        <Text>Content</Text>
      </PullRefresh>
    )
    const scroll = tree.root.findByType(ScrollView)
    expect(scroll.props.refreshControl.props.enabled).toBe(false)
  })

  it('passes style and contentContainerStyle to ScrollView', () => {
    const tree = renderer.create(
      <PullRefresh style={{ backgroundColor: 'red' }} contentContainerStyle={{ padding: 10 }}>
        <Text>Content</Text>
      </PullRefresh>
    )
    const scroll = tree.root.findByType(ScrollView)
    expect(scroll.props.style).toEqual({ backgroundColor: 'red' })
    // contentContainerStyle might be modified by PullRefresh logic (paddingTop adjustment), check logic
    // In PullRefresh.tsx:
    // const shouldReserveHead = (status === 'loading' || status === 'success') && distance === 0
    // If not loading/success, it returns original.
    
    expect(scroll.props.contentContainerStyle).toEqual({ padding: 10 })
  })
})
