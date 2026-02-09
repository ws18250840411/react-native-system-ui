import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text } from 'react-native'

import { ConfigProvider } from '../../components/config-provider'
import { PortalHost } from '../../components/portal'
import Tag from '../../components/tag'
import Typography from '../../components/typography'
import Button from '../../components/button'
import Toast from '../../components/toast'
import Tabs from '../../components/tabs'
import NavBar from '../../components/nav-bar'
import NoticeBar from '../../components/notice-bar'
import Empty from '../../components/empty'
import Space from '../../components/space'
import Sidebar from '../../components/sidebar'
import Stepper from '../../components/stepper'
import Progress from '../../components/progress'
import { Radio } from '../../components/radio'

const CUSTOM_FONT = 'CustomFontFromTheme'

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (style == null) return {}
  const flat = StyleSheet.flatten(Array.isArray(style) ? style : [style])
  return (flat ?? {}) as Record<string, unknown>
}

describe('Typography tokens (global fontFamily)', () => {
  it('ConfigProvider theme.foundations.typography.fontFamily flows to Tag', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Tag>标签</Tag>
      </ConfigProvider>
    )
    const text = tree.root.findByType(Text)
    const style = flattenStyle(text.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Typography.Text', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Typography.Text>正文</Typography.Text>
      </ConfigProvider>
    )
    const text = tree.root.findByType(Text)
    const style = flattenStyle(text.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Button', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Button text="按钮" />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    expect(texts.length).toBeGreaterThan(0)
    const style = flattenStyle(texts[0].props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Toast message', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <PortalHost>
          <Toast visible message="Toast 文案" duration={0} />
        </PortalHost>
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const messages = texts.filter(t => t.props.children === 'Toast 文案')
    expect(messages.length).toBeGreaterThan(0)
    const style = flattenStyle(messages[0].props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Tabs title', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Tabs>
          <Tabs.TabPane name="a" title="Tab A" />
          <Tabs.TabPane name="b" title="Tab B" />
        </Tabs>
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const titleText = texts.find(t => t.props.children === 'Tab A')
    expect(titleText).toBeDefined()
    const style = flattenStyle(titleText!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to NavBar title', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <NavBar title="标题" />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const titleText = texts.find(t => t.props.children === '标题')
    expect(titleText).toBeDefined()
    const style = flattenStyle(titleText!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to NoticeBar', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <NoticeBar text="通知内容" wrapable />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    expect(texts.length).toBeGreaterThan(0)
    const style = flattenStyle(texts[0].props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Empty description', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Empty description="暂无数据" />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const desc = texts.find(t => t.props.children === '暂无数据')
    expect(desc).toBeDefined()
    const style = flattenStyle(desc!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Empty footer children', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Empty description="空" children="底部文案" />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const footer = texts.find(t => t.props.children === '底部文案')
    expect(footer).toBeDefined()
    const style = flattenStyle(footer!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Space text children', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Space>子文案</Space>
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const child = texts.find(t => t.props.children === '子文案')
    expect(child).toBeDefined()
    const style = flattenStyle(child!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Sidebar content text', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Sidebar>
          <Sidebar.Item title="菜单" children="右侧内容文案" />
        </Sidebar>
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const contentText = texts.find(t => t.props.children === '右侧内容文案')
    expect(contentText).toBeDefined()
    const style = flattenStyle(contentText!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Stepper button text', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Stepper value={1} />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const plusMinus = texts.filter(t => t.props.children === '+' || t.props.children === '-')
    expect(plusMinus.length).toBeGreaterThan(0)
    const style = flattenStyle(plusMinus[0].props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Progress pivot text', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Progress percentage={50} pivotText="50%" />
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const pivot = texts.find(t => t.props.children === '50%')
    expect(pivot).toBeDefined()
    const style = flattenStyle(pivot!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })

  it('ConfigProvider theme.foundations.typography.fontFamily flows to Radio label', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: CUSTOM_FONT } } }}>
        <Radio value="a">单选项</Radio>
      </ConfigProvider>
    )
    const texts = tree.root.findAllByType(Text)
    const label = texts.find(t => t.props.children === '单选项')
    expect(label).toBeDefined()
    const style = flattenStyle(label!.props.style)
    expect(style.fontFamily).toBe(CUSTOM_FONT)
  })
})
