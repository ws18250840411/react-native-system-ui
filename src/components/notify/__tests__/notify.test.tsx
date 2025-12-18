import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import Notify from '..'
import { Portal, PortalHost } from '../../portal'

describe('Notify', () => {
  jest.useFakeTimers()

  const roots: renderer.ReactTestRenderer[] = []
  const render = (node: React.ReactElement) => {
    const root = renderer.create(node)
    roots.push(root)
    return root
  }

  afterEach(() => {
    act(() => {
      roots.splice(0).forEach(root => root.unmount())
      Notify.clear()
      Portal.clear()
      jest.runAllTimers()
    })
  })

  it('auto closes after duration', () => {
    const onClose = jest.fn()
    render(
      <PortalHost>
        <Notify visible message="hello" duration={1000} onClose={onClose} />
      </PortalHost>
    )

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('shows via static api and clears', () => {
    const host = render(
      <PortalHost>
        <></>
      </PortalHost>
    )

    act(() => {
      Notify.show({ message: 'static', duration: 0 })
    })

    const getMessages = () =>
      host.root
        .findAllByType(Text)
        .map(node => node.props.children)
        .flat()

    expect(getMessages()).toContain('static')

    act(() => {
      Notify.clear()
      jest.runAllTimers()
    })

    expect(getMessages()).not.toContain('static')
  })

  it('allows multiple notify instances when enabled', () => {
    const host = render(
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
      Notify.allowMultiple(true)
      Notify.primary({ message: '第一个', duration: 0 })
      Notify.success({ message: '第二个', duration: 0 })
    })

    expect(getMessages()).toEqual(expect.arrayContaining(['第一个', '第二个']))

    act(() => {
      Notify.clear()
      Notify.allowMultiple(false)
      jest.runAllTimers()
    })

    expect(getMessages()).toEqual(expect.not.arrayContaining(['第一个', '第二个']))
  })
})

