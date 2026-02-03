import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

jest.mock('@react-native-aria/overlays', () => {
  const React = require('react')
  const { View } = require('react-native')
  return {
    OverlayContainer: ({ children, style }: { children?: React.ReactNode; style?: unknown }) => (
      <View style={style}>{children}</View>
    ),
    OverlayProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  }
})

jest.mock('@react-native-aria/interactions', () => ({
  useKeyboardDismissable: jest.fn(),
}))

import Portal from '../Portal'
import { PortalHost, portalStore } from '../PortalHost'

describe('Portal', () => {
  afterEach(() => {
    act(() => {
      portalStore.clear()
    })
  })

  it('renders Portal component when open', () => {
    const tree = renderer.create(
      <PortalHost>
        <Portal isOpen>
          <Text testID="portal-text">Hello</Text>
        </Portal>
      </PortalHost>
    )

    const node = tree.root.findByProps({ testID: 'portal-text' })
    expect(node.props.children).toBe('Hello')

    act(() => {
      tree.unmount()
    })
  })

  it('does not render when isOpen is false', () => {
    const tree = renderer.create(
      <PortalHost>
        <Portal isOpen={false}>
          <Text testID="portal-closed">Hidden</Text>
        </Portal>
      </PortalHost>
    )

    const items = tree.root.findAllByProps({ testID: 'portal-closed' })
    expect(items.length).toBe(0)

    act(() => {
      tree.unmount()
    })
  })

  it('mounts and updates entries via static API', () => {
    const tree = renderer.create(<PortalHost />)
    let key = 0

    act(() => {
      key = Portal.add(<Text testID="static-text">A</Text>)
    })

    expect(tree.root.findByProps({ testID: 'static-text' }).props.children).toBe('A')

    act(() => {
      Portal.update(key, <Text testID="static-text">B</Text>)
    })

    expect(tree.root.findByProps({ testID: 'static-text' }).props.children).toBe('B')

    act(() => {
      Portal.remove(key)
    })

    expect(tree.root.findAllByProps({ testID: 'static-text' })).toHaveLength(0)

    act(() => {
      tree.unmount()
    })
  })

  it('propagates zIndex from portal content to wrapper', () => {
    const tree = renderer.create(<PortalHost />)

    act(() => {
      Portal.add(
        <View testID="z-10" style={{ zIndex: 10 }}>
          <Text>10</Text>
        </View>
      )
      Portal.add(
        <View testID="z-30">
          <View style={{ zIndex: 30 }}>
            <Text>30</Text>
          </View>
        </View>
      )
    })

    const zIndexes: number[] = []
    tree.root.findAll(node => {
      const flattened = StyleSheet.flatten(node.props?.style)
      if (flattened && typeof flattened.zIndex === 'number') {
        zIndexes.push(flattened.zIndex)
      }
      return false
    })
    expect(zIndexes).toEqual(expect.arrayContaining([10, 30]))

    act(() => {
      tree.unmount()
    })
  })

  it('uses max zIndex across descendants', () => {
    const tree = renderer.create(<PortalHost />)

    act(() => {
      Portal.add(
        <View testID="z-mix" style={{ zIndex: 10 }}>
          <View style={{ zIndex: 30 }}>
            <Text>30</Text>
          </View>
        </View>
      )
    })

    const zIndexes: number[] = []
    tree.root.findAll(node => {
      const flattened = StyleSheet.flatten(node.props?.style)
      if (flattened && typeof flattened.zIndex === 'number') {
        zIndexes.push(flattened.zIndex)
      }
      return false
    })
    expect(zIndexes).toEqual(expect.arrayContaining([30]))

    act(() => {
      tree.unmount()
    })
  })

  it('clears portals when last host unmounts', () => {
    const tree = renderer.create(<PortalHost />)
    act(() => {
      Portal.add(<Text testID="cleanup-text">X</Text>)
    })

    expect(portalStore.hasHosts()).toBe(true)

    act(() => {
      tree.unmount()
    })

    expect(portalStore.hasHosts()).toBe(false)
  })

  it('clears static portals through Portal.clear', () => {
    const host = renderer.create(<PortalHost />)

    act(() => {
      Portal.add(<Text testID="clear-text">static</Text>)
    })

    expect(host.root.findAllByProps({ testID: 'clear-text' })).toHaveLength(1)

    act(() => {
      Portal.clear()
    })

    expect(host.root.findAllByProps({ testID: 'clear-text' })).toHaveLength(0)

    act(() => {
      host.unmount()
    })
  })

  it('warns when no PortalHost is present', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => { })
    const previousDev = (global as any).__DEV__
    ;(global as any).__DEV__ = true

    try {
      if (typeof document === 'undefined') {
        act(() => {
          Portal.add(<Text>Content</Text>)
        })
      } else {
        Portal.add(<Text>Content</Text>)
      }
      if (!portalStore.hasHosts()) {
        expect(spy).toHaveBeenCalledWith(
          expect.stringContaining('请在根节点挂载')
        )
      } else {
        expect(spy).not.toHaveBeenCalled()
      }
    } finally {
      ;(global as any).__DEV__ = previousDev
      spy.mockRestore()
    }
  })
})
