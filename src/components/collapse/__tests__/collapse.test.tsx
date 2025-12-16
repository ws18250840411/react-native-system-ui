import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import Collapse, { type CollapsePanelInstance } from '..'

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

describe('Collapse', () => {
  it('toggles panels in accordion mode', async () => {
    const handleChange = jest.fn()

    const tree = renderer.create(
      <Collapse accordion defaultValue="a" onChange={handleChange}>
        <Collapse.Item name="a" title="A">
          <Text>内容</Text>
        </Collapse.Item>
        <Collapse.Item name="b" title="B">
          <Text>内容</Text>
        </Collapse.Item>
      </Collapse>,
    )

    const pressables = tree.root.findAllByType(Pressable)

    await act(async () => {
      pressables[1].props.onPress?.()
      await flush()
    })

    expect(handleChange).toHaveBeenCalledWith('b')
  })

  it('exposes toggle method via ref', async () => {
    const handleChange = jest.fn()
    const itemRef = React.createRef<CollapsePanelInstance>()

    renderer.create(
      <Collapse defaultValue={[]} onChange={handleChange}>
        <Collapse.Item ref={itemRef} name="a" title="A">
          <Text>内容</Text>
        </Collapse.Item>
      </Collapse>,
    )

    await act(async () => {
      itemRef.current?.toggle(true)
      await flush()
    })

    expect(handleChange).toHaveBeenCalledWith(['a'])
  })
})
