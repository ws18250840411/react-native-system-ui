import React from 'react'
import renderer from 'react-test-renderer'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Cell from '..'

describe('Cell', () => {
  it('defaults to full width', () => {
    const tree = renderer.create(<Cell title="Title" value="Value" />)
    const container = tree.root.findByType(View)
    const style = StyleSheet.flatten(container.props.style)
    expect(style.width).toBe('100%')
  })

  it('renders title and value', () => {
    const tree = renderer.create(<Cell title="Title" value="Value" />)
    const texts = tree.root.findAllByType(Text).map(node => node.props.children)
    expect(texts).toEqual(expect.arrayContaining(['Title', 'Value']))
  })

  it('shows arrow when isLink', () => {
    const tree = renderer.create(<Cell title="Link" isLink />)
    const arrow = tree.root.findAllByProps({ size: 16 })
    expect(arrow.length).toBeGreaterThan(0)
  })

  it('does not render as Pressable when only isLink is set', () => {
    const tree = renderer.create(<Cell title="Link" isLink />)
    expect(tree.root.findAllByType(Pressable)).toHaveLength(0)
  })

  it('renders as Pressable when onPress is provided', () => {
    const tree = renderer.create(<Cell title="Link" isLink onPress={() => {}} />)
    expect(tree.root.findAllByType(Pressable).length).toBeGreaterThan(0)
  })

  it('renders numeric title and children', () => {
    const tree = renderer.create(
      <Cell title={0} value={0}>
        {0}
      </Cell>
    )
    const texts = tree.root.findAllByType(Text).map(node => node.props.children)
    expect(texts).toEqual(expect.arrayContaining([0]))
  })

  it('accepts non-text label nodes', () => {
    expect(() =>
      renderer.create(
        <Cell title="Title" label={<View testID="label-view" />} />
      )
    ).not.toThrow()
  })
})
