import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

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

  it('captures horizontal swipes on the root container', () => {
    const tree = renderer.create(
      <SwipeCell
        left={<View />}
        right={<View />}
      >
        <Text>content</Text>
      </SwipeCell>
    )

    const responders = tree.root
      .findAll(node => typeof node.props.onMoveShouldSetResponderCapture === 'function')
      .filter(node => StyleSheet.flatten(node.props.style)?.overflow === 'hidden')

    expect(responders).toHaveLength(1)
  })
})
