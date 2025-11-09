import React from 'react'
import renderer from 'react-test-renderer'

import Cell from '..'

describe('Cell', () => {
  it('renders title and value', () => {
    const tree = renderer.create(<Cell title="Title" value="Value" />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('shows arrow when isLink', () => {
    const tree = renderer.create(<Cell title="Link" isLink />)
    const arrow = tree.root.findAllByProps({ size: 16 })
    expect(arrow.length).toBeGreaterThan(0)
  })
})
