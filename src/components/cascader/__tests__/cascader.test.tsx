import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text } from 'react-native'

import Cascader from '..'

describe('Cascader', () => {
  it('selects option, triggers onChange, and advances to next tab', () => {
    const onChange = jest.fn()
    const options = [
      {
        text: 'A',
        value: 'a',
        children: [{ text: 'A-1', value: 'a1' }],
      },
      {
        text: 'B',
        value: 'b',
        children: [{ text: 'B-1', value: 'b1' }],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options as any} onChange={onChange} showHeader={false} />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    act(() => {
      option.props.onPress?.({} as any)
    })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toEqual(['a'])

    const pane0 = tree.root.findByProps({ testID: 'rv-tabs-pane-0' })
    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    expect(StyleSheet.flatten(pane0.props.style)?.display).toBe('none')
    expect(StyleSheet.flatten(pane1.props.style)?.display).toBeUndefined()
  })

  it('triggers onClickTab with tabIndex and title', () => {
    const onClickTab = jest.fn()
    const options = [
      {
        text: 'A',
        value: 'a',
        children: [{ text: 'A-1', value: 'a1' }],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options as any} onClickTab={onClickTab} showHeader={false} />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    act(() => {
      option.props.onPress?.({} as any)
    })

    const tab0 = tree.root.findByProps({ testID: 'rv-tabs-item-0' })
    act(() => {
      tab0.props.onPress?.({} as any)
    })

    expect(onClickTab).toHaveBeenCalledWith(0, 'A')
  })

  it('shows loadingText for async children placeholder column', () => {
    const options = [
      {
        text: 'A',
        value: 'a',
        children: [],
      },
    ]

    const tree = renderer.create(
      <Cascader
        options={options as any}
        loadingText="加载中..."
        placeholder="请选择"
        showHeader={false}
      />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    act(() => {
      option.props.onPress?.({} as any)
    })

    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    const texts = pane1.findAllByType(Text).map(node => node.props.children)
    expect(texts).toContain('加载中...')
  })
})

