import React from 'react'
import renderer from 'react-test-renderer'
import { Text } from 'react-native'

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
})
