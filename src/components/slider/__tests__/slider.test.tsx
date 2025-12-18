import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View } from 'react-native'

import Slider from '..'

jest.mock('@react-native-aria/utils', () => ({
  isRTL: jest.fn(() => false),
}))

const getStyleValue = (style: any, key: string) => {
  if (!style) return undefined
  if (Array.isArray(style)) {
    for (const item of style) {
      const value = getStyleValue(item, key)
      if (typeof value !== 'undefined') return value
    }
    return undefined
  }
  if (typeof style === 'object') {
    return style[key]
  }
  return undefined
}

const getMockedIsRTL = () =>
  (jest.requireMock('@react-native-aria/utils') as { isRTL: jest.Mock }).isRTL

describe('Slider', () => {
  beforeEach(() => {
    getMockedIsRTL().mockReturnValue(false)
  })

  it('renders single value slider', () => {
    const tree = renderer.create(<Slider value={30} min={0} max={100} />)
    expect(tree.toJSON()).toBeTruthy()
  })

  it('renders range slider with two thumbs', () => {
    const tree = renderer.create(<Slider range value={[20, 60]} />)
    const thumbViews = tree.root.findAll(
      node =>
        node.type === View &&
        Array.isArray(node.props.style) &&
        node.props.style.some((style: any) => style?.position === 'absolute' && style?.borderWidth !== undefined),
    )
    expect(thumbViews.length).toBeGreaterThanOrEqual(2)
  })

  it('reverses horizontal direction in RTL by default', () => {
    getMockedIsRTL().mockReturnValue(true)

    const tree = renderer.create(<Slider value={0} min={0} max={100} />)
    const thumb = tree.root.findAll(
      node =>
        node.type === View &&
        Array.isArray(node.props.style) &&
        node.props.style.some((style: any) => style?.position === 'absolute' && style?.borderWidth !== undefined),
    )[0]

    expect(getStyleValue(thumb.props.style, 'left')).toBe('100%')
    expect(getStyleValue(thumb.props.style, 'top')).toBe('50%')
  })

  it('centers thumb on cross axis for vertical slider', () => {
    const tree = renderer.create(<Slider vertical value={50} min={0} max={100} />)
    const thumb = tree.root.findAll(
      node =>
        node.type === View &&
        Array.isArray(node.props.style) &&
        node.props.style.some((style: any) => style?.position === 'absolute' && style?.borderWidth !== undefined),
    )[0]

    expect(getStyleValue(thumb.props.style, 'left')).toBe('50%')
    expect(getStyleValue(thumb.props.style, 'top')).toBe('50%')
  })

  it('updates repeatedly without crashing (perf smoke)', () => {
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(<Slider value={0} min={0} max={100} />)
    })

    act(() => {
      for (let i = 1; i <= 200; i += 1) {
        tree!.update(<Slider value={i % 101} min={0} max={100} />)
      }
    })

    expect(tree!.toJSON()).toBeTruthy()
  })
})
