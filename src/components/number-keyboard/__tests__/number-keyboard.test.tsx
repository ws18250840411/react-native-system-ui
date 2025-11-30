import React from "react"
import renderer, { act } from "react-test-renderer"
import { Pressable, Text } from "react-native"

import NumberKeyboard from ".."
import { PortalHost } from "../../portal"

const mountedTrees: renderer.ReactTestRenderer[] = []

const renderInHost = (node: React.ReactElement) => {
  const tree = renderer.create(<PortalHost>{node}</PortalHost>)
  mountedTrees.push(tree)
  return tree
}

afterEach(() => {
  act(() => {
    while (mountedTrees.length) {
      mountedTrees.pop()?.unmount()
    }
  })
})

describe("NumberKeyboard", () => {
  it("emits input events and updates value when uncontrolled", () => {
    const handleInput = jest.fn()
    const handleChange = jest.fn()
    const tree = renderInHost(
      <NumberKeyboard visible onInput={handleInput} onChange={handleChange} />
    )

    const key = tree.root.findAllByType(Pressable).find(pressable => {
      const texts = pressable.findAllByType(Text)
      return texts.some(node => typeof node.props.children === "string" && /\d/.test(node.props.children))
    })
    expect(key).toBeDefined()
    act(() => {
      key?.props.onPress()
    })

    expect(handleInput).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.stringMatching(/\d/))
  })

  it("calls delete handler", () => {
    const onDelete = jest.fn()
    const tree = renderInHost(
      <NumberKeyboard visible defaultValue="12" onDelete={onDelete} />
    )
    const keys = tree.root.findAllByType(Pressable)
    const deleteKey = keys[keys.length - 1]
    act(() => {
      deleteKey.props.onPress()
    })
    expect(onDelete).toHaveBeenCalled()
  })
})
