import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

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

  it('allows multiple toast instances when enabled', () => {
    const host = renderer.create(
      <PortalHost>
        <></>
      </PortalHost>
    )

    const getMessages = () =>
      host.root
        .findAllByType(Text)
        .map(node => node.props.children)
        .flat()

    act(() => {
      Toast.allowMultiple(true)
      Toast.info({ message: '第一个', duration: 0 })
      Toast.success({ message: '第二个', duration: 0 })
    })

    expect(getMessages()).toEqual(expect.arrayContaining(['第一个', '第二个']))

    act(() => {
      Toast.clear()
      Toast.allowMultiple(false)
      jest.runAllTimers()
    })

    expect(getMessages()).toEqual(expect.not.arrayContaining(['第一个', '第二个']))
  })

  it('keeps forbidClick overlay transparent when overlay option is false', () => {
    const tree = renderer.create(
      <PortalHost>
        <Toast visible message="loading" forbidClick duration={0} />
      </PortalHost>
    )

    const overlay = tree.root.findByProps({ testID: 'rv-toast-overlay' })
    const style = StyleSheet.flatten(overlay.props.style)
    expect(style.backgroundColor).toBe('transparent')
  })

  it('calls onClosed after exit animation', () => {
    const onClosed = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <Toast visible message="bye" duration={0} onClosed={onClosed} />
      </PortalHost>
    )

    act(() => {
      tree.update(
        <PortalHost>
          <Toast visible={false} message="bye" duration={0} onClosed={onClosed} />
        </PortalHost>
      )
    })

    act(() => {
      jest.runAllTimers()
    })

    expect(onClosed).toHaveBeenCalled()
  })

  it('accepts non-text message nodes', () => {
    const tree = renderer.create(
      <PortalHost>
        <Toast visible duration={0} message={<View testID="toast-message" />} />
      </PortalHost>
    )
    expect(tree.root.findByProps({ testID: 'toast-message' })).toBeDefined()
  })
})
