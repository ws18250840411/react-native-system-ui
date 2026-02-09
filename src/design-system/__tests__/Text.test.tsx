import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text as RNText } from 'react-native'

import { ConfigProvider } from '../../components/config-provider'
import { Text } from '../Text'

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (style == null) return {}
  const flat = StyleSheet.flatten(Array.isArray(style) ? style : [style])
  return (flat ?? {}) as Record<string, unknown>
}

describe('Text (theme-aware)', () => {
  it('applies theme fontFamily when inside ConfigProvider', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: 'CustomFont' } } }}>
        <Text>Hello</Text>
      </ConfigProvider>
    )
    const text = tree.root.findByType(RNText)
    const style = flattenStyle(text.props.style)
    expect(style.fontFamily).toBe('CustomFont')
  })

  it('allows style.fontFamily to override theme', () => {
    const tree = renderer.create(
      <ConfigProvider theme={{ foundations: { typography: { fontFamily: 'ThemeFont' } } }}>
        <Text style={{ fontFamily: 'OverrideFont' }}>Hello</Text>
      </ConfigProvider>
    )
    const text = tree.root.findByType(RNText)
    const style = flattenStyle(text.props.style)
    expect(style.fontFamily).toBe('OverrideFont')
  })

  it('uses default fontFamily when outside provider', () => {
    const tree = renderer.create(<Text>Hello</Text>)
    const text = tree.root.findByType(RNText)
    const style = flattenStyle(text.props.style)
    expect(style.fontFamily).toBe('System')
  })
})
