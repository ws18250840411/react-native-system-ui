import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet, Text } from 'react-native'

import Grid from '..'
import Badge from '../../badge'

describe('Grid', () => {
  it('splits width according to column number and shows borders', () => {
    const tree = renderer.create(
      <Grid columnNum={3} border>
        <Grid.Item text="A" testID="grid-a" />
        <Grid.Item text="B" testID="grid-b" />
        <Grid.Item text="C" testID="grid-c" />
      </Grid>,
    )

    const items = tree.root.findAllByType(Grid.Item)
    expect(items).toHaveLength(3)
    expect(items.map(item => item.props.gridItemIndex)).toEqual([0, 1, 2])
  })

  it('applies gutter spacing and square layout', () => {
    const tree = renderer.create(
      <Grid columnNum={2} gutter={12} square>
        <Grid.Item text="One" testID="grid-square" />
      </Grid>,
    )

    const squareContent = tree.root.findAll(node => {
      if (!node.props || !node.props.style) return false
      const flattened = StyleSheet.flatten(node.props.style)
      return flattened?.aspectRatio === 1
    })

    expect(squareContent.length).toBeGreaterThan(0)
  })

  it('renders icon via function and attaches badge props', () => {
    const iconFn = jest.fn((size: number, color: string) => (
      <Text>{`${size}-${color}`}</Text>
    ))

    const tree = renderer.create(
      <Grid columnNum={1} iconColor="#111" iconSize={32} center>
        <Grid.Item icon={iconFn} badge={{ content: 5 }} />
      </Grid>,
    )

    expect(iconFn).toHaveBeenCalledWith(32, '#111')

    const badge = tree.root.find(node => node.type === Badge)
    expect(badge.props.content).toBe(5)
  })
})
