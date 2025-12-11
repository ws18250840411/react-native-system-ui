/**
 * @jest-environment jsdom
 */

import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import Portal from '../Portal'
import { PortalContext } from '../PortalContext'
import { PortalHost, ensureGlobalPortalHost, portalStore } from '../PortalHost'

describe('Portal', () => {
  afterEach(() => {
    portalStore.clear()
  })

  it('mounts, updates and unmounts through the provided manager', () => {
    const mount = jest.fn().mockReturnValue(7)
    const update = jest.fn()
    const unmount = jest.fn()

    const manager = { mount, update, unmount }

    const Wrapper = ({ label }: { label: string }) => (
      <PortalHost>
        <PortalContext.Provider value={manager}>
          <Portal>
            <Text>{label}</Text>
          </Portal>
        </PortalContext.Provider>
      </PortalHost>
    )

    const tree = renderer.create(<Wrapper label="foo" />)

    expect(mount).toHaveBeenCalledTimes(1)
    expect(mount.mock.calls[0][0].props.children).toBe('foo')

    act(() => {
      tree.update(<Wrapper label="bar" />)
    })

    expect(update).toHaveBeenCalled()
    const lastCall = update.mock.calls[update.mock.calls.length - 1]
    expect(lastCall[0]).toBe(7)
    expect(lastCall[1].props.children).toBe('bar')

    act(() => {
      tree.unmount()
    })

    expect(unmount).toHaveBeenCalledWith(7)
  })

  it('renders children inside PortalHost and cleans up on unmount', () => {
    const Wrapper = ({ text }: { text: string }) => (
      <PortalHost>
        <Portal>
          <Text testID="portal-text">{text}</Text>
        </Portal>
      </PortalHost>
    )

    const tree = renderer.create(<Wrapper text="Hello" />)

    const getTexts = () => tree.root.findAllByProps({ testID: 'portal-text' })
    expect(getTexts()[0].props.children).toBe('Hello')

    act(() => {
      tree.update(<Wrapper text="World" />)
    })
    expect(getTexts()[0].props.children).toBe('World')

    act(() => {
      tree.update(<PortalHost />)
    })
    expect(getTexts().length).toBe(0)
  })

  it('clears static portals through Portal.clear', () => {
    const host = renderer.create(<PortalHost />)

    act(() => {
      Portal.add(<Text testID="clear-text">static</Text>)
    })

    expect(portalStore.getSnapshot().length).toBe(1)

    act(() => {
      Portal.clear()
    })

    expect(portalStore.getSnapshot().length).toBe(0)

    act(() => {
      host.unmount()
    })
  })

  it('tears down auto host after clear when only auto host is present', async () => {
    await act(async () => {
      await ensureGlobalPortalHost()
    })

    const host = document.querySelector('[data-rnsu-portal-host="true"]')
    if (!host) {
      // 在非 Web/未安装 react-dom 的环境下会直接跳过自动挂载能力
      return
    }

    await act(async () => {
      Portal.clear()
      await Promise.resolve()
    })

    expect(document.querySelector('[data-rnsu-portal-host="true"]')).toBeNull()
  })
})
