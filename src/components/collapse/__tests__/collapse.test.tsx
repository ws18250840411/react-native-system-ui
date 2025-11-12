import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Collapse from '..'

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

describe('Collapse', () => {
  it('toggles panels in accordion mode', async () => {
    const handleChange = jest.fn()

    const tree = renderer.create(
      <Collapse accordion defaultValue="a" onChange={handleChange}>
        <Collapse.Panel name="a" title="A">
          <Text>内容</Text>
        </Collapse.Panel>
        <Collapse.Panel name="b" title="B">
          <Text>内容</Text>
        </Collapse.Panel>
      </Collapse>,
    )

    const pressables = tree.root.findAllByType(Pressable)

    await act(async () => {
      pressables[1].props.onPress?.()
      await flush()
    })

    expect(handleChange).toHaveBeenCalledWith('b')
  })
})
