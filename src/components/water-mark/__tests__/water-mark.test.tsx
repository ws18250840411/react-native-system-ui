import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text, Image, View, StyleSheet } from 'react-native'

import WaterMark from '..'

beforeAll(() => {
  ; (global as any).window = (global as any).window ?? {}
    ; (global as any).window.Image = (global as any).window.Image ?? function () { }
})

describe('WaterMark', () => {
  it('renders repeated text nodes', () => {
    // Mock layout
    const tree = renderer.create(
      <WaterMark content="RN" fullPage={false} width={50} height={50} gapX={0} gapY={0} />
    )

    // Trigger onLayout
    const root = tree.root.findByType(View)
    act(() => {
      root.props.onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } })
    })

    // 100/50 = 2 cols, 2 rows. +1 buffer = 3x3 = 9 items?
    // rows = ceil(100 / 50) + 1 = 3
    // cols = ceil(100 / 50) + 1 = 3
    // total = 9
    const texts = tree.root.findAllByType(Text)
    expect(texts.length).toBeGreaterThanOrEqual(4)
  })

  it('renders image watermark', () => {
    const tree = renderer.create(
      <WaterMark
        image={{ src: 'https://example.com/logo.png', width: 40, height: 40 }}
        fullPage={false}
      />
    )

    // Trigger layout
    const root = tree.root.findByType(View)
    act(() => {
      root.props.onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } })
    })

    const images = tree.root.findAllByType(Image)
    expect(images.length).toBeGreaterThan(0)
    expect(images[0].props.source).toEqual({ uri: 'https://example.com/logo.png' })
  })

  it('applies rotation and opacity', () => {
    const tree = renderer.create(
      <WaterMark rotate={45} opacity={0.5} fullPage={false} />
    )

    act(() => {
      tree.root.findByType(View).props.onLayout({
        nativeEvent: { layout: { width: 100, height: 100 } }
      })
    })

    // The rotation is applied to the wrapper of the content
    // We need to find the View wrapping Text/Image
    // Structure: Row -> Col -> ContentWrapper -> Text/Image
    // ContentWrapper has transform rotate

    // Find all views and check style
    const views = tree.root.findAllByType(View)
    const rotatedView = views.find(v => {
      const style = StyleSheet.flatten(v.props.style)
      return style?.transform?.some((t: any) => t.rotate === '45deg')
    })

    expect(rotatedView).toBeTruthy()

    // Opacity is applied to Text or Image
    const text = tree.root.findAllByType(Text)[0]
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.opacity).toBe(0.5)
  })

  it('customizes font style', () => {
    const tree = renderer.create(
      <WaterMark
        font={{ color: 'red', size: 20, weight: 'bold' }}
        fullPage={false}
      />
    )

    act(() => {
      tree.root.findByType(View).props.onLayout({
        nativeEvent: { layout: { width: 100, height: 100 } }
      })
    })

    const text = tree.root.findAllByType(Text)[0]
    const style = StyleSheet.flatten(text.props.style)

    expect(style.color).toBe('red')
    expect(style.fontSize).toBe(20)
    expect(style.fontWeight).toBe('bold')
  })
})
