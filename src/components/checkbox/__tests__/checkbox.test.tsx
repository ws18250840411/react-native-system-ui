import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import { Checkbox } from '..'
import { CheckboxGroup } from '../CheckboxGroup'

describe('Checkbox', () => {
  it('toggles uncontrolled state', () => {
    const tree = renderer.create(<Checkbox aria-label="选项A">选项A</Checkbox>)

    const pressable = tree.root.findAllByType(Pressable)[0]
    act(() => {
      pressable.props.onPress()
    })

    const iconText = tree.root.findAllByType(Text).find(node => node.props.children === '✓')
    expect(iconText).toBeTruthy()
  })

  it('defaults accessibilityLabel to text content', () => {
    const tree = renderer.create(<Checkbox>选项A</Checkbox>)
    const pressable = tree.root.findByType(Pressable)
    expect(pressable.props.accessibilityLabel).toBe('选项A')
  })

  it('respects controlled checked prop', () => {
    const tree = renderer.create(<Checkbox checked>受控</Checkbox>)
    const iconText = tree.root.findAllByType(Text).find(node => node.props.children === '✓')
    expect(iconText).toBeTruthy()
  })

  it('supports custom icon renderer', () => {
    const tree = renderer.create(
      <Checkbox iconRender={({ checked }) => <Text>{checked ? 'yes' : 'no'}</Text>} defaultChecked>
        自定义
      </Checkbox>
    )
    const iconText = tree.root.findAllByType(Text).find(node => node.props.children === 'yes')
    expect(iconText).toBeTruthy()
  })

  it('accepts non-text label nodes', () => {
    expect(() =>
      renderer.create(
        <Checkbox aria-label="非文本">
          <View testID="label-node" />
        </Checkbox>
      )
    ).not.toThrow()
  })
})

describe('CheckboxGroup', () => {
  it('notifies value changes', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <CheckboxGroup value={['a']} onChange={onChange}>
        <Checkbox name="a" aria-label="选项A">A</Checkbox>
        <Checkbox name="b" aria-label="选项B">B</Checkbox>
      </CheckboxGroup>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const first = pressables[0]
    act(() => {
      first.props.onPress()
    })

    expect(onChange).toHaveBeenCalledWith([])
  })

  it('toggleAll respects skipDisabled', () => {
    const ref = React.createRef<{ toggleAll: (options?: any) => void }>()
    const onChange = jest.fn()
    act(() => {
      renderer.create(
        <CheckboxGroup ref={ref} defaultValue={['a']} onChange={onChange}>
          <Checkbox name="a" aria-label="选项A">
            A
          </Checkbox>
          <Checkbox name="b" disabled aria-label="选项B">
            B
          </Checkbox>
        </CheckboxGroup>
      )
    })

    act(() => {
      ref.current?.toggleAll({ checked: true, skipDisabled: true })
    })

    expect(onChange).toHaveBeenCalledWith(['a'])
  })

  it('toggleAll supports empty string values', () => {
    const ref = React.createRef<{ toggleAll: (options?: any) => void }>()
    const onChange = jest.fn()

    act(() => {
      renderer.create(
        <CheckboxGroup ref={ref} defaultValue={[]} onChange={onChange}>
          <Checkbox name="" aria-label="空值">
            Empty
          </Checkbox>
          <Checkbox name="a" aria-label="选项A">
            A
          </Checkbox>
        </CheckboxGroup>
      )
    })

    act(() => {
      ref.current?.toggleAll(true)
    })

    expect(onChange).toHaveBeenCalledWith(['', 'a'])
  })

  it('sets aria-disabled on group container when disabled', () => {
    const tree = renderer.create(
      <CheckboxGroup disabled accessibilityLabel="分组">
        <Checkbox name="a" aria-label="选项A">A</Checkbox>
      </CheckboxGroup>
    )

    const group = tree.root.findByProps({ 'aria-label': '分组' })
    expect(group.props['aria-disabled']).toBe(true)
    expect(group.props[' aria-disabled']).toBeUndefined()
  })

  it('bindGroup=false keeps checkbox standalone inside group', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <CheckboxGroup defaultValue={['a']} onChange={onChange}>
        <Checkbox name="a" aria-label="选项A">
          A
        </Checkbox>
        <Checkbox name="c" bindGroup={false} aria-label="独立">
          C
        </Checkbox>
      </CheckboxGroup>
    )

    const pressables = tree.root.findAllByType(Pressable)
    const standalone = pressables.find(node =>
      node.findAllByType(Text).some(t => t.props.children === 'C')
    )!
    act(() => {
      standalone.props.onPress()
    })

    expect(onChange).toHaveBeenCalledTimes(0)
  })

  it('respects max limit in group', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <CheckboxGroup max={2} onChange={onChange}>
        <Checkbox name="a">A</Checkbox>
        <Checkbox name="b">B</Checkbox>
        <Checkbox name="c">C</Checkbox>
      </CheckboxGroup>
    )

    const checkboxes = tree.root.findAllByType(Pressable)
    expect(checkboxes.length).toBe(3)

    // Select A
    act(() => {
      checkboxes[0].props.onPress()
    })
    expect(onChange).toHaveBeenLastCalledWith(['a'])

    // Select B
    act(() => {
      checkboxes[1].props.onPress()
    })
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b'])

    // Select C (should be ignored)
    act(() => {
      checkboxes[2].props.onPress()
    })
    // Should still be a, b
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b'])
    // Expect 2 calls (A, B). C should not trigger change.
    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
