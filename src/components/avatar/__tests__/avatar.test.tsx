import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, View, Image } from 'react-native'

import Avatar from '..'

beforeAll(() => {
  ; (global as any).window = (global as any).window ?? {}
    ; (global as any).window.Image = (global as any).window.Image ?? function () { }
})

describe('Avatar', () => {
  it('renders fallback text when source missing', () => {
    const tree = renderer.create(<Avatar text="张三" />)
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('张三')
  })

  it('accepts numeric size', () => {
    const tree = renderer.create(<Avatar text="A" size={60} />)
    const pressable = tree.root.findByType(Pressable)
    const style = Array.isArray(pressable.props.style)
      ? Object.assign({}, ...pressable.props.style)
      : pressable.props.style
    expect(style.width).toBe(60)
    expect(style.height).toBe(60)
  })

  it('renders icon', () => {
    const Icon = () => <View testID="icon" />
    const tree = renderer.create(<Avatar icon={<Icon />} />)
    expect(tree.root.findByProps({ testID: 'icon' })).toBeDefined()
  })

  it('renders image src', () => {
    const tree = renderer.create(<Avatar src="https://example.com/avatar.png" />)
    // Avatar uses RN Image internally
    const image = tree.root.findByType(Image)
    expect(image.props.source).toEqual({ uri: 'https://example.com/avatar.png' })
  })

  it('renders image source', () => {
    const source = { uri: 'https://example.com/avatar.png' }
    const tree = renderer.create(<Avatar source={source} />)
    const image = tree.root.findByType(Image)
    expect(image.props.source).toEqual(source)
  })

  it('applies shape styles', () => {
    // Square should have smaller border radius
    const tree = renderer.create(<Avatar text="A" shape="square" size={60} />)
    const pressable = tree.root.findByType(Pressable)
    const style = Array.isArray(pressable.props.style)
      ? Object.assign({}, ...pressable.props.style)
      : pressable.props.style

    // getRadius logic: square -> max(6, min(w, h) / 6) = 60/6 = 10
    expect(style.borderRadius).toBe(10)
  })

  it('applies custom background color', () => {
    const tree = renderer.create(<Avatar text="A" backgroundColor="#123456" />)
    const pressable = tree.root.findByType(Pressable)
    const style = Array.isArray(pressable.props.style)
      ? Object.assign({}, ...pressable.props.style)
      : pressable.props.style
    expect(style.backgroundColor).toBe('#123456')
  })

  it('renders fallback content when image fails to load', () => {
    const tree = renderer.create(
      <Avatar
        src="https://example.com/bad.png"
        text="Fail"
      />
    )
    const rnImage = tree.root.findByType(Image)
    act(() => {
      rnImage.props.onError?.({})
    })
    // Fallback text logic: "Fail" -> "FA"
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('FA')
  })

  it('passes fit prop to Image', () => {
    const tree = renderer.create(<Avatar src="https://example.com/a.png" fit="contain" />)
    const rnImage = tree.root.findByType(Image)
    expect(rnImage.props.resizeMode).toBe('contain')
  })

  it('applies textStyle', () => {
    const tree = renderer.create(<Avatar text="TS" textStyle={{ color: 'red' }} />)
    const text = tree.root.findByType(Text)
    // textStyle might be array or object, StyleSheet.flatten handles it if imported
    // But we need to import StyleSheet first
    const flattened = Array.isArray(text.props.style) 
      ? Object.assign({}, ...text.props.style) 
      : text.props.style
    expect(flattened.color).toBe('red')
  })
})
