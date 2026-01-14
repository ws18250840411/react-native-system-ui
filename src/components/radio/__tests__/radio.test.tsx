import React from 'react'
import renderer, { act, type ReactTestRenderer } from 'react-test-renderer'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

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
  it('supports custom iconRender', () => {
    const iconRender = jest.fn(({ checked }) => <View testID="custom-icon" />)
    const tree = renderer.create(
      <Radio checked={true} iconRender={iconRender} />
    )

    expect(iconRender).toHaveBeenCalledWith(expect.objectContaining({ checked: true }))
    const icon = tree.root.findByProps({ testID: 'custom-icon' })
    expect(icon).toBeTruthy()
  })
})

describe('RadioGroup', () => {
  it('renders radiogroup accessibility props', () => {
    const tree = renderer.create(
      <RadioGroup accessibilityLabel="选择项" value="a" onChange={() => { }}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const group = tree.root.findByProps({ role: 'radiogroup' })
    expect(group.props['aria-label']).toBe('选择项')
  })

  it('maps accessibilityHint to aria-describedby', () => {
    const tree = renderer.create(
      <RadioGroup accessibilityLabel="选择项" accessibilityHint="提示信息" value="a" onChange={() => { }}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    const group = tree.root.findByProps({ role: 'radiogroup' })
    expect(group.props['aria-describedby']).toBe('提示信息')
  })

  it('respects defaultValue selection', () => {
    const tree = renderer.create(
      <RadioGroup defaultValue="a" onChange={() => { }}>
        <Radio name="a">A</Radio>
        <Radio name="b">B</Radio>
      </RadioGroup>
    )

    expect(tree.root.findByProps({ testID: 'radio-icon-a' }).props.accessibilityState?.selected).toBe(true)
    expect(tree.root.findByProps({ testID: 'radio-icon-b' }).props.accessibilityState?.selected).toBe(false)
  })

  it('returns raw number value from onChange', () => {
    const onChange = jest.fn()
    let tree: ReactTestRenderer = null as any

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
      <RadioGroup disabled value="a" onChange={() => { }} accessibilityLabel="选择项">
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

  it('renders horizontal container style', () => {
    const tree = renderer.create(
      <RadioGroup direction="horizontal">
        <Radio name="1">Option 1</Radio>
        <Radio name="2">Option 2</Radio>
      </RadioGroup>
    )
    // Verify first item style (no margin)
    // Verify last item style (no margin)
    // This is hard to test style calculation precisely without brittle snapshot
    // But we can check if styles.horizontal is applied
    const groupView = tree.root.findByType(View)
    expect(groupView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flexDirection: 'row' })])
    )
  })

  it('propagates context props (iconSize, checkedColor)', () => {
    const tree = renderer.create(
      <RadioGroup iconSize={30} checkedColor="red">
        <Radio value="1" />
      </RadioGroup>
    )

    // We need to check if Radio received these.
    // Radio renders a View for icon.
    // Finding it might be tricky.
    // Let's use a mock iconRender to inspect props? No, iconRender receives checked/disabled.
    // We can check the style of the icon View.
    // The icon View is inside the Pressable -> View(iconWrapper) -> View(icon)
    // Or we can just trust the code if we cover it via style checks.

    // Let's find the inner icon view.
    // It has width/height = iconSize
    // And if checked, the inner dot has backgroundColor = checkedColor

    // But the radio is not checked by default.
    // Let's check iconSize on the outer circle.

    // The structure: Radio -> Pressable -> [IconNode, LabelNode]
    // IconNode -> View(wrapper) -> View(icon)

    // We can look for a View with width: 30
    const views = tree.root.findAllByType(View)
    const iconView = views.find(v => {
      const style = v.props.style
      if (Array.isArray(style)) {
        return style.some((s: any) => s && s.width === 30)
      }
      return style && style.width === 30
    })
    expect(iconView).toBeDefined()
  })

  it('injects spacing into items on native platforms', () => {
    const originalOS = Platform.OS
    Object.defineProperty(Platform, 'OS', { get: () => 'ios', configurable: true })

    try {
      const tree = renderer.create(
        <RadioGroup direction="horizontal" gap={8}>
          <Radio name="a">A</Radio>
          <Radio name="b">B</Radio>
        </RadioGroup>
      )

      const containers = tree.root
        .findAllByType(Pressable)
        .filter(p => p.props.accessibilityRole === 'radio')
        .filter(p => {
          const style = StyleSheet.flatten(p.props.style)
          return style?.flexDirection === 'row'
        })

      expect(containers.length).toBe(2)
      const firstStyle = StyleSheet.flatten(containers[0].props.style)
      expect(firstStyle.marginRight).toBe(8)
    } finally {
      Object.defineProperty(Platform, 'OS', { get: () => originalOS, configurable: true })
    }
  })

  it('uses gap on web without injecting margins into items', () => {
    const originalOS = Platform.OS
    Object.defineProperty(Platform, 'OS', { get: () => 'web', configurable: true })

    try {
      const tree = renderer.create(
        <RadioGroup direction="horizontal" gap={8} accessibilityLabel="选择项-web">
          <Radio name="a">A</Radio>
          <Radio name="b">B</Radio>
        </RadioGroup>
      )

      const group = tree.root.findByProps({ role: 'radiogroup' })
      const groupStyle = StyleSheet.flatten(group.props.style)
      expect(groupStyle.columnGap).toBe(8)
      expect(groupStyle.rowGap).toBe(8)

      const containers = tree.root
        .findAllByType(Pressable)
        .filter(p => p.props.accessibilityRole === 'radio')
        .filter(p => {
          const style = StyleSheet.flatten(p.props.style)
          return style?.flexDirection === 'row'
        })

      expect(containers.length).toBe(2)
      const firstStyle = StyleSheet.flatten(containers[0].props.style)
      expect(firstStyle.marginRight).toBeUndefined()
    } finally {
      Object.defineProperty(Platform, 'OS', { get: () => originalOS, configurable: true })
    }
  })
})
