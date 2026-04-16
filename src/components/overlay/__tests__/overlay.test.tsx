import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'
jest.mock('../../../hooks/aria/rn-aria/overlays', () => {
  const React = require('react') as typeof import('react'); const { View } = require('react-native')
  return {
    OverlayContainer: ({ children, style }: { children?: React.ReactNode; style?: unknown }) => <View style={style}>{children}</View>,
    OverlayProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  }
})
jest.mock('../../../hooks/aria/rn-aria/interactions', () => ({ useKeyboardDismissable: jest.fn() }))
import Overlay from '..'
describe('Overlay', () => {
  const roots: renderer.ReactTestRenderer[] = []
  const r = (n: React.ReactElement) => { const t = renderer.create(n); roots.push(t); return t }
  afterEach(() => { act(() => { roots.splice(0).forEach(x => x.unmount()) }) })
  it('renders when isOpen is true', () => {
    const t = r(<Overlay isOpen><Text testID="overlay-child">content</Text></Overlay>)
    expect(t.root.findByProps({ testID: 'overlay-child' }).props.children).toBe('content')
  })
  it('supports visible alias', () => {
    const t = r(<Overlay visible><Text testID="overlay-visible">alias</Text></Overlay>)
    expect(t.root.findByProps({ testID: 'overlay-visible' }).props.children).toBe('alias')
  })
  it('renders nothing when not open', () => { expect(r(<Overlay isOpen={false} />).toJSON()).toBeNull() })
})
