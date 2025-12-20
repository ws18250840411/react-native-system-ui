import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View } from 'react-native'

import { PortalHost } from '../../portal'
import DropdownMenu from '..'

const { Item } = DropdownMenu

describe('DropdownMenu', () => {
  it('toggles panel when clicking item', () => {
    const tree = renderer.create(
      <PortalHost>
        <DropdownMenu>
          <Item options={[{ label: 'A', value: 'a' }]} />
        </DropdownMenu>
      </PortalHost>
    )

    const trigger = tree.root.findByProps({ testID: 'rv-dropdown-trigger-0' })
    act(() => {
      trigger.props.onPress?.({} as any)
    })

    const mask = tree.root.findByProps({ testID: 'rv-dropdown-mask' })
    expect(mask).toBeTruthy()

    act(() => {
      tree.unmount()
    })
  })

  it('fires onChange when selecting option', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <DropdownMenu>
          <Item options={[{ label: 'A', value: 'a' }]} onChange={onChange} />
        </DropdownMenu>
      </PortalHost>
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

    act(() => {
      tree.unmount()
    })
  })

  it('accepts non-text ReactNode labels and icons', () => {
    const tree = renderer.create(
      <PortalHost>
        <DropdownMenu activeIcon={<View testID="dm-active-icon" />}>
          <Item
            defaultValue="a"
            placeholder={<View testID="dm-placeholder" />}
            options={[
              { text: <View testID="dm-option-a" />, value: 'a', icon: <View testID="dm-option-icon" /> },
              { text: 'B', value: 'b' },
            ]}
          />
        </DropdownMenu>
      </PortalHost>
    )

    const trigger = tree.root.findByProps({ testID: 'rv-dropdown-trigger-0' })
    act(() => {
      trigger.props.onPress?.({} as any)
    })

    expect(tree.root.findAllByProps({ testID: 'dm-option-a' }).length).toBeGreaterThan(0)
    expect(tree.root.findByProps({ testID: 'dm-option-icon' })).toBeTruthy()
    expect(tree.root.findByProps({ testID: 'dm-active-icon' })).toBeTruthy()

    act(() => {
      tree.unmount()
    })
  })
})
