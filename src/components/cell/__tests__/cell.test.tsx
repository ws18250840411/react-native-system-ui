import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import Cell from '..'

describe('Cell', () => {
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
