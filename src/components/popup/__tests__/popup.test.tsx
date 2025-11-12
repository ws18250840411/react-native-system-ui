import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable } from 'react-native'

import Popup from '..'

describe('Popup', () => {
  it('calls onClose when overlay is pressed', () => {
    const handleClose = jest.fn()
    const tree = renderer.create(
      <Popup visible overlay closeOnOverlayPress onClose={handleClose}>
        <></>
      </Popup>,
    )

    const overlay = tree.root.findByType(Pressable)
    act(() => {
      overlay.props.onPress?.()
    })

    expect(handleClose).toHaveBeenCalled()
  })
})
