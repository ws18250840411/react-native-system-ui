import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text, View } from 'react-native'

import Divider from '..'

describe('Divider', () => {
  it('renders text content with themed typography', () => {
    const tree = renderer.create(<Divider>内容</Divider>)
    const text = tree.root.findByType(Text)
    const textStyle = StyleSheet.flatten(text.props.style)

    expect(text.props.children).toBe('内容')
    expect(textStyle.fontSize).toBeGreaterThan(0)
  })

  it('applies custom line color and dashed style', () => {
    const tree = renderer.create(<Divider dashed lineColor="#123456" />)
    const views = tree.root.findAllByType(View)
    const line = views[1]
    const lineStyle = StyleSheet.flatten(line.props.style)

    expect(lineStyle.borderBottomColor).toBe('#123456')
    expect(lineStyle.borderStyle).toBe('dashed')
  })

  it('renders vertical divider respecting thickness', () => {
    const tree = renderer.create(<Divider type="vertical" hairline={false} />)
    const views = tree.root.findAllByType(View)
    const line = views[1]
    const lineStyle = StyleSheet.flatten(line.props.style)

    expect(lineStyle.borderLeftWidth).toBeGreaterThanOrEqual(1)
  })

  it('respects left content position ratios', () => {
    const tree = renderer.create(<Divider contentPosition="left">Label</Divider>)
    const views = tree.root.findAllByType(View)
    const leftLine = views[1]
    const rightLine = views[3]

    const leftStyle = StyleSheet.flatten(leftLine.props.style)
    const rightStyle = StyleSheet.flatten(rightLine.props.style)

    expect(leftStyle.flexGrow).toBeLessThan(rightStyle.flexGrow)
  })

  it('treats false children as no content', () => {
    const tree = renderer.create(<Divider>{false as any}</Divider>)
    expect(tree.root.findAllByType(Text)).toHaveLength(0)
    expect(tree.root.findAllByType(View)).toHaveLength(2)
  })
})
