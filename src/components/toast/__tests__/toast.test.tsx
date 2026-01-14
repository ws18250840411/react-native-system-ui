import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import Toast from '..'
import Loading from '../../loading'
import { PortalHost } from '../../portal'

describe('Toast', () => {
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
      Toast.clear()
      jest.runAllTimers()
    })
  })

  it('auto closes after duration', () => {
    const onClose = jest.fn()
    render(
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
    const host = render(
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
    const tree = render(
      <PortalHost>
        <Toast visible message="loading" forbidClick duration={0} />
      </PortalHost>
    )

    const overlay = tree.root.findByProps({ testID: 'rv-toast-overlay' })
    const style = StyleSheet.flatten(overlay.props.style)
    expect(style.backgroundColor).toBe('transparent')
  })

  it('closes when click overlay and closeOnClickOverlay is enabled', () => {
    const onClose = jest.fn()
    const tree = render(
      <PortalHost>
        <Toast visible message="overlay" overlay closeOnClickOverlay duration={0} onClose={onClose} />
      </PortalHost>
    )

    const overlay = tree.root.findByProps({ testID: 'rv-toast-overlay' }) as renderer.ReactTestInstance
    act(() => {
      overlay.props.onPress?.({} as any)
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClosed after exit animation', () => {
    const onClosed = jest.fn()
    const tree = render(
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

  it('passes iconSize and loadingType to loading indicator', () => {
    const tree = render(
      <PortalHost>
        <Toast visible type="loading" iconSize={40} loadingType="spinner" duration={0} />
      </PortalHost>
    )

    const loading = tree.root.findByType(Loading)
    expect(loading.props.size).toBe(40)
    expect(loading.props.type).toBe('spinner')
  })

  it('supports loadingType ball', () => {
    const tree = render(
      <PortalHost>
        <Toast visible type="loading" iconSize={24} loadingType="ball" duration={0} />
      </PortalHost>
    )
    const loading = tree.root.findByType(Loading)
    expect(loading.props.type).toBe('ball')
  })

  it('supports config alias on static handle', () => {
    const host = render(
      <PortalHost>
        <></>
      </PortalHost>
    )

    let handle: ReturnType<typeof Toast.show> | null = null
    act(() => {
      handle = Toast.show({ message: 'A', duration: 0, overlay: true })
    })

    const getMessages = () =>
      host.root
        .findAllByType(Text)
        .map(node => node.props.children)
        .flat()

    expect(getMessages()).toContain('A')

    act(() => {
      handle?.config({ message: 'B' })
    })

    expect(getMessages()).toContain('B')

    const overlay = host.root.findByProps({ testID: 'rv-toast-overlay' })
    const style = StyleSheet.flatten(overlay.props.style)
    expect(style.backgroundColor).toBe('rgba(0,0,0,0.7)')

    act(() => {
      Toast.clear()
      jest.runAllTimers()
    })
  })

  it('accepts non-text message nodes', () => {
    const tree = render(
      <PortalHost>
        <Toast visible duration={0} message={<View testID="toast-message" />} />
      </PortalHost>
    )
    expect(tree.root.findByProps({ testID: 'toast-message' })).toBeDefined()
  })

  it('auto closes loading toast by default', () => {
    const host = render(
      <PortalHost>
        <></>
      </PortalHost>
    )

    act(() => {
      Toast.loading({ message: 'Loading...' })
    })

    // Advance timer by 5 seconds (default is 2s + exit animation)
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    const getMessages = () =>
      host.root
        .findAllByType(Text)
        .map(node => node.props.children)
        .flat()

    expect(getMessages()).not.toContain('Loading...')

    act(() => {
      Toast.clear()
      jest.runAllTimers()
    })
  })
})
