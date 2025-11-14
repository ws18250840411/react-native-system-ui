import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, BackHandler } from 'react-native'

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

  it('closes on hardware back press when enabled', () => {
    const remove = jest.fn()
    const addSpy = jest.spyOn(BackHandler, 'addEventListener').mockReturnValue({ remove } as any)
    const handleClose = jest.fn()

    renderer.create(
      <PortalHost>
        <Popup visible closeOnBackPress onClose={handleClose}>
          <></>
        </Popup>
      </PortalHost>,
    )

    const handler = addSpy.mock.calls[0][1]
    act(() => {
      handler()
    })

    expect(handleClose).toHaveBeenCalled()
    addSpy.mockRestore()
  })

  it('closes on popstate when enabled', () => {
    if (typeof window === 'undefined') {
      expect(true).toBe(true)
      return
    }
    const handleClose = jest.fn()
    renderer.create(
      <PortalHost>
        <Popup visible closeOnPopstate onClose={handleClose}>
          <></>
        </Popup>
      </PortalHost>,
    )

    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(handleClose).toHaveBeenCalled()
  })
})
