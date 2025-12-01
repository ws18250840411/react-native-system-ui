import React from 'react'
import renderer from 'react-test-renderer'
import { Text } from 'react-native'

import Skeleton from '..'

describe('Skeleton', () => {
  it('renders configured rows and title', () => {
    const tree = renderer.create(<Skeleton row={2} title />)
    const rows = tree.root.findAll(node => node.props.testID?.startsWith('rv-skeleton-row-'))
    const unique = new Set(rows.map(row => row.props.testID))
    expect(unique.size).toBe(2)
  })

  it('renders children when loading is false', () => {
    const tree = renderer.create(
      <Skeleton loading={false}>
        <Text>loaded</Text>
      </Skeleton>
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('loaded')
  })
})
