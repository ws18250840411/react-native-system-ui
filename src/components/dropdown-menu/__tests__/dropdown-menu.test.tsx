import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import DropdownMenu from '..'

const { Item } = DropdownMenu

describe('DropdownMenu', () => {
  it('toggles panel when clicking item', () => {
    const tree = renderer.create(
      <DropdownMenu>
        <Item options={[{ label: 'A', value: 'a' }]} />
      </DropdownMenu>
    )

    const trigger = tree.root.findByProps({ testID: 'rv-dropdown-trigger-0' })
    act(() => {
      trigger.props.onPress?.({} as any)
    })

    const mask = tree.root.findByProps({ testID: 'rv-dropdown-mask' })
    expect(mask).toBeTruthy()
  })

  it('fires onChange when selecting option', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <DropdownMenu>
        <Item options={[{ label: 'A', value: 'a' }]} onChange={onChange} />
      </DropdownMenu>
    )

    const trigger = tree.root.findByProps({ testID: 'rv-dropdown-trigger-0' })
    act(() => {
      trigger.props.onPress?.({} as any)
    })

    const option = tree.root.findByProps({ testID: 'rv-dropdown-option-a' })
    act(() => {
      option.props.onPress?.({} as any)
    })

    expect(onChange).toHaveBeenCalledWith('a', expect.objectContaining({ value: 'a' }))
  })
})
