import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text } from 'react-native'

import Cascader from '..'
import type { CascaderOption } from '../types'
import { Portal, PortalHost } from '../../portal'

type CustomOption = CascaderOption & {
  label: string
  id: number
  nodes?: CustomOption[]
}

describe('Cascader', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
      Portal.clear()
    })
    jest.useRealTimers()
  })

  it('selects option, triggers onChange, and advances to next tab', async () => {
    const onChange = jest.fn()
    const options: CascaderOption[] = [
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
      <Cascader options={options} onChange={onChange} showHeader={false} swipeable={false} />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    await act(async () => {
      option.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toEqual(['a'])

    const pane0 = tree.root.findByProps({ testID: 'rv-tabs-pane-0' })
    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    expect(StyleSheet.flatten(pane0.props.style)?.display).toBe('none')
    expect(StyleSheet.flatten(pane1.props.style)?.display).toBeUndefined()
  })

  it('triggers onClickTab with tabIndex and title', async () => {
    const onClickTab = jest.fn()
    const options: CascaderOption[] = [
      {
        text: 'A',
        value: 'a',
        children: [{ text: 'A-1', value: 'a1' }],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options} onClickTab={onClickTab} showHeader={false} />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    await act(async () => {
      option.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const tab0 = tree.root.findByProps({ testID: 'rv-tabs-item-0' })
    await act(async () => {
      tab0.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    expect(onClickTab).toHaveBeenCalledWith(0, 'A')
  })

  it('triggers onClickTab even when clicking active tab', async () => {
    const onClickTab = jest.fn()
    const options: CascaderOption[] = [
      {
        text: 'A',
        value: 'a',
        children: [{ text: 'A-1', value: 'a1' }],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options} onClickTab={onClickTab} showHeader={false} />
    )

    const tab0 = tree.root.findByProps({ testID: 'rv-tabs-item-0' })
    await act(async () => {
      tab0.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    expect(onClickTab).toHaveBeenCalledWith(0, '请选择')
  })

  it('shows loadingText for async children placeholder column', async () => {
    const options: CascaderOption[] = [
      {
        text: 'A',
        value: 'a',
        children: [],
      },
    ]

    const tree = renderer.create(
      <Cascader
        options={options}
        loadingText="加载中..."
        placeholder="请选择"
        showHeader={false}
      />
    )

    const option = tree.root.findByProps({ testID: 'cascader-option-0-a' })
    await act(async () => {
      option.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    const texts = pane1.findAllByType(Text).map(node => node.props.children)
    expect(texts).toContain('加载中...')
  })

  it('supports custom fieldNames for text/value/children', async () => {
    const onFinish = jest.fn()
    const options: CustomOption[] = [
      {
        label: '广东省',
        id: 1,
        nodes: [
          { label: '深圳市', id: 11 },
          { label: '广州市', id: 12 },
        ],
      },
    ]

    const tree = renderer.create(
      <Cascader
        options={options}
        fieldNames={{ text: 'label', value: 'id', children: 'nodes' }}
        onFinish={onFinish}
        showHeader={false}
      />,
    )

    const option0 = tree.root.findByProps({ testID: 'cascader-option-0-1' })
    await act(async () => {
      option0.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const option1 = tree.root.findByProps({ testID: 'cascader-option-1-11' })
    await act(async () => {
      option1.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    expect(onFinish).toHaveBeenCalledWith([1, 11], [options[0], options[0].nodes![0]])
  })

  it('supports onClickTab title with custom fieldNames', async () => {
    const onClickTab = jest.fn()
    const options: CustomOption[] = [
      {
        label: '广东省',
        id: 1,
        nodes: [{ label: '深圳市', id: 11 }],
      },
    ]

    const tree = renderer.create(
      <Cascader
        options={options}
        fieldNames={{ text: 'label', value: 'id', children: 'nodes' }}
        onClickTab={onClickTab}
        showHeader={false}
      />,
    )

    const option0 = tree.root.findByProps({ testID: 'cascader-option-0-1' })
    await act(async () => {
      option0.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const tab0 = tree.root.findByProps({ testID: 'rv-tabs-item-0' })
    await act(async () => {
      tab0.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    expect(onClickTab).toHaveBeenCalledWith(0, '广东省')
  })

  it('does not crash when optionRender returns a string', async () => {
    const options: CascaderOption[] = [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
    ]
    expect(() => {
      renderer.create(
        <Cascader
          options={options}
          poppable={false}
          showHeader={false}
          optionRender={({ option }) => String(option.text)}
        />,
      )
    }).not.toThrow()
  })

  it('falls back to first tab when value path starts invalid', () => {
    const options: CascaderOption[] = [
      { text: 'A', value: 'a', children: [{ text: 'A-1', value: 'a1' }] },
    ]
    const tree = renderer.create(
      <Cascader options={options} value={['x', 'y']} showHeader={false} swipeable={false} />
    )

    const pane0 = tree.root.findByProps({ testID: 'rv-tabs-pane-0' })
    expect(StyleSheet.flatten(pane0.props.style)?.display).toBeUndefined()
    expect(tree.root.findAllByProps({ testID: 'rv-tabs-pane-1' })).toHaveLength(0)
  })

  it('restores last viewed column when popup becomes visible again', async () => {
    const options: CascaderOption[] = [
      {
        text: '江苏省',
        value: 'js',
        children: [
          {
            text: '南京市',
            value: 'nj',
            children: [{ text: '玄武区', value: 'xw' }],
          },
        ],
      },
    ]

    const root = renderer.create(
      <PortalHost>
        <Cascader options={options} value={['js', 'nj', 'xw']} poppable visible showHeader={false} swipeable={false} />
      </PortalHost>,
    )

    await act(async () => {
      root.update(
        <PortalHost>
          <Cascader options={options} value={['js', 'nj', 'xw']} poppable visible={false} showHeader={false} swipeable={false} />
        </PortalHost>,
      )
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    await act(async () => {
      root.update(
        <PortalHost>
          <Cascader options={options} value={['js', 'nj', 'xw']} poppable visible showHeader={false} swipeable={false} />
        </PortalHost>,
      )
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const tab1 = root.root.findByProps({ testID: 'rv-tabs-item-1' })
    await act(async () => {
      tab1.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    await act(async () => {
      root.update(
        <PortalHost>
          <Cascader options={options} value={['js', 'nj', 'xw']} poppable visible={false} showHeader={false} swipeable={false} />
        </PortalHost>,
      )
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    await act(async () => {
      root.update(
        <PortalHost>
          <Cascader options={options} value={['js', 'nj', 'xw']} poppable visible showHeader={false} swipeable={false} />
        </PortalHost>,
      )
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const pane1 = root.root.findByProps({ testID: 'rv-tabs-pane-1' })
    expect(StyleSheet.flatten(pane1.props.style)?.display).toBeUndefined()
    const cityOption = root.root.findByProps({ testID: 'cascader-option-1-nj' })
    expect(cityOption).toBeTruthy()
  })

  it('does not snap back to last tab when user switches to a parent column', async () => {
    const options: CascaderOption[] = [
      {
        text: '江苏省',
        value: 'js',
        children: [
          {
            text: '南京市',
            value: 'nj',
            children: [{ text: '玄武区', value: 'xw' }],
          },
        ],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options} value={['js', 'nj', 'xw']} showHeader={false} swipeable={false} />
    )

    const pane2 = tree.root.findByProps({ testID: 'rv-tabs-pane-2' })
    expect(StyleSheet.flatten(pane2.props.style)?.display).toBeUndefined()

    const tab1 = tree.root.findByProps({ testID: 'rv-tabs-item-1' })
    await act(async () => {
      tab1.props.onPress?.()
      jest.runOnlyPendingTimers()
      await Promise.resolve()
    })

    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    expect(StyleSheet.flatten(pane1.props.style)?.display).toBeUndefined()
    expect(StyleSheet.flatten(pane2.props.style)?.display).toBe('none')
  })

  it('uses last available tab when value depth exceeds resolved tabs', () => {
    const options: CascaderOption[] = [
      {
        text: 'A',
        value: 'a',
        children: [
          {
            text: 'A-1',
            value: 'a1',
            children: [{ text: 'A-1-1', value: 'a11' }],
          },
        ],
      },
    ]

    const tree = renderer.create(
      <Cascader options={options} value={['a', 'invalid-child', 'ghost']} showHeader={false} swipeable={false} />
    )

    const pane0 = tree.root.findByProps({ testID: 'rv-tabs-pane-0' })
    const pane1 = tree.root.findByProps({ testID: 'rv-tabs-pane-1' })
    expect(StyleSheet.flatten(pane0.props.style)?.display).toBe('none')
    expect(StyleSheet.flatten(pane1.props.style)?.display).toBeUndefined()
  })
})
