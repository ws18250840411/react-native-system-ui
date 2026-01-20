import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import Picker, { type PickerOption } from '..'
import Loading from '../../loading'

jest.mock('../WheelPicker', () => {
  const React = require('react')
  const { View } = require('react-native')

  return function MockWheelPicker(props: any) {
    const { data, renderItem } = props
    return (
      <View testID="mock-wheel-picker">
        {data.map((item: any, index: number) => (
          <React.Fragment key={String(item?.value ?? index)}>{renderItem(item, index)}</React.Fragment>
        ))}
      </View>
    )
  }
})

describe('Picker', () => {
  it('passes active state to optionRender', () => {
    const columns: PickerOption[] = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]

    const optionRender = jest.fn((option, ctx) => `${option.value}:${ctx.active ? 1 : 0}`)

    renderer.create(
      <Picker columns={columns} defaultValue="b" optionRender={optionRender} />,
    )

    const calls = optionRender.mock.calls.map(([option, ctx]) => ({
      value: option.value,
      active: ctx.active,
      columnIndex: ctx.columnIndex,
    }))

    expect(calls).toEqual(
      expect.arrayContaining([
        { value: 'a', active: false, columnIndex: 0 },
        { value: 'b', active: true, columnIndex: 0 },
      ]),
    )
  })

  it('skips disabled default option', () => {
    const columns: PickerOption[] = [
      { label: 'A', value: 'a', disabled: true },
      { label: 'B', value: 'b' },
    ]

    const optionRender = jest.fn((option, ctx) => `${option.value}:${ctx.active ? 1 : 0}`)

    renderer.create(
      <Picker columns={columns} defaultValue="a" optionRender={optionRender} />,
    )

    const calls = optionRender.mock.calls.map(([option, ctx]) => ({
      value: option.value,
      active: ctx.active,
      columnIndex: ctx.columnIndex,
    }))

    expect(calls).toEqual(
      expect.arrayContaining([
        { value: 'a', active: false, columnIndex: 0 },
        { value: 'b', active: true, columnIndex: 0 },
      ]),
    )
  })

  it('supports ReactNode toolbar slots without nesting in Text', () => {
    const columns: PickerOption[] = [{ label: 'A', value: 'a' }]

    const tree = renderer.create(
      <Picker
        columns={columns}
        defaultValue="a"
        title={<View testID="custom-title" />}
        cancelButtonText={<View testID="custom-cancel" />}
        confirmButtonText={<View testID="custom-confirm" />}
      />,
    )

    expect(tree.root.findByProps({ testID: 'custom-title' })).toBeTruthy()
    expect(tree.root.findByProps({ testID: 'custom-cancel' })).toBeTruthy()
    expect(tree.root.findByProps({ testID: 'custom-confirm' })).toBeTruthy()
  })

  it('renders numeric title', () => {
    const tree = renderer.create(<Picker title={123} />)
    const text = tree.root.findAllByType(Text).find(t => t.props.children === 123)
    expect(text).toBeDefined()
  })

  it('handles single column selection', () => {
    const onConfirm = jest.fn()
    const columns = [
      [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]
    ]
    const tree = renderer.create(
      <Picker columns={columns} onConfirm={onConfirm} />
    )

    // Find confirm button
    const confirmBtn = tree.root.findAllByType(Pressable).find(p => {
      // confirmButtonText default is '确定'
      // But we can't easily check children text inside Pressable without deeper dive.
      // However, toolbar structure: Cancel, Title, Confirm.
      // Confirm is the last Pressable in toolbar.
      return true // we'll use index
    })

    // There are 2 Pressables in Toolbar (Cancel, Confirm).
    // And WheelPicker options are rendered inside WheelPicker.
    // Let's find confirm button by text content if possible, or position.
    // The Toolbar has 2 Pressables.
    const toolbar = tree.root.findAllByType(View).find(v => {
      const style = v.props.style
      if (Array.isArray(style)) {
        return style.some((s: any) => s && s.height === 42)
      }
      return style && style.height === 42
    }) // toolbarHeight default 42

    // Actually, easier to use onConfirm prop directly if we can simulate selection?
    // But WheelPicker uses FlatList or Web logic.
    // Simulating scroll in test-renderer is hard.
    // But we can verify initial value and confirm.

    // Default value should be first option 'a'.
    const confirmButton = tree.root.findAllByType(Pressable)[1] // 0 is Cancel, 1 is Confirm

    act(() => {
      confirmButton.props.onPress()
    })

    expect(onConfirm).toHaveBeenCalledWith(['a'], expect.anything())
  })

  it('renders loading state', () => {
    const tree = renderer.create(<Picker loading />)
    const loading = tree.root.findByType(Loading)
    expect(loading).toBeDefined()

    // Columns should have pointerEvents="none"
    const columns = tree.root.findAllByType(View).find(v => v.props.pointerEvents === 'none')
    expect(columns).toBeDefined()
  })
})
