import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, StyleSheet, Text } from 'react-native'

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

  it('toggles multiple panels in non-accordion mode', async () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Collapse onChange={handleChange}>
        <Collapse.Item name="a" title="A" />
        <Collapse.Item name="b" title="B" />
      </Collapse>
    )

    const pressables = tree.root.findAllByType(Pressable)
    
    // Open A
    await act(async () => {
      pressables[0].props.onPress()
    })
    expect(handleChange).toHaveBeenLastCalledWith(['a'])

    // Open B (A should stay open)
    await act(async () => {
      pressables[1].props.onPress()
    })
    expect(handleChange).toHaveBeenLastCalledWith(['a', 'b'])
  })

  it('respects disabled prop', async () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Collapse disabled onChange={handleChange}>
        <Collapse.Item name="a" title="A" />
      </Collapse>
    )

    expect(tree.root.findAllByType(Pressable)).toHaveLength(0)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('respects item disabled prop', async () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Collapse onChange={handleChange}>
        <Collapse.Item name="a" title="A" disabled />
      </Collapse>
    )

    expect(tree.root.findAllByType(Pressable)).toHaveLength(0)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders disabled style for title/label/content', () => {
    const disabledColor = 'rgb(1, 2, 3)'
    const tree = renderer.create(
      <Collapse
        disabled
        tokensOverride={{ colors: { disabled: disabledColor } }}
      >
        <Collapse.Item name="a" title="A" label="L">
          内容
        </Collapse.Item>
      </Collapse>
    )

    const titleText = tree.root.findAllByType(Text).find(t => t.props.children === 'A')
    const labelText = tree.root.findAllByType(Text).find(t => t.props.children === 'L')
    const contentText = tree.root.findAllByType(Text).find(t => t.props.children === '内容')

    expect(StyleSheet.flatten(titleText?.props.style)?.color).toBe(disabledColor)
    expect(StyleSheet.flatten(labelText?.props.style)?.color).toBe(disabledColor)
    expect(StyleSheet.flatten(contentText?.props.style)?.color).toBe(disabledColor)
  })
})
