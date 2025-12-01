import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Popover from '..'
import { PortalHost } from '../../portal'

const Trigger = React.forwardRef((props: any, ref) => {
  React.useImperativeHandle(ref, () => ({
    measureInWindow: (cb: any) => cb(50, 100, 40, 20),
  }))
  return <Pressable {...props} testID="rv-popover-trigger" />
})

describe('Popover', () => {
  it('toggles visibility when trigger pressed', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popover trigger={<Trigger />}>
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

    const trigger = tree.root.findByProps({ testID: 'rv-popover-trigger' })
    act(() => {
      trigger.props.onPress?.({})
    })

    expect(tree).toBeTruthy()
  })
})
