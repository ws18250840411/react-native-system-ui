import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Image as RNImage, Text } from 'react-native'

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
})
