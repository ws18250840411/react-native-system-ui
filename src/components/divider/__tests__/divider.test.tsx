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
    const tree = renderer.create(<Divider dashed lineColor="#123456" hairline={false} />)
    
    
    const lineView = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.borderBottomColor === '#123456'
    })[0]

    const style = StyleSheet.flatten(lineView.props.style)
    expect(style.borderBottomColor).toBe('#123456')
    expect(style.borderStyle).toBe('dashed')
  })

  it('applies dashed style in hairline mode', () => {
    const tree = renderer.create(<Divider dashed lineColor="#123456" hairline />)
    const lineView = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.borderBottomColor === '#123456'
    })[0]

    const style = StyleSheet.flatten(lineView.props.style)
    expect(style.borderBottomColor).toBe('#123456')
    expect(style.borderStyle).toBe('dashed')
  })

  it('respects left content position ratios', () => {
    const tree = renderer.create(<Divider contentPosition="left">Label</Divider>)
    
    
    
    
    
    
    
    
    const root = tree.root.findByType(View) 
    
    
    
    
    const container = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.flexDirection === 'row' && style?.width === '100%'
    })[0]
    
    
    
    const children = container.props.children
    
    
    
    
    const json = tree.toJSON() as any
    const leftFlex = json.children[0]
    const rightFlex = json.children[2]
    
    const leftStyle = StyleSheet.flatten(leftFlex.props.style)
    const rightStyle = StyleSheet.flatten(rightFlex.props.style)
    
    expect(leftStyle.flexGrow).toBeLessThan(rightStyle.flexGrow)
  })

  it('treats false children as no content', () => {
    const tree = renderer.create(<Divider>{false as any}</Divider>)
    expect(tree.root.findAllByType(Text)).toHaveLength(0)
    
    
    
    const json = tree.toJSON() as any
    
    expect(json.children).toHaveLength(1)
  })

  it('renders vertical divider without content', () => {
    const tree = renderer.create(<Divider orientation="vertical">内容</Divider>)
    expect(tree.root.findAllByType(Text)).toHaveLength(0)
  })
})
