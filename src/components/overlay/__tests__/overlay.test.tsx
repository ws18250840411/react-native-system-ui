import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

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

import Overlay from '..'

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
    })
  })

  it('renders when isOpen is true', () => {
    const tree = render(
      <Overlay isOpen>
        <Text testID="overlay-child">content</Text>
      </Overlay>
    )

    const child = tree.root.findByProps({ testID: 'overlay-child' })
    expect(child.props.children).toBe('content')
  })

  it('supports visible alias', () => {
    const tree = render(
      <Overlay visible>
        <Text testID="overlay-visible">alias</Text>
      </Overlay>
    )

    const child = tree.root.findByProps({ testID: 'overlay-visible' })
    expect(child.props.children).toBe('alias')
  })

  it('renders nothing when not open', () => {
    const tree = render(<Overlay isOpen={false} />)
    expect(tree.toJSON()).toBeNull()
  })
})
