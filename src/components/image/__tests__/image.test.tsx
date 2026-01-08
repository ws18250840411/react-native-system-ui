import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Image as RNImage, StyleSheet, Text, View } from 'react-native'

import Image from '..'

jest.mock('react-native-svg', () => {
  const { View } = require('react-native')
  return {
    SvgUri: (props: any) => <View {...props} testID="mock-svg-uri" />,
  }
})

beforeAll(() => {
  ; (global as any).window = (global as any).window ?? {}
    ; (global as any).window.Image = (global as any).window.Image ?? function () { }
})

describe('Image', () => {
  it('shows loading text before load', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" loadingText="加载中" />)
    const overlay = tree.root.findByProps({ testID: 'rv-image-loading' })
    const text = overlay.findByType(Text)
    expect(text.props.children).toBe('加载中')
  })

  it('shows error fallback when load fails', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        fallback={<Text>出错</Text>}
      />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onError?.({})
    })
    const overlay = tree.root.findAllByProps({ testID: 'rv-image-error' })
    expect(overlay.length).toBe(1)
    // overlay renders fallback text so we still ensure text is correct
    const errorText = tree.root.findAllByType(Text).find((node) => node.props.children === '出错')
    expect(errorText?.props.children).toBe('出错')
  })

  it('accepts non-text loadingText nodes', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        loadingText={<View testID="custom-loading" />}
      />
    )
    const overlay = tree.root.findByProps({ testID: 'rv-image-loading' })
    expect(overlay.findByProps({ testID: 'custom-loading' })).toBeDefined()
  })

  it('accepts non-text errorText nodes', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        errorText={<View testID="custom-error" />}
      />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onError?.({})
    })
    const overlay = tree.root.findByProps({ testID: 'rv-image-error' })
    expect(overlay.findByProps({ testID: 'custom-error' })).toBeDefined()
  })

  it('applies layout styles from `style` to the container', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        style={{ width: 100, height: 80 }}
      />
    )
    const json = tree.toJSON() as any
    expect(String(json.props.style.width)).toContain('100')
    expect(String(json.props.style.height)).toContain('80')
  })

  it('renders children', () => {
    const tree = renderer.create(
      <Image src="https://example.com/a.png" showLoading={false}>
        <Text>Child</Text>
      </Image>
    )
    const child = tree.root.findByType(Text)
    expect(child.props.children).toBe('Child')
  })

  it('applies round style', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" round />)
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.borderRadius).toBe(9999)
  })

  it('applies custom radius', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" radius={8} />)
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.borderRadius).toBe(8)
  })

  it('clips when corner radius is provided via containerStyle', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        showLoading={false}
        containerStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 6 }}
      />
    )
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.overflow).toBe('hidden')
    expect(style.borderTopLeftRadius).toBe(8)
    expect(style.borderTopRightRadius).toBe(6)

    const rnImage = tree.root.findByType(RNImage)
    const imageStyle = StyleSheet.flatten(rnImage.props.style)
    expect(imageStyle.borderTopLeftRadius).toBe(8)
    expect(imageStyle.borderTopRightRadius).toBe(6)
  })

  it('clips when corner radius is provided via style', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        showLoading={false}
        style={{ width: 100, height: 80, borderBottomLeftRadius: 10, borderBottomRightRadius: 12 }}
      />
    )
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.overflow).toBe('hidden')
    expect(style.borderBottomLeftRadius).toBe(10)
    expect(style.borderBottomRightRadius).toBe(12)

    const rnImage = tree.root.findByType(RNImage)
    const imageStyle = StyleSheet.flatten(rnImage.props.style)
    expect(imageStyle.borderBottomLeftRadius).toBe(10)
    expect(imageStyle.borderBottomRightRadius).toBe(12)
  })

  it('maps fit prop to resizeMode', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" fit="contain" />)
    const rnImage = tree.root.findByType(RNImage)
    expect(rnImage.props.resizeMode).toBe('contain')
  })

  it('prioritizes source prop over src', () => {
    const source = { uri: 'https://example.com/source.png' }
    const tree = renderer.create(
      <Image src="https://example.com/src.png" source={source} />
    )
    const rnImage = tree.root.findByType(RNImage)
    expect(rnImage.props.source).toBe(source)
  })

  it('calls onLoad callback', () => {
    const onLoad = jest.fn()
    const tree = renderer.create(
      <Image src="https://example.com/a.png" onLoad={onLoad} />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onLoad?.({ nativeEvent: {} })
    })
    expect(onLoad).toHaveBeenCalled()
  })

  it('renders SvgUri for .svg source', () => {
    const { Platform } = require('react-native')
    const originalOS = Platform.OS
    Object.defineProperty(Platform, 'OS', { get: () => 'ios', configurable: true })

    const tree = renderer.create(<Image src="https://example.com/icon.svg" />)
    const svgUri = tree.root.findByProps({ testID: 'mock-svg-uri' })
    expect(svgUri.props.uri).toBe('https://example.com/icon.svg')

    Object.defineProperty(Platform, 'OS', { get: () => originalOS, configurable: true })
  })

  it('hides loading when showLoading is false', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" showLoading={false} />)
    const overlay = tree.root.findAllByProps({ testID: 'rv-image-loading' })
    expect(overlay.length).toBe(0)
  })

  it('hides error when showError is false', () => {
    const tree = renderer.create(
      <Image src="https://example.com/a.png" showError={false} />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onError?.({})
    })
    const overlay = tree.root.findAllByProps({ testID: 'rv-image-error' })
    expect(overlay.length).toBe(0)
  })

  it('renders as Pressable when onPress is provided', () => {
    const onPress = jest.fn()
    const { Pressable } = require('react-native')
    const tree = renderer.create(<Image src="https://example.com/a.png" onPress={onPress} />)
    const pressable = tree.root.findByType(Pressable)
    expect(pressable).toBeDefined()
    pressable.props.onPress()
    expect(onPress).toHaveBeenCalled()
  })

  it('merges padding and border styles into container', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        style={{ padding: 10, borderWidth: 2, borderColor: 'red' }}
      />
    )
    const view = tree.root.findByType(View) // Container is View (no onPress)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.padding).toBe(10)
    expect(style.borderWidth).toBe(2)
    expect(style.borderColor).toBe('red')

    // Image should NOT have these styles
    const rnImage = tree.root.findByType(RNImage)
    const imageStyle = StyleSheet.flatten(rnImage.props.style)
    expect(imageStyle.padding).toBeUndefined()
    expect(imageStyle.borderWidth).toBeUndefined()
  })

  it('prioritizes style over containerStyle for borderRadius', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        containerStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 20 }}
      />
    )
    const view = tree.root.findByType(View)
    const style = StyleSheet.flatten(view.props.style)
    expect(style.borderRadius).toBe(20)
  })
})
