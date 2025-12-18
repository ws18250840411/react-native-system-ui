import React from 'react'
import renderer, { act } from 'react-test-renderer'

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
})

