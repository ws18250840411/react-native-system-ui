import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, TextInput, Text, View } from 'react-native'

import PasswordInput from '../index'


jest.mock('react-native', () => {
  const React = require('react')
  const Actual = jest.requireActual('react-native')
  const { createElement, forwardRef, useImperativeHandle } = React
  const MockTextInput = forwardRef((props: any, ref: any) => {
    useImperativeHandle(ref, () => ({
      focus: jest.fn(),
      blur: jest.fn(),
      isFocused: jest.fn(),
      clear: jest.fn(),
    }))
    return createElement('mock-text-input', props)
  })
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

  it('triggers onSubmit when length is reached', () => {
    const onSubmit = jest.fn()
    const onChange = jest.fn()
    const tree = renderer.create(
      <PasswordInput length={4} defaultValue="123" onSubmit={onSubmit} onChange={onChange} />
    )

    const input = tree.root.findByType(TextInput)

    renderer.act(() => {
      input.props.onChangeText?.('1234')
    })

    expect(onChange).toHaveBeenCalledWith('1234')
    expect(onSubmit).toHaveBeenCalledWith('1234')
  })

  it('does not trigger onSubmit on mount when already complete', () => {
    const onSubmit = jest.fn()

    renderer.act(() => {
      renderer.create(
        <PasswordInput length={4} value="1234" onSubmit={onSubmit} />
      )
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('triggers onSubmit when controlled value becomes complete', () => {
    const onSubmit = jest.fn()

    const tree = renderer.create(
      <PasswordInput length={4} value="123" onSubmit={onSubmit} />
    )

    renderer.act(() => {
      tree.update(
        <PasswordInput length={4} value="1234" onSubmit={onSubmit} />
      )
    })

    expect(onSubmit).toHaveBeenCalledWith('1234')
  })

  it('toggles mask visibility', () => {
    const tree = renderer.create(
      <PasswordInput length={4} value="1234" mask={false} />
    )

    
    const texts = tree.root.findAllByType(Text)
    const chars = texts.map(t => t.props.children).filter(c => ['1', '2', '3', '4'].includes(c))
    expect(chars.length).toBe(4)

    
    renderer.act(() => {
      tree.update(<PasswordInput length={4} value="1234" mask={true} />)
    })

    const textsAfter = tree.root.findAllByType(Text)
    const charsAfter = textsAfter.map(t => t.props.children).filter(c => ['1', '2', '3', '4'].includes(c))
    expect(charsAfter.length).toBe(0)
  })

  it('renders with gutter', () => {
    const tree = renderer.create(
      <PasswordInput length={4} gutter={10} />
    )

    const views = tree.root.findAllByType(View)
    const gutterCells = views.filter(v => {
      const style = v.props.style
      if (Array.isArray(style)) {
        return style.some((s: any) => s && s.marginLeft === 10)
      }
      return style && style.marginLeft === 10
    })

    
    expect(gutterCells.length).toBe(3)
  })
})
