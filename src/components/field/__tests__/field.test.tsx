import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, TextInput } from 'react-native'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

import Field from '..'
import Dialog from '../../dialog'

describe('Field', () => {
  it('runs formatter on blur when formatTrigger is onBlur', () => {
    const handleChange = jest.fn()

    const tree = renderer.create(
      <Field
        defaultValue="1234"
        formatter={val => `(${val})`}
        formatTrigger="onBlur"
        onChangeText={handleChange}
      />,
    )

    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onBlur?.({} as any)
    })

    expect(handleChange).toHaveBeenLastCalledWith('(1234)')
    expect(tree.root.findByType(TextInput).props.value).toBe('(1234)')
  })

  it('renders numeric label', () => {
    const tree = renderer.create(<Field label={0} colon />)
    const texts = tree.root.findAllByType(Text)
    const hasZero = texts.some(node => {
      const children = node.props.children
      return Array.isArray(children) ? children.includes(0) : children === 0
    })
    expect(hasZero).toBe(true)
  })

  it('supports tooltip number message', () => {
    const showSpy = jest.spyOn(Dialog, 'show').mockImplementation(() => 0 as any)

    const tree = renderer.create(<Field label="A" tooltip={0} />)
    const pressables = tree.root.findAllByType(Pressable)
    const tooltip = pressables.find(node => node.props.accessibilityRole === 'button' && typeof node.props.onPress === 'function')

    act(() => {
      tooltip?.props.onPress?.()
    })

    expect(showSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 0 }))
    showSpy.mockRestore()
  })

  it('includes errorMessage in describedBy when it is 0', () => {
    const tree = renderer.create(<Field errorMessage={0 as any} />)
    const input = tree.root.findByType(TextInput)
    expect(Array.isArray(input.props.accessibilityDescribedBy)).toBe(true)
    expect(input.props.accessibilityDescribedBy.length).toBeGreaterThan(0)
  })
})
