import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View } from 'react-native'

import Rate from '..'

describe('Rate', () => {
  it('updates value when pressing icons', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate defaultValue={1} onChange={handleChange} />)

    const items = tree.root.findAllByType(Pressable)
    act(() => {
      items[2].props.onPress?.({ nativeEvent: { locationX: 20 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it('does not select half when allowHalf is false', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[0].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('supports half selection', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate allowHalf onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[0].props.onPress?.({ nativeEvent: { locationX: 5 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(0.5)
  })

  it('still allows click when touchable is false', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate touchable={false} onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[3].props.onPress?.({ nativeEvent: { locationX: 20 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('only calls onIconPress when value changes', () => {
    const handleChange = jest.fn()
    const handleIconPress = jest.fn()
    const tree = renderer.create(
      <Rate
        defaultValue={1}
        allowHalf
        onChange={handleChange}
        onIconPress={handleIconPress}
      />,
    )

    const items = tree.root.findAllByType(Pressable)

    act(() => {
      items[1].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).toHaveBeenCalledWith(1.5)
    expect(handleIconPress).toHaveBeenCalledWith(1.5)

    handleChange.mockClear()
    handleIconPress.mockClear()

    act(() => {
      items[1].props.onPress?.({ nativeEvent: { locationX: 1 } } as any)
    })

    expect(handleChange).not.toHaveBeenCalled()
    expect(handleIconPress).not.toHaveBeenCalled()
  })

  it('supports count as string', () => {
    const tree = renderer.create(<Rate count="8" />)
    const items = tree.root.findAllByType(Pressable)
    expect(items.length).toBe(8)
  })

  it('does not render interactive nodes when disabled', () => {
    const handleChange = jest.fn()
    const tree = renderer.create(<Rate disabled onChange={handleChange} />)
    const items = tree.root.findAllByType(Pressable)
    expect(items.length).toBe(0)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports custom character', () => {
    const tree = renderer.create(<Rate count={1} character="A" value={1} />)
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('A')
  })

  it('respects readOnly prop', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Rate count={5} value={3} readOnly onChange={onChange} />
    )
    
    // Should render as View (not interactive)
    const items = tree.root.findAllByProps({ accessibilityRole: 'image' })
    expect(items.length).toBe(5)
    
    // Should not have any Pressable with role="button"
    const buttons = tree.root.findAllByProps({ accessibilityRole: 'button' })
    expect(buttons.length).toBe(0)
  })

  it('renders custom icons', () => {
    const CustomIcon = (props: any) => <Text {...props}>Icon</Text>
    const tree = renderer.create(
      <Rate count={1} icon={<CustomIcon />} value={1} />
    )
    
    const icon = tree.root.findByType(CustomIcon)
    expect(icon).toBeDefined()
  })
})
