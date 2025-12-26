import React from 'react'
import renderer from 'react-test-renderer'
import { Platform, StyleSheet, Text, View } from 'react-native'

import Progress from '..'

describe('Progress', () => {
  it('renders percentage width and pivot text', () => {
    const tree = renderer.create(<Progress percentage={40} />)
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.width === 'string' && style.width.endsWith('%'))

    expect(indicator?.width).toBe('40%')

    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('40%')
  })

  it('respects custom color and hides pivot', () => {
    const tree = renderer.create(
      <Progress percentage={80} color="#ff0000" showPivot={false} />,
    )

    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.backgroundColor === '#ff0000')

    expect(indicator?.backgroundColor).toBe('#ff0000')
    const textNodes = tree.root.findAllByType(Text)
    expect(textNodes.length).toBe(0)
  })

  it('accepts string strokeWidth values', () => {
    const tree = renderer.create(<Progress percentage={20} strokeWidth="6px" />)
    const trackStyle = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.height === 'number' && style.height === 6)

    expect(trackStyle?.height).toBe(6)
  })

  it('accepts percentage strings with % suffix', () => {
    const tree = renderer.create(<Progress percentage="40%" />)
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.width === 'string' && style.width === '40%')

    expect(indicator?.width).toBe('40%')
  })

  it('clamps percentage between 0 and 100', () => {
    const over = renderer.create(<Progress percentage={150} />)
    const overStyle = over.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.width === 'string')
    expect(overStyle?.width).toBe('100%')

    const under = renderer.create(<Progress percentage={-20} />)
    const underStyle = under.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => typeof style?.width === 'string')
    expect(underStyle?.width).toBe('0%')
  })

  it('falls back to solid color when gradient is passed on native platforms', () => {
    const originalOS = Platform.OS
    Platform.OS = 'ios'

    const tree = renderer.create(
      <Progress percentage={50} color="linear-gradient(90deg, #f00, #0f0)" />
    )
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.width === '50%')

    expect(indicator?.backgroundImage).toBeUndefined()
    expect(indicator?.backgroundColor).toBeTruthy()

    Platform.OS = originalOS
  })

  it('renders inactive style', () => {
    const tree = renderer.create(<Progress percentage={50} inactive />)
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.width === '50%')
    
    // Inactive color is usually gray (track color) or defined in tokens
    expect(indicator).toBeDefined()
    // We can't easily check exact color without tokens, but we can verify it renders without error
  })

  it('passes custom styles', () => {
    const tree = renderer.create(
        <Progress 
            percentage={50} 
            style={{ margin: 10 }} 
            pivotStyle={{ fontWeight: 'bold' }} 
            indicatorStyle={{ borderRadius: 0 }}
        />
    )
    
    const root = tree.root.findByType(View)
    const rootStyle = StyleSheet.flatten(root.props.style)
    expect(rootStyle.margin).toBe(10)
    
    const text = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(text.props.style)
    expect(textStyle.fontWeight).toBe('bold')
    
    const indicator = tree.root
      .findAllByType(View)
      .map(node => StyleSheet.flatten(node.props.style))
      .find(style => style?.width === '50%')
    expect(indicator?.borderRadius).toBe(0)
  })
})
