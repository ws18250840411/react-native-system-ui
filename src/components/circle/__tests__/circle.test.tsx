import React from 'react'
import renderer from 'react-test-renderer'

import Circle from '..'

describe('Circle', () => {
  it('renders with rate and children', () => {
    const tree = renderer.create(<Circle rate={50}>50%</Circle>)
    expect(tree.toJSON()).toBeTruthy()
  })
})

