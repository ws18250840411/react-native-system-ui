import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Image as RNImage, Text, View } from 'react-native'

import Image from '..'

beforeAll(() => {
  ;(global as any).window = (global as any).window ?? {}
  ;(global as any).window.Image = (global as any).window.Image ?? function () {}
})

describe('Image', () => {
  it('shows loading text before load', () => {
    const tree = renderer.create(<Image src="https://example.com/a.png" loadingText="加载中" />)
    const overlay = tree.root.findByProps({ testID: 'rv-image-loading' })
    const text = overlay.findByType(Text)
    expect(text.props.children).toBe('加载中')
  })

  it('shows error fallback when load fails', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        fallback={<Text>出错</Text>}
      />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onError?.({})
    })
    const overlay = tree.root.findAllByProps({ testID: 'rv-image-error' })
    expect(overlay.length).toBe(1)
    // overlay renders fallback text so we still ensure text is correct
    const errorText = tree.root.findAllByType(Text).find((node) => node.props.children === '出错')
    expect(errorText?.props.children).toBe('出错')
  })

  it('accepts non-text loadingText nodes', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        loadingText={<View testID="custom-loading" />}
      />
    )
    const overlay = tree.root.findByProps({ testID: 'rv-image-loading' })
    expect(overlay.findByProps({ testID: 'custom-loading' })).toBeDefined()
  })

  it('accepts non-text errorText nodes', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        errorText={<View testID="custom-error" />}
      />
    )
    const rnImage = tree.root.findByType(RNImage)
    act(() => {
      rnImage.props.onError?.({})
    })
    const overlay = tree.root.findByProps({ testID: 'rv-image-error' })
    expect(overlay.findByProps({ testID: 'custom-error' })).toBeDefined()
  })

  it('applies layout styles from `style` to the container', () => {
    const tree = renderer.create(
      <Image
        src="https://example.com/a.png"
        style={{ width: 100, height: 80 }}
      />
    )
    const json = tree.toJSON() as any
    expect(String(json.props.style.width)).toContain('100')
    expect(String(json.props.style.height)).toContain('80')
  })
})
