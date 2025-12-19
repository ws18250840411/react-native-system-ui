import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, View } from 'react-native'

import Selector from '..'

const options = [
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
  { label: '重庆', value: 'cq' },
]

describe('Selector', () => {
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
})
