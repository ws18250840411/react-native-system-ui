import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

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

    act(() => {
      ref.current?.toggleAll({ checked: true, skipDisabled: true })
    })

    expect(onChange).toHaveBeenCalledWith(['a'])
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
})
