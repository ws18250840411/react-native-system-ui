import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, View } from 'react-native'

import Cell from '..'

const getFlattenedStyle = (node: renderer.ReactTestInstance) =>
  StyleSheet.flatten(node.props.style)

describe('Cell.Group', () => {
  it('does not render outer border in card mode', () => {
    const tree = renderer.create(
      <Cell.Group card>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" />
      </Cell.Group>
    )

    const views = tree.root.findAllByType(View)
    const groupBody = views.find(view => {
      const style = getFlattenedStyle(view)
      return style?.borderRadius != null && style?.marginHorizontal != null
    })

    expect(groupBody).toBeTruthy()
    const flattened = getFlattenedStyle(groupBody!)
    expect(flattened.borderWidth).toBeUndefined()
    expect(flattened.borderTopWidth).toBeUndefined()
    expect(flattened.borderBottomWidth).toBeUndefined()
  })

  it('applies inset margin in card mode', () => {
    const tree = renderer.create(
      <Cell.Group card>
        <Cell title="单元格" value="内容" />
      </Cell.Group>
    )

    const views = tree.root.findAllByType(View)
    const groupBody = views.find(view => {
      const style = getFlattenedStyle(view)
      return style?.borderRadius != null && style?.marginHorizontal != null
    })

    expect(groupBody).toBeTruthy()
    const flattened = getFlattenedStyle(groupBody!)
    expect(flattened.marginHorizontal).toBe(16)
  })

  it('renders top and bottom borders when not inset', () => {
    const tree = renderer.create(
      <Cell.Group>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" />
      </Cell.Group>
    )

    const views = tree.root.findAllByType(View)
    const groupBody = views.find(view => {
      const style = getFlattenedStyle(view)
      return style?.borderTopWidth != null && style?.borderBottomWidth != null
    })

    expect(groupBody).toBeTruthy()
    const flattened = getFlattenedStyle(groupBody!)
    expect(typeof flattened.borderTopWidth).toBe('number')
    expect(typeof flattened.borderBottomWidth).toBe('number')
    expect((flattened.borderTopWidth as number) > 0).toBe(true)
    expect((flattened.borderBottomWidth as number) > 0).toBe(true)
  })
})

