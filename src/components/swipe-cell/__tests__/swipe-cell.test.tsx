import React from 'react'
import renderer from 'react-test-renderer'
import { Text, View } from 'react-native'

import SwipeCell from '..'

describe('SwipeCell', () => {
  it('renders content and action slots', () => {
    const tree = renderer.create(
      <SwipeCell
        left={<View />}
        right={<View />}
      >
        <Text>content</Text>
      </SwipeCell>
    )
    expect(tree.toJSON()).toBeTruthy()
  })
})

