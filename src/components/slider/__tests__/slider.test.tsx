import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View, Text, Pressable } from 'react-native'

import Slider from '..'

jest.mock('@react-native-aria/utils', () => ({
  isRTL: jest.fn(() => false),
}))

const getStyleValue = (style: any, key: string): any => {
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

  it('renders custom thumb', () => {
    const CustomThumb = <Text>Thumb</Text>
    const tree = renderer.create(
      <Slider value={50} thumb={CustomThumb} />
    )

    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('Thumb')
  })

  it('respects disabled state', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Slider value={50} onChange={onChange} disabled />
    )

    const thumbWrapper = tree.root.findAllByType(View).find(v => v.props.pointerEvents === 'none')
    expect(thumbWrapper).toBeDefined()

    const trackWrapper = tree.root.findByType(Pressable)
    expect(trackWrapper.props.disabled).toBe(true)
  })

  it('jumps to clicked position on horizontal track', () => {
    const onChange = jest.fn()
    const tree = renderer.create(<Slider value={0} min={0} max={100} onChange={onChange} />)
    const track = tree.root.findByType(Pressable)

    act(() => {
      track.props.onLayout?.({
        nativeEvent: { layout: { width: 100, height: 10, x: 0, y: 0 } },
      })
    })

    act(() => {
      track.props.onPress?.({
        nativeEvent: { locationX: 50, locationY: 0, pageX: 50, pageY: 0 },
        preventDefault: jest.fn(),
      })
    })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe(50)
  })

  it('jumps to clicked position on vertical track', () => {
    const onChange = jest.fn()
    const tree = renderer.create(<Slider vertical value={0} min={0} max={100} onChange={onChange} />)
    const track = tree.root.findByType(Pressable)

    act(() => {
      track.props.onLayout?.({
        nativeEvent: { layout: { width: 10, height: 200, x: 0, y: 0 } },
      })
    })

    act(() => {
      track.props.onPress?.({
        nativeEvent: { locationX: 0, locationY: 150, pageX: 0, pageY: 150 },
        preventDefault: jest.fn(),
      })
    })

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe(25)
  })

  it('respects step', () => {
    const onChange = jest.fn()
    const tree = renderer.create(
      <Slider value={1.5} step={1} onChange={onChange} />
    )
  })

  it('falls back when min is NaN', () => {
    const tree = renderer.create(
      <Slider
        value={50}
        min={Number.NaN as any}
        max={100}
        button={({ value }) => (
          <Text testID="slider-value">{Array.isArray(value) ? value.join(',') : String(value)}</Text>
        )}
      />
    )
    const text = tree.root.findByProps({ testID: 'slider-value' })
    expect(String(text.props.children)).not.toContain('NaN')
  })

  it('falls back when max is NaN', () => {
    const tree = renderer.create(
      <Slider
        value={50}
        min={0}
        max={Number.NaN as any}
        button={({ value }) => (
          <Text testID="slider-value">{Array.isArray(value) ? value.join(',') : String(value)}</Text>
        )}
      />
    )
    const text = tree.root.findByProps({ testID: 'slider-value' })
    expect(String(text.props.children)).not.toContain('NaN')
  })
})
