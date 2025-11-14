import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import Toast from '..'
import { PortalHost } from '../../portal'

describe('Toast', () => {
  jest.useFakeTimers()

  it('auto closes after duration', () => {
    const onClose = jest.fn()
    renderer.create(
      <PortalHost>
        <Toast visible message="hello" duration={1000} onClose={onClose} />
      </PortalHost>
    )

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('shows via static api and clears', () => {
    const host = renderer.create(
      <PortalHost>
        <></>
      </PortalHost>
    )

    act(() => {
      Toast.show({ message: 'static', duration: 0 })
    })

    const getMessages = () =>
      host.root
        .findAllByType(Text)
        .map(node => node.props.children)
        .flat()

    expect(getMessages()).toContain('static')

    act(() => {
      Toast.clear()
      jest.runAllTimers()
    })

    expect(getMessages()).not.toContain('static')
  })
})
