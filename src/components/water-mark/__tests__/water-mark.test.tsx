import React from 'react'
import renderer from 'react-test-renderer'
import { Text } from 'react-native'

import WaterMark from '..'

describe('WaterMark', () => {
  it('renders repeated text nodes', () => {
    const tree = renderer.create(
      <WaterMark content="RN" fullPage={false} style={{ width: 100, height: 100 }} />
    )

    const texts = tree.root.findAllByType(Text)
    expect(texts.length).toBeGreaterThan(0)
  })
})
