import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import Sidebar from '..'

const { Item } = Sidebar

describe('Sidebar', () => {
  it('switches active item and triggers onChange', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Sidebar defaultValue={0} onChange={onChange}>
        <Item title="A">
          <Text>内容 A</Text>
        </Item>
        <Item title="B">
          <Text>内容 B</Text>
        </Item>
      </Sidebar>
    )

    const secondItem = tree.root.findByProps({ testID: 'rv-sidebar-item-1' })

    act(() => {
      secondItem.props.onPress?.({})
    })

    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('respects disabled items', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Sidebar defaultValue={0} onChange={onChange}>
        <Item title="A" />
        <Item title="B" disabled />
      </Sidebar>
    )

    const disabledItem = tree.root.findByProps({ testID: 'rv-sidebar-item-1' })

    act(() => {
      disabledItem.props.onPress?.({})
    })

    expect(onChange).not.toHaveBeenCalled()
  })
})
