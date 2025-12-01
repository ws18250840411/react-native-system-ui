import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import FloatingBall from '..'

describe('FloatingBall', () => {
  it('renders children and fires onPress', () => {
    const handlePress = jest.fn()
    const tree = renderer.create(
      <FloatingBall onPress={handlePress}>
        <Text>FB</Text>
      </FloatingBall>
    )

    const pressable = tree.root.findByProps({ testID: 'rv-floating-ball' })
    act(() => {
      pressable.props.onPress?.({})
    })

    expect(handlePress).toHaveBeenCalled()
  })
})
