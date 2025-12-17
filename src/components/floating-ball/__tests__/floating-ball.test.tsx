import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text } from 'react-native'

import FloatingBall from '..'
import type { FloatingBallInstance } from '../types'

describe('FloatingBall', () => {
  it('renders children and fires onPress', () => {
    const handlePress = jest.fn()
    const tree = renderer.create(
      <FloatingBall onPress={handlePress}>
        <Text>FB</Text>
      </FloatingBall>
    )

    const pressable = tree.root.findByProps({ testID: 'rv-floating-ball' })
    act(() => {
      pressable.props.onPress?.({})
    })

    expect(handlePress).toHaveBeenCalled()
  })

  it('opens menu and closes on overlay press', () => {
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <FloatingBall
          menu={{
            items: [<Text key="0">item</Text>],
          }}
        />,
      )
    })

    const trigger = tree.root.findByProps({ testID: 'rv-floating-ball' })
    act(() => {
      trigger.props.onPress?.({} as any)
    })

    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(1)

    const [overlay] = tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay')
    act(() => {
      overlay.props.onPress?.({} as any)
    })

    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(0)
    act(() => {
      tree.unmount()
    })
  })

  it('closes menu after item press by default', () => {
    const handleItemPress = jest.fn()

    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <FloatingBall
          menu={{
            items: [
              <Pressable key="0" testID="menu-item" onPress={handleItemPress}>
                <Text>item</Text>
              </Pressable>,
            ],
          }}
        />,
      )
    })

    act(() => {
      tree.root.findByProps({ testID: 'rv-floating-ball' }).props.onPress?.({} as any)
    })

    act(() => {
      tree.root.findByProps({ testID: 'menu-item' }).props.onPress?.({} as any)
    })

    expect(handleItemPress).toHaveBeenCalled()
    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(0)
    act(() => {
      tree.unmount()
    })
  })

  it('keeps menu open when itemClickClose is false', () => {
    const handleItemPress = jest.fn()

    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <FloatingBall
          menu={{
            itemClickClose: false,
            items: [
              <Pressable key="0" testID="menu-item" onPress={handleItemPress}>
                <Text>item</Text>
              </Pressable>,
            ],
          }}
        />,
      )
    })

    act(() => {
      tree.root.findByProps({ testID: 'rv-floating-ball' }).props.onPress?.({} as any)
    })

    act(() => {
      tree.root.findByProps({ testID: 'menu-item' }).props.onPress?.({} as any)
    })

    expect(handleItemPress).toHaveBeenCalled()
    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(1)
    act(() => {
      tree.unmount()
    })
  })

  it('exposes open/close via ref', () => {
    const ref = React.createRef<FloatingBallInstance>()

    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <FloatingBall
          ref={ref}
          menu={{
            items: [<Text key="0">item</Text>],
          }}
        />,
      )
    })

    act(() => {
      ref.current?.open()
    })
    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(1)

    act(() => {
      ref.current?.close()
    })
    expect(tree.root.findAll(node => node.type === Pressable && node.props.testID === 'rv-floating-ball-overlay').length).toBe(0)

    act(() => {
      tree.unmount()
    })
  })
})
