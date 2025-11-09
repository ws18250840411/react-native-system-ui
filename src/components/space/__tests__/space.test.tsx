import React from 'react'
import renderer from 'react-test-renderer'

import Space from '..'

describe('Space', () => {
  it('renders horizontal spacing', () => {
    const tree = renderer.create(
      <Space gap={10}>
        <span>1</span>
        <span>2</span>
      </Space>
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('supports vertical direction and divider', () => {
    const tree = renderer.create(
      <Space direction="vertical" divider={<span>|</span>}>
        <span>Top</span>
        <span>Bottom</span>
      </Space>
    )

    expect(tree.root.findAllByType('span')).toHaveLength(3)
  })
})
