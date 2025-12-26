import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet } from 'react-native'

import Overlay from '..'
import { Portal, PortalHost } from '../../portal'

describe('Overlay', () => {
  const roots: renderer.ReactTestRenderer[] = []
  const render = (node: React.ReactElement) => {
    const root = renderer.create(node)
    roots.push(root)
    return root
  }

  afterEach(() => {
    act(() => {
      roots.splice(0).forEach(root => root.unmount())
      Portal.clear()
    })
  })

  it('renders when visible and triggers onPress', () => {
    const onPress = jest.fn()
    const tree = render(
      <PortalHost>
        <Overlay visible onPress={onPress} />
      </PortalHost>
    )

    const pressable = tree.root.findByProps({ testID: 'rv-overlay' }) as renderer.ReactTestInstance
    act(() => {
      pressable.props.onPress()
    })

    expect(onPress).toHaveBeenCalled()
  })

  it('renders nothing when not visible', () => {
    const tree = render(
      <PortalHost>
        <Overlay visible={false} />
      </PortalHost>
    )
    expect(tree.root.findAllByProps({ testID: 'rv-overlay' })).toHaveLength(0)
  })

  it('supports custom duration', async () => {
    jest.useFakeTimers()
    const tree = render(
      <PortalHost>
        <Overlay visible duration={500} />
      </PortalHost>
    )

    act(() => {
      jest.runAllTicks()
    })

    expect(tree.root.findAllByProps({ testID: 'rv-overlay' }).length).toBeGreaterThan(0)

    act(() => {
      tree.update(
        <PortalHost>
          <Overlay visible={false} duration={500} />
        </PortalHost>
      )
    })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(tree.root.findAllByProps({ testID: 'rv-overlay' })).toHaveLength(0)
    jest.useRealTimers()
  })

  it('supports custom zIndex', () => {
    const tree = render(
      <PortalHost>
        <Overlay visible zIndex={2000} />
      </PortalHost>
    )

    const nodesWithZIndex = tree.root.findAll(node => {
      const style = node.props.style
      if (!style) return false
      const flat = Array.isArray(style) ? StyleSheet.flatten(style) : style
      return flat.zIndex === 2000
    })

    expect(nodesWithZIndex.length).toBeGreaterThan(0)
  })
})
