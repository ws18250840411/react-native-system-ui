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

import Input, { type InputInstance } from '..'
import Field from '../../field'

describe('Input', () => {
  it('triggers onChangeText when typing', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Input onChangeText={handleChange} />)
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText?.('Jack')
    })

    expect(handleChange).toHaveBeenCalledWith('Jack')
  })

  it('clears value when clear icon is pressed', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Input defaultValue='foo' clearable clearTrigger='always' onChangeText={handleChange} />
    )
    const clearButton = tree.root.findByType(Pressable)

    act(() => {
      clearButton.props.onPress?.()
    })

    const updatedInput = tree.root.findByType(TextInput)
    expect(updatedInput.props.value).toBe('')
    expect(handleChange).toHaveBeenLastCalledWith('')
  })

  it('filters digit type and enforces maxLength', () => {
    const handleOverlimit = jest.fn()
    const tree = renderer.create(<Input type='digit' maxLength={2} onOverlimit={handleOverlimit} />)
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText?.('123a')
    })

    expect(handleOverlimit).toHaveBeenCalledWith('123')
    expect(tree.root.findByType(TextInput).props.value).toBe('12')
  })

  it('renders prefix and suffix slots', () => {
    const tree = renderer.create(
      <Input
        value=''
        onChangeText={() => {}}
        prefix={<Text testID='prefix'>+86</Text>}
        suffix={<Text testID='suffix'>发送</Text>}
      />
    )

    expect(tree.root.findByProps({ testID: 'prefix' }).props.children).toBe('+86')
    expect(tree.root.findByProps({ testID: 'suffix' }).props.children).toBe('发送')
  })

  it('maps number type to decimal keyboard and exposes imperative ref', () => {
    const handleChange = jest.fn()
    const ref = React.createRef<InputInstance>()
    const tree = renderer.create(<Input ref={ref} type='number' defaultValue='foo' onChangeText={handleChange} />)

    const field = tree.root.findByType(Field)
    expect(field.props.keyboardType).toBe('decimal-pad')

    act(() => {
      ref.current?.clear()
    })
    expect(handleChange).toHaveBeenLastCalledWith('')
    const nativeElement = tree.root.findByType(TextInput).instance
    expect(ref.current?.nativeElement).toBe(nativeElement)
  })
})

describe('Input.TextArea', () => {
  it('renders custom word limit content', () => {
    const tree = renderer.create(
      <Input.TextArea
        defaultValue='hello'
        maxLength={50}
        showWordLimit={({ currentCount }) => <Text testID='counter'>{currentCount}</Text>}
      />
    )

    const counter = tree.root.findByProps({ testID: 'counter' })
    expect(counter.props.children).toBe(5)
  })

  it('autoSize converts px config into Field rows', () => {
    const tree = renderer.create(
      <Input.TextArea autoSize={{ minHeight: 80, maxHeight: 160 }} value='' onChangeText={() => {}} />
    )

    const field = tree.root.findByType(Field)
    expect(field.props.autoSize).toEqual({ minRows: 4, maxRows: 8 })
  })
})
