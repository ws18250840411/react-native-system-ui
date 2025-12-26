import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'

import Tabs from '..'

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

    expect(beforeChange).toHaveBeenCalledWith('b')
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

  it('does not switch when tab is disabled', () => {
    const onChange = jest.fn()
    const onClickTab = jest.fn()
    const tree = renderer.create(
      <Tabs defaultActive="a" onChange={onChange} onClickTab={onClickTab}>
        <TabPane title="A" name="a">
          <Text>A</Text>
        </TabPane>
        <TabPane title="B" name="b" disabled>
          <Text>B</Text>
        </TabPane>
      </Tabs>
    )

    const disabledTab = tree.root.findByProps({ testID: 'rv-tabs-item-b' })

    act(() => {
      disabledTab.props.onPress?.({})
    })

    expect(onChange).not.toHaveBeenCalled()
    expect(onClickTab).toHaveBeenCalledWith({
      name: 'b',
      index: 1,
      disabled: true,
      event: {},
    })

    const aPane = tree.root.findByProps({ testID: 'rv-tabs-pane-a' })
    const bPane = tree.root.findAllByProps({ testID: 'rv-tabs-pane-b' })
    expect(StyleSheet.flatten(aPane.props.style)?.display).toBeUndefined()
    expect(bPane).toHaveLength(0)
  })

  it('renders lazyRenderPlaceholder before content loads', () => {
    const tree = renderer.create(
      <Tabs
        defaultActive="ready"
        lazyRender
        swipeable
        lazyRenderPlaceholder={<Text>占位符</Text>}
      >
        <TabPane title="已就绪" name="ready">
          <Text>当前内容</Text>
        </TabPane>
        <TabPane title="稍后" name="later">
          <Text>稍后内容</Text>
        </TabPane>
      </Tabs>
    )

    const laterPane = tree.root.findByProps({ testID: 'rv-tabs-pane-later' })
    expect(laterPane.findAllByType(Text)[0].props.children).toBe('占位符')

    const laterTab = tree.root.findByProps({ testID: 'rv-tabs-item-later' })
    act(() => {
      laterTab.props.onPress?.({})
    })

    const updatedPane = tree.root.findByProps({ testID: 'rv-tabs-pane-later' })
    const texts = updatedPane.findAllByType(Text).map(node => node.props.children)
    expect(texts).toContain('稍后内容')
    expect(texts).not.toContain('占位符')
  })

  // scrollspy 能力已按官方对齐移除

  it('renders card type tabs', () => {
    const tree = renderer.create(
      <Tabs type="card" defaultActive="1">
        <TabPane title="1" name="1" />
        <TabPane title="2" name="2" />
      </Tabs>
    )

    // Check border radius or specific styles for card
    const items = tree.root.findAll(node => node.props.testID?.startsWith('rv-tabs-item'))
    const uniqueItems = Array.from(new Set(items.map(i => i.props.testID)))
    expect(uniqueItems).toHaveLength(2)
  })

  it('renders capsule type tabs', () => {
    const tree = renderer.create(
      <Tabs type="capsule" defaultActive="1">
        <TabPane title="1" name="1" />
      </Tabs>
    )
    const item = tree.root.findByProps({ testID: 'rv-tabs-item-1' })
    expect(item).toBeDefined()
  })

  it('does not cancel tabbar scroll animation by onScroll updates', () => {
    const timingSpy = jest.spyOn(Animated, 'timing').mockImplementation(((_value: any, _config: any) => {
      const animation = {
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      }
      return animation as any
    }) as any)

    const setValueSpy = jest.spyOn(Animated.Value.prototype as any, 'setValue')

    const tree = renderer.create(
      <Tabs defaultActive="a" scrollable>
        <TabPane title="A" name="a" />
        <TabPane title="B" name="b" />
        <TabPane title="C" name="c" />
      </Tabs>,
    )

    const tabA = tree.root.findByProps({ testID: 'rv-tabs-item-a' })
    const tabB = tree.root.findByProps({ testID: 'rv-tabs-item-b' })
    const tabC = tree.root.findByProps({ testID: 'rv-tabs-item-c' })

    act(() => {
      tabA.props.onLayout?.({ nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 40 } } })
      tabB.props.onLayout?.({ nativeEvent: { layout: { x: 100, y: 0, width: 100, height: 40 } } })
      tabC.props.onLayout?.({ nativeEvent: { layout: { x: 200, y: 0, width: 100, height: 40 } } })
    })

    const navContainer = tree.root
      .findAllByType(View)
      .find(node => typeof node.props.onLayout === 'function' && StyleSheet.flatten(node.props.style)?.flex === 1)

    act(() => {
      navContainer?.props.onLayout?.({ nativeEvent: { layout: { x: 0, y: 0, width: 300, height: 40 } } })
    })

    const scrollView = tree.root.findByType(ScrollView)
    act(() => {
      scrollView.props.onContentSizeChange?.(1000, 40)
    })

    const before = setValueSpy.mock.calls.length

    act(() => {
      tabC.props.onPress?.({})
    })

    const afterChange = setValueSpy.mock.calls.length

    act(() => {
      scrollView.props.onScroll?.({ nativeEvent: { contentOffset: { x: 80, y: 0 } } })
    })

    const afterScroll = setValueSpy.mock.calls.length

    expect(afterChange).toBeGreaterThan(before)
    expect(afterScroll).toBe(afterChange)

    timingSpy.mockRestore()
    setValueSpy.mockRestore()
  })

  it('keeps indicator working when panes are appended', () => {
    const timingSpy = jest.spyOn(Animated, 'timing').mockImplementation(((_value: any, _config: any) => {
      const animation = {
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      }
      return animation as any
    }) as any)

    let tree = renderer.create(
      <Tabs defaultActive="b" scrollable>
        <TabPane title="A" name="a" />
        <TabPane title="B" name="b" />
      </Tabs>,
    )

    const tabA = tree.root.findByProps({ testID: 'rv-tabs-item-a' })
    const tabB = tree.root.findByProps({ testID: 'rv-tabs-item-b' })

    act(() => {
      tabA.props.onLayout?.({ nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 40 } } })
      tabB.props.onLayout?.({ nativeEvent: { layout: { x: 100, y: 0, width: 100, height: 40 } } })
    })

    timingSpy.mockClear()

    act(() => {
      tree.update(
        <Tabs defaultActive="b" scrollable>
          <TabPane title="A" name="a" />
          <TabPane title="B" name="b" />
          <TabPane title="C" name="c" />
        </Tabs>,
      )
    })

    const tabAAfter = tree.root.findByProps({ testID: 'rv-tabs-item-a' })
    act(() => {
      tabAAfter.props.onPress?.({})
    })

    expect(timingSpy).toHaveBeenCalled()
    act(() => {
      tree.unmount()
    })
  })
})
