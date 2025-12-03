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

  it('respects beforeChange callback result', async () => {
    const beforeChange = jest.fn(() => false)
    const onChange = jest.fn()
    const tree = renderer.create(
      <Tabs defaultActive="a" beforeChange={beforeChange} onChange={onChange}>
        <TabPane title="A" name="a">
          <Text>A</Text>
        </TabPane>
        <TabPane title="B" name="b">
          <Text>B</Text>
        </TabPane>
      </Tabs>
    )

    const tab = tree.root.findByProps({ testID: 'rv-tabs-item-b' })

    await act(async () => {
      tab.props.onPress?.({})
      await Promise.resolve()
    })

    expect(beforeChange).toHaveBeenCalledWith('b', 1)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies custom title colors', () => {
    const tree = renderer.create(
      <Tabs defaultActive="active" titleActiveColor="#ff0000" titleInactiveColor="#00ff00">
        <TabPane title="激活" name="active">
          <Text>active</Text>
        </TabPane>
        <TabPane title="默认" name="default">
          <Text>default</Text>
        </TabPane>
      </Tabs>
    )

    const activeTab = tree.root.findByProps({ testID: 'rv-tabs-item-active' })
    const inactiveTab = tree.root.findByProps({ testID: 'rv-tabs-item-default' })

    const activeTitle = activeTab.findAllByType(Text)[0]
    const inactiveTitle = inactiveTab.findAllByType(Text)[0]

    const activeStyle = StyleSheet.flatten(activeTitle.props.style)
    const inactiveStyle = StyleSheet.flatten(inactiveTitle.props.style)

    expect(activeStyle?.color).toBe('#ff0000')
    expect(inactiveStyle?.color).toBe('#00ff00')
  })
})
