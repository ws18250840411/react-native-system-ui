import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { StyleSheet, Text, TextInput } from 'react-native'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

import Search from '..'

describe('Search', () => {
  it('renders label and default action text', () => {
    const tree = renderer.create(
      <Search label='地址' showAction defaultValue='' />
    )

    const labelNode = tree.root.find(node => node.props.children === '地址')
    expect(labelNode).toBeTruthy()

    const actionNode = tree.root.find(node => node.props.children === '取消')
    expect(actionNode).toBeTruthy()
  })

  it('triggers onSearch when submitting', () => {
    const handleSearch = jest.fn()
    const tree = renderer.create(
      <Search defaultValue='coffee' onSearch={handleSearch} />
    )

    const input = tree.root.findByType(TextInput)
    act(() => {
      input.props.onSubmitEditing?.({} as any)
    })

    expect(handleSearch).toHaveBeenCalledWith('coffee')
  })

  it('clears value and fires onCancel when action pressed', () => {
    const handleChange = jest.fn()
    const handleCancel = jest.fn()
    const tree = renderer.create(
      <Search
        defaultValue='hello'
        showAction
        onChange={handleChange}
        onCancel={handleCancel}
      />
    )

    const actionPressable = tree.root.findByProps({ testID: 'rnsu-search-action' })
    act(() => {
      actionPressable.props.onPress?.()
    })

    expect(handleCancel).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('')

    const input = tree.root.findByType(TextInput)
    expect(input.props.value).toBe('')
  })

  it('supports align prop', () => {
    const tree = renderer.create(<Search align="center" />)
    const input = tree.root.findByType(TextInput)
    const flattened = StyleSheet.flatten(input.props.style)
    expect(flattened.textAlign).toBe('center')
  })

  it('does not use default cancel behavior when actionText is element', () => {
    const handleCancel = jest.fn()
    const handleAction = jest.fn()
    const tree = renderer.create(
      <Search
        defaultValue="hello"
        showAction
        onCancel={handleCancel}
        actionText={<Text onPress={handleAction}>搜索</Text>}
      />,
    )

    expect(() => tree.root.findByProps({ testID: 'rnsu-search-action' })).toThrow()

    const actionNode = tree.root.find(node => node.props.children === '搜索')
    act(() => {
      actionNode.props.onPress?.()
    })

    expect(handleAction).toHaveBeenCalled()
    expect(handleCancel).not.toHaveBeenCalled()

    const input = tree.root.findByType(TextInput)
    expect(input.props.value).toBe('hello')
  })
})
