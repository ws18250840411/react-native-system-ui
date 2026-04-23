import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import Picker, { type PickerOption } from '..'
import { normalizePicker, prepareColumns } from '../Picker'
import Loading from '../../loading'

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
    const confirmButton = tree.root.findAllByType(Pressable)[1]

    act(() => {
      confirmButton.props.onPress()
    })

    expect(onConfirm).toHaveBeenCalledWith(['a'], expect.anything())
  })

  it('renders loading state', () => {
    const tree = renderer.create(<Picker loading />)
    const loading = tree.root.findByType(Loading)
    expect(loading).toBeDefined()
    const columns = tree.root.findAllByType(View).find(v => v.props.pointerEvents === 'none')
    expect(columns).toBeDefined()
  })

  it('supports cascade depth greater than ten', () => {
    const deepRoot: PickerOption = { label: 'L0', value: 'v0', children: [] }
    let cursor = deepRoot
    for (let i = 1; i <= 12; i += 1) {
      const next: PickerOption = { label: `L${i}`, value: `v${i}`, children: [] }
      cursor.children = [next]
      cursor = next
    }

    const prep = prepareColumns([deepRoot])
    const normalized = normalizePicker(prep, Array.from({ length: 13 }, (_, i) => `v${i}`))
    expect(normalized.values).toHaveLength(13)
    expect(normalized.values[12]).toBe('v12')
  })
})
