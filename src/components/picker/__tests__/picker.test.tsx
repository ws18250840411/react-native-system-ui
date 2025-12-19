import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import Picker, { type PickerOption } from '..'

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
    const columns: PickerOption[] = [{ label: 'A', value: 'a' }]

    const tree = renderer.create(
      <Picker columns={columns} defaultValue="a" title={0} />,
    )

    const titleNode = tree.root.findAllByType(Text).find(node => node.props.children === 0)
    expect(titleNode).toBeTruthy()
  })
})

