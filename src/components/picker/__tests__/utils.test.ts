import { prepareColumns, normalizePicker, toArrayValue } from '../utils'
import type { PickerOption } from '../types'

describe('picker utils', () => {
  const provinceCity: PickerOption[] = [
    {
      label: '浙江',
      value: 'zj',
      children: [
        { label: '杭州', value: 'hz' },
        { label: '宁波', value: 'nb' },
      ],
    },
    {
      label: '江苏',
      value: 'js',
      children: [
        { label: '南京', value: 'nj' },
        { label: '苏州', value: 'sz' },
      ],
    },
  ]

  it('detects cascade columns correctly', () => {
    const prepared = prepareColumns(provinceCity)
    expect(prepared.type).toBe('cascade')
    expect(prepared.cascadeRoot?.length).toBe(2)
  })

  it('normalizes cascade selection along the path', () => {
    const prepared = prepareColumns(provinceCity)
    const { values, columns } = normalizePicker(prepared, ['js', 'sz'])
    expect(values).toEqual(['js', 'sz'])
    expect(columns[0].map(o => o.value)).toEqual(['zj', 'js'])
    expect(columns[1].map(o => o.value)).toEqual(['nj', 'sz'])
  })

  it('falls back to first enabled value when current is missing', () => {
    const prepared = prepareColumns(provinceCity)
    const { values } = normalizePicker(prepared, ['missing'])
    expect(values[0]).toBe('zj')
    expect(values[1]).toBe('hz')
  })

  it('skips disabled options when normalizing', () => {
    const options: PickerOption[] = [
      { label: 'A', value: 'a', disabled: true },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
    ]
    const prepared = prepareColumns(options)
    const { values } = normalizePicker(prepared, ['a'])
    expect(values[0]).toBe('b')
  })

  it('toArrayValue filters nullish and wraps primitives', () => {
    expect(toArrayValue(null)).toEqual([])
    expect(toArrayValue(undefined)).toEqual([])
    expect(toArrayValue('a')).toEqual(['a'])
    expect(toArrayValue(['a', null, 'b'] as any)).toEqual(['a', 'b'])
  })
})
