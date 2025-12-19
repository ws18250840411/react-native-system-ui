import React from 'react'
import renderer, { act, type ReactTestRenderer } from 'react-test-renderer'
import { Pressable, View } from 'react-native'

import { Radio } from '..'
import { RadioGroup } from '../RadioGroup'

describe('Radio', () => {
  it('invokes onChange when toggled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Radio onChange={handleChange}>单选</Radio>)

    const pressable = tree.root.findAllByType(Pressable)[0]
    act(() => {
      pressable.props.onPress()
    })

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('derives accessibilityLabel from numeric children', () => {
    const tree = renderer.create(<Radio>{123}</Radio>)
    const pressable = tree.root.findByType(Pressable)
    expect(pressable.props.accessibilityLabel).toBe('123')
    expect(pressable.props['aria-label']).toBe('123')
  })

  it('renders container pressable when labelDisabled is false', () => {
    const tree = renderer.create(<Radio>单选</Radio>)
    const pressable = tree.root.findByType(Pressable)
    expect(React.Children.toArray(pressable.props.children).length).toBe(2)
  })

  it('renders icon-only pressable when labelDisabled is true', () => {
    const tree = renderer.create(<Radio labelDisabled>单选</Radio>)
    const pressable = tree.root.findByType(Pressable)
    expect(React.Children.toArray(pressable.props.children).length).toBe(1)
  })

  it('marks pressable disabled when disabled', () => {
    const tree = renderer.create(<Radio disabled>单选</Radio>)
    const pressable = tree.root.findByType(Pressable)
    expect(pressable.props.disabled).toBe(true)
    expect(pressable.props.accessibilityState?.disabled).toBe(true)
  })

  it('supports non-text children as label', () => {
    const tree = renderer.create(
      <Radio accessibilityLabel="自定义标签">
        <View testID="custom-label" />
      </Radio>,
    )
    expect(tree.root.findByProps({ testID: 'custom-label' })).toBeTruthy()
  })
})

describe('RadioGroup', () => {
  it('renders radiogroup accessibility props', () => {
    const tree = renderer.create(
      <RadioGroup accessibilityLabel="选择项" value="a" onChange={() => {}}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const group = tree.root.findByProps({ role: 'radiogroup' })
    expect(group.props['aria-label']).toBe('选择项')
  })

  it('maps accessibilityHint to aria-describedby', () => {
    const tree = renderer.create(
      <RadioGroup accessibilityLabel="选择项" accessibilityHint="提示信息" value="a" onChange={() => {}}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const group = tree.root.findByProps({ role: 'radiogroup' })
    expect(group.props['aria-describedby']).toBe('提示信息')
  })

  it('respects defaultValue selection', () => {
    const tree = renderer.create(
      <RadioGroup defaultValue="a" onChange={() => {}}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    expect(tree.root.findByProps({ testID: 'radio-icon-a' }).props.accessibilityState?.selected).toBe(true)
    expect(tree.root.findByProps({ testID: 'radio-icon-b' }).props.accessibilityState?.selected).toBe(false)
  })

  it('returns raw number value from onChange', () => {
    const onChange = jest.fn()
    let tree: ReactTestRenderer

    act(() => {
      tree = renderer.create(
        <RadioGroup value={1} onChange={onChange}>
          <Radio name={1}>A</Radio>
          <Radio name={2}>B</Radio>
        </RadioGroup>
      )
    })

    const icon = tree.root.findByProps({ testID: 'radio-icon-2' })
    act(() => {
      icon.props.onPress()
    })

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('passes disabled state to group and items', () => {
    const tree = renderer.create(
      <RadioGroup disabled value="a" onChange={() => {}} accessibilityLabel="选择项">
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const group = tree.root.findByProps({ role: 'radiogroup' })
    expect(group.props['aria-disabled']).toBe(true)

    expect(tree.root.findByProps({ testID: 'radio-icon-a' }).props.disabled).toBe(true)
    expect(tree.root.findByProps({ testID: 'radio-icon-b' }).props.disabled).toBe(true)
  })

  it('switches selection inside group', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <RadioGroup value="a" onChange={value => onChange(value)}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const icon = tree.root.findByProps({ testID: 'radio-icon-b' })
    act(() => {
      icon.props.onPress()
    })

    expect(onChange).toHaveBeenCalledWith('b')
  })
})
