import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { usePickerValue } from '../usePickerValue'
import type { PickerOption } from '../types'

type Handle = {
  select: (option: PickerOption, columnIndex: number) => void
  getValues: () => (string | number)[]
}

const columns: PickerOption[] = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

const Harness = React.forwardRef<Handle, { onChange: jest.Mock }>((props, ref) => {
  const { normalized, handleSelect } = usePickerValue({
    columns,
    defaultValue: ['2', '2-2', '2-2-2'],
    onChange: props.onChange,
  })

  React.useImperativeHandle(
    ref,
    () => ({
      select: handleSelect,
      getValues: () => normalized.values,
    }),
    [handleSelect, normalized.values],
  )

  return null
})

Harness.displayName = 'UsePickerValueHarness'

describe('usePickerValue', () => {
  it('keeps cascade consistent for rapid successive selections', () => {
    const onChange = jest.fn()
    const ref = React.createRef<Handle>()
    renderer.create(<Harness ref={ref} onChange={onChange} />)

    act(() => {
      ref.current?.select(columns[0], 0)
      ref.current?.select(columns[1], 0)
    })

    expect(onChange).toHaveBeenCalled()
    expect(ref.current?.getValues()).toEqual(['2', '2-1', '2-1-1'])
    expect(onChange).toHaveBeenLastCalledWith(['2', '2-1', '2-1-1'], expect.anything())
  })
})

