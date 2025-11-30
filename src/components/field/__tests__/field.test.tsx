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

describe('Field', () => {
  it('triggers onChangeText when typing', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Field label='姓名' onChangeText={handleChange} />)
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText('Jack')
    })

    expect(handleChange).toHaveBeenCalledWith('Jack')
  })

  it('clears value when clear icon is pressed', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Field
        defaultValue='foo'
        clearable
        clearTrigger='always'
        onChangeText={handleChange}
      />
    )
    const pressable = tree.root.findByType(Pressable)

    act(() => {
      pressable.props.onPress?.()
    })

    const input = tree.root.findByType(TextInput)
    expect(input.props.value).toBe('')
  })

  it('formats value on blur when formatTrigger is onBlur', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(
      <Field
        defaultValue=''
        formatter={value => value.toUpperCase()}
        formatTrigger='onBlur'
        label='姓名'
        onChangeText={handleChange}
      />
    )
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText('jack')
    })

    expect(handleChange).toHaveBeenLastCalledWith('jack')

    act(() => {
      input.props.onBlur?.({} as any)
    })

    const updatedInput = tree.root.findByType(TextInput)
    expect(updatedInput.props.value).toBe('JACK')
    expect(handleChange).toHaveBeenLastCalledWith('JACK')
  })

  it('triggers onOverlimit when exceeding maxLength', () => {
    const handleOverlimit = jest.fn()
    const tree = renderer.create(
      <Field label='校验' maxLength={2} onOverlimit={handleOverlimit} />
    )
    const input = tree.root.findByType(TextInput)

    act(() => {
      input.props.onChangeText('123')
    })

    expect(handleOverlimit).toHaveBeenCalledWith('123')
    const updatedInput = tree.root.findByType(TextInput)
    expect(updatedInput.props.value).toBe('12')
  })

  it('renders suffix slot and handles clickable press', () => {
    const handleClick = jest.fn()
    const tree = renderer.create(
      <Field
        label='验证码'
        clickable
        onClick={handleClick}
        value=''
        onChangeText={() => {}}
        suffix={<Text testID='suffix-text'>发送</Text>}
      />
    )

    const suffix = tree.root.findByProps({ testID: 'suffix-text' })
    expect(suffix.props.children).toBe('发送')

    const pressables = tree.root.findAllByType(Pressable)
    const rootPressable = pressables.find(node => node.props.accessibilityRole === 'button')
    act(() => {
      rootPressable?.props.onPress?.()
    })
    expect(handleClick).toHaveBeenCalled()
  })

  it('supports custom showWordLimit renderer', () => {
    const tree = renderer.create(
      <Field
        label='备注'
        value='hi'
        maxLength={20}
        onChangeText={() => {}}
        showWordLimit={({ currentCount, maxLength }) => (
          <Text testID='word-limit'>{currentCount + '/' + maxLength}</Text>
        )}
      />
    )

    const counter = tree.root.findByProps({ testID: 'word-limit' })
    expect(counter.props.children).toBe('2/20')
  })
})
