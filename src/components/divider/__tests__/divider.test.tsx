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
    // Find the view that has borderBottomColor
    // Since hairline=false, it uses borderBottomColor on the line view
    const lineView = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.borderBottomColor === '#123456'
    })[0]

    const style = StyleSheet.flatten(lineView.props.style)
    expect(style.borderBottomColor).toBe('#123456')
    expect(style.borderStyle).toBe('dashed')
  })

  it('renders vertical divider respecting thickness', () => {
    const tree = renderer.create(<Divider type="vertical" hairline={false} />)
    const lineView = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.borderLeftWidth !== undefined
    })[0]
    
    const style = StyleSheet.flatten(lineView.props.style)
    expect(style.borderLeftWidth).toBeGreaterThanOrEqual(1)
  })

  it('respects left content position ratios', () => {
    const tree = renderer.create(<Divider contentPosition="left">Label</Divider>)
    // Structure: Root -> [LeftFlex, Content, RightFlex]
    // LeftFlex -> renderLine
    // RightFlex -> renderLine
    
    // We need to find the flex views. They are direct children of root.
    // But root children are in fragment? No, root is View.
    // children are [LeftView, ContentView, RightView]
    
    const root = tree.root.findByType(View) // This might find the first View which is root
    // But verify it's the root container (marginVertical)
    // Actually, `findByType` finds the first match.
    // Let's assume the root is the one with flexDirection row (default)
    
    const container = tree.root.findAll(node => {
        const style = StyleSheet.flatten(node.props.style)
        return style?.flexDirection === 'row' && style?.width === '100%'
    })[0]
    
    // Children of container
    // Since render returns children directly inside View, we can inspect children prop
    const children = container.props.children
    // children is an array or fragment? 
    // In React 18 / renderer, it might be nested.
    // Let's look at `tree.toJSON().children`
    
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
    // Should render as if no content: One flex wrapper with line
    // <View style={{ flexGrow: 1 }}>{renderLine()}</View>
    
    const json = tree.toJSON() as any
    // Should have 1 child (the flex wrapper)
    expect(json.children).toHaveLength(1)
  })
})
