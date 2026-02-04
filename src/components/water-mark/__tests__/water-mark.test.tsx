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
    
    const tree = renderer.create(
      <WaterMark content="RN" fullPage={false} width={50} height={50} gapX={0} gapY={0} />
    )

    
    const root = tree.root.findByType(View)
    act(() => {
      root.props.onLayout({ nativeEvent: { layout: { width: 100, height: 100 } } })
    })

    
    
    
    
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

    
    
    
    

    
    const views = tree.root.findAllByType(View)
    const rotatedView = views.find(v => {
      const style = StyleSheet.flatten(v.props.style)
      return style?.transform?.some((t: any) => t.rotate === '45deg')
    })

    expect(rotatedView).toBeTruthy()

    
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

  it('falls back when numeric props are NaN', () => {
    const tree = renderer.create(
      <WaterMark
        rotate={Number.NaN}
        opacity={Number.NaN}
        width={Number.NaN}
        height={Number.NaN}
        gapX={Number.NaN}
        gapY={Number.NaN}
        fullPage={false}
      />
    )

    act(() => {
      tree.root.findByType(View).props.onLayout({
        nativeEvent: { layout: { width: 100, height: 100 } },
      })
    })

    const views = tree.root.findAllByType(View)
    const rotatedView = views.find(v => {
      const style = StyleSheet.flatten(v.props.style)
      return style?.transform?.some((t: any) => t.rotate === '-22deg')
    })
    expect(rotatedView).toBeTruthy()

    const text = tree.root.findAllByType(Text)[0]
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.opacity).toBe(0.15)
  })
})
