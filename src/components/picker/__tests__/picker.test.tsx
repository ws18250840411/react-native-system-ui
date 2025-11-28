import React from 'react'
import renderer, { act } from 'react-test-renderer'

import Picker from '..'

const columns = [
  [
    { label: '周一', value: 'mon' },
    { label: '周二', value: 'tue' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
]

describe('Picker', () => {
  it('calls onChange when column updates', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Picker columns={columns} onChange={handleChange} />,
    )

    const columnNode = tree.root.findAll(node => typeof node.type === 'function' && node.type.name === 'PickerColumn')[0]

    act(() => {
      columnNode.props.onChange?.({ label: '周二', value: 'tue' })
    })

    expect(handleChange).toHaveBeenCalledWith(['tue', undefined], expect.any(Array))
  })
})
