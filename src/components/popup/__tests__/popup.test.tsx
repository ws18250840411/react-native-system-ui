import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import Popup from '..'
import { PortalHost } from '../../portal'

describe('Popup', () => {
  it('calls onClose when overlay is pressed', () => {
    const handleClose = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <Popup visible overlay closeOnOverlayPress onClose={handleClose} overlayTestID="test-overlay">
          <></>
        </Popup>
      </PortalHost>,
    )

    const [overlay] = tree.root.findAll(
      node => node.type === Pressable && node.props.testID === 'test-overlay'
    )
    act(() => {
      overlay.props.onPress?.({} as any)
    })

    expect(handleClose).toHaveBeenCalled()
  })

})
