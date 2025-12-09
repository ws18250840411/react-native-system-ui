import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { TextInput } from 'react-native'

const globalAny: any = global
if (!globalAny.document) {
  globalAny.document = {
    createElement: () => ({ style: {} }),
    body: { appendChild: () => {} },
  }
}

import Field from '..'

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
})
