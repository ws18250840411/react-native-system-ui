import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, View, StyleSheet, Text } from 'react-native'

import Selector from '..'

const options = [
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
  { label: '重庆', value: 'cq' },
]

describe('Selector', () => {
  it('derives accessibility props from label/description', () => {
    const tree = renderer.create(
      <Selector
        options={[
          { label: '杭州', description: '描述', value: 'hz' },
          { label: <View />, value: 'custom' },
        ]}
      />
    )

    const pressables = tree.root.findAllByType(Pressable)
    expect(pressables[0].props.accessibilityLabel).toBe('杭州')
    expect(pressables[0].props.accessibilityHint).toBe('描述')
    expect(pressables[1].props.accessibilityLabel).toBe('custom')
  })

  it('supports single selection toggle', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Selector options={options} onChange={handleChange} />
    )

    const pressables = tree.root.findAllByType(Pressable)

    act(() => {
      pressables[1].props.onPress?.()
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(['cd'], {
      items: [options[1]],
    })

    act(() => {
      pressables[1].props.onPress?.()
    })

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenLastCalledWith([], { items: [] })
  })

  it('supports multiple selection', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Selector options={options} multiple onChange={handleChange} />
    )
    const pressables = tree.root.findAllByType(Pressable)

    act(() => {
      pressables[0].props.onPress?.()
    })

    const nextPressables = tree.root.findAllByType(Pressable)

    act(() => {
      nextPressables[2].props.onPress?.()
    })

    expect(handleChange).toHaveBeenLastCalledWith(['hz', 'cq'], expect.any(Object))
  })

  it('supports ReactNode label and description', () => {
    const tree = renderer.create(
      <Selector
        options={[
          {
            label: <View testID="custom-label" />,
            description: <View testID="custom-description" />,
            value: 'a',
          },
        ]}
      />,
    )

    expect(tree.root.findByProps({ testID: 'custom-label' })).toBeTruthy()
    expect(tree.root.findByProps({ testID: 'custom-description' })).toBeTruthy()
  })

  it('supports disabled options', () => {
    const onChange = jest.fn()
    const options = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b', disabled: true }
    ]
    const tree = renderer.create(
      <Selector options={options} onChange={onChange} />
    )

    const items = tree.root.findAllByType(Pressable)
    renderer.act(() => {
      items[1].props.onPress()
    })
    expect(onChange).not.toHaveBeenCalled()

    renderer.act(() => {
      items[0].props.onPress()
    })
    expect(onChange).toHaveBeenCalledWith(['a'], expect.anything())
  })

  it('respects global disabled prop', () => {
    const onChange = jest.fn()
    const options = [{ label: 'A', value: 'a' }]
    const tree = renderer.create(
      <Selector options={options} onChange={onChange} disabled />
    )

    const item = tree.root.findByType(Pressable)
    renderer.act(() => {
      item.props.onPress()
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('calculates item width based on columns', () => {
    const options = [{ label: 'A', value: 'a' }]
    const tree = renderer.create(<Selector options={options} columns={3} />)

    const item = tree.root.findByType(Pressable)
    const style = StyleSheet.flatten(item.props.style)
    expect(style.width).toBe('33.333333333333336%')
  })

  it('toggles check mark visibility', () => {
    const options = [{ label: 'A', value: 'a' }]
    const tree = renderer.create(
      <Selector options={options} value={['a']} showCheckMark={true} />
    )

    const texts = tree.root.findAllByType(Text)
    const checkMark = texts.find(t => t.props.children === '✓')
    expect(checkMark).toBeDefined()

    renderer.act(() => {
      tree.update(
        <Selector options={options} value={['a']} showCheckMark={false} />
      )
    })

    const textsAfter = tree.root.findAllByType(Text)
    const checkMarkAfter = textsAfter.find(t => t.props.children === '✓')
    expect(checkMarkAfter).toBeUndefined()
  })
})
