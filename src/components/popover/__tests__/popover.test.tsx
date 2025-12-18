import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Popover from '..'
import { PortalHost } from '../../portal'

describe('Popover', () => {
  it('toggles visibility when trigger pressed', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popover reference={<Pressable testID="rv-popover-reference" />}>
          <Text>content</Text>
        </Popover>
      </PortalHost>
    )

    const wrapper = tree.root.findByProps({ testID: 'rv-popover-wrapper' })
    act(() => {
      wrapper.props.onLayout?.({
        nativeEvent: { layout: { x: 10, y: 20, width: 40, height: 20 } },
      })
    })

    const reference = tree.root.findByProps({ testID: 'rv-popover-reference' })
    act(() => {
      reference.props.onPress?.({})
    })

    expect(tree.root.findAllByProps({ testID: 'rv-popover-backdrop' }).length).toBe(1)

    expect(tree).toBeTruthy()
  })
})
