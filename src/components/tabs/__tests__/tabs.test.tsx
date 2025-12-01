import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Animated, StyleSheet, Text } from 'react-native'

import Tabs from '..'
import Sticky from '../../sticky'

const { TabPane } = Tabs

describe('Tabs', () => {
  it('switches active tab on press and triggers onChange', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Tabs defaultActive="chat" onChange={onChange}>
        <TabPane title="消息" name="chat">
          <Text>聊天</Text>
        </TabPane>
        <TabPane title="通知" name="notice">
          <Text>通知</Text>
        </TabPane>
      </Tabs>
    )

    const noticeTab = tree.root.findByProps({ testID: 'rv-tabs-item-notice' })

    act(() => {
      noticeTab.props.onPress?.({})
    })

    expect(onChange).toHaveBeenCalledWith('notice', 1)

    const noticePane = tree.root.findByProps({ testID: 'rv-tabs-pane-notice' })
    const chatPane = tree.root.findByProps({ testID: 'rv-tabs-pane-chat' })

    const noticeStyle = StyleSheet.flatten(noticePane.props.style)
    const chatStyle = StyleSheet.flatten(chatPane.props.style)

    expect(noticeStyle?.display).toBeUndefined()
    expect(chatStyle?.display).toBe('none')
  })

  it('lazy renders content until tab becomes active', () => {
    const tree = renderer.create(
      <Tabs defaultActive="today" lazyRender>
        <TabPane title="今日" name="today">
          <Text>今日内容</Text>
        </TabPane>
        <TabPane title="本周" name="week">
          <Text>本周内容</Text>
        </TabPane>
      </Tabs>
    )

    expect(tree.root.findAllByProps({ testID: 'rv-tabs-pane-week' })).toHaveLength(0)

    const weekTab = tree.root.findByProps({ testID: 'rv-tabs-item-week' })
    act(() => {
      weekTab.props.onPress?.({})
    })

    expect(tree.root.findAllByProps({ testID: 'rv-tabs-pane-week' })).toHaveLength(1)
  })

  it('wraps nav with Sticky when sticky prop is enabled', () => {
    const scrollValue = new Animated.Value(0)
    const tree = renderer.create(
      <Tabs sticky scrollValue={scrollValue}>
        <TabPane title="A" name="a">
          <Text>A</Text>
        </TabPane>
        <TabPane title="B" name="b">
          <Text>B</Text>
        </TabPane>
      </Tabs>
    )

    expect(tree.root.findAllByType(Sticky).length).toBe(1)
  })
})
