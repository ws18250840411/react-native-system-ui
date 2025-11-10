import React from 'react'
import { Linking, Text } from 'react-native'
import renderer, { act } from 'react-test-renderer'

import Typography from '..'

describe('Typography', () => {
  let openURLSpy: jest.SpyInstance

  beforeEach(() => {
    openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined as never)
  })

  afterEach(() => {
    openURLSpy.mockRestore()
  })

  it('applies type colors and strong weight', () => {
    const tree = renderer.create(
      <Typography.Text type="primary" strong>
        文字
      </Typography.Text>,
    )
    const text = tree.root.findByType(Text)
    const style = [].concat(text.props.style).filter(Boolean).pop()
    expect(style.color).toBeTruthy()
    expect(style.fontWeight).toBeTruthy()
  })

  it('renders titles with level mapping', () => {
    const tree = renderer.create(
      <Typography.Title level={2}>标题</Typography.Title>,
    )
    const text = tree.root.findByType(Text)
    const style = [].concat(text.props.style).filter(Boolean).pop()
    expect(style.fontSize).toBe(26)
  })

  it('shows expand action when ellipsis detects truncation', () => {
    const tree = renderer.create(
      <Typography.Text ellipsis={{ rows: 1, expandText: '展开', collapseText: '收起' }}>
        这是一段很长的描述文字，需要多行展示
      </Typography.Text>,
    )

    const text = tree.root.findByType(Text)
    act(() => {
      text.props.onTextLayout?.({
        nativeEvent: {
          lines: [{ text: 'line1' }, { text: 'line2' }],
        },
      })
    })

    const action = tree.root.findAllByType(Text).find(node => node.props.children === '展开')
    expect(action).toBeDefined()
  })

  it('opens link when href provided', () => {
    const tree = renderer.create(
      <Typography.Link href="https://example.com">Link</Typography.Link>,
    )

    const text = tree.root.findByType(Text)

    act(() => {
      text.props.onPress?.({} as any)
    })

    expect(openURLSpy).toHaveBeenCalledWith('https://example.com')
  })
})
