import React from 'react'
import renderer, { ReactTestInstance } from 'react-test-renderer'
import { StyleSheet, TextInput } from 'react-native'

import PasswordInput from '../index'

// Mock TextInput to avoid relying on DOM (react-native-web requires document)
jest.mock('react-native', () => {
  const React = require('react')
  const Actual = jest.requireActual('react-native')
  const MockTextInput = React.forwardRef((props: any, ref) => (
    <mock-text-input {...props} ref={ref} />
  ))
  return {
    ...Actual,
    TextInput: MockTextInput,
  }
})

describe('PasswordInput', () => {
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllTimers()
  })

  it('truncates extra chars when length reached', async () => {
    const onChange = jest.fn()

    const tree = renderer.create(
      <PasswordInput length={4} onChange={onChange} />,
    )

    const input = tree.root.findByType(TextInput)

    await renderer.act(async () => {
      input.props.onChangeText?.('12345')
      await Promise.resolve()
    })

    expect(onChange).toHaveBeenLastCalledWith('1234')
  })

  it('filters non-digit characters in number mode', () => {
    const onChange = jest.fn()

    const tree = renderer.create(
      <PasswordInput type="number" length={6} onChange={onChange} />,
    )

    const input = tree.root.findByType(TextInput)

    renderer.act(() => {
      input.props.onChangeText?.('12a3#b')
    })

    expect(onChange).toHaveBeenLastCalledWith('123')
  })

  it('blinks cursor when focused and stops when disabled', () => {
    jest.useFakeTimers()

    const tree = renderer.create(
      <PasswordInput length={4} autoFocus showCursor />,
    )

    const input = tree.root.findByType(TextInput)

    renderer.act(() => {
      input.props.onFocus?.()
    })

    const getCursorOpacity = () => {
      const cursors = tree.root.findAllByProps({ testID: 'password-input-cursor' })
      if (cursors.length === 0) return 0
      const style = StyleSheet.flatten(cursors[0].props.style)
      return style?.opacity
    }

    expect(getCursorOpacity()).toBe(1)

    renderer.act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(getCursorOpacity()).toBe(0)

    renderer.act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(getCursorOpacity()).toBe(1)

    renderer.act(() => {
      tree.update(<PasswordInput length={4} showCursor disabled />)
    })
    renderer.act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(getCursorOpacity()).toBe(0)
  })
})
