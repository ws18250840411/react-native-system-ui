import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView, Text } from 'react-native'

import ImagePreview from '..'
import { PortalHost } from '../../portal'

beforeAll(() => {
  ;(global as any).window = (global as any).window ?? {}
  ;(global as any).window.Image = (global as any).window.Image ?? function () {}
})

describe('ImagePreview', () => {
  it('renders index text and indicators', () => {
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <ImagePreview visible images={['https://a.png', 'https://b.png']} showIndicators />
        </PortalHost>
      )
    })

    const index = tree.root.findByProps({ testID: 'rv-image-preview-index' })
    const text = index.findByType(Text)
    expect(text.props.children).toBe('1 / 2')

    const dots = tree.root.findAll(node => node.props.testID?.startsWith('rv-image-preview-indicator-'))
    expect(dots.length).toBe(2)

    act(() => {
      tree.unmount()
    })
  })

  it('calls onClose when overlay pressed', async () => {
    const handleClose = jest.fn()
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <ImagePreview visible images={['https://a.png']} onClose={handleClose} />
        </PortalHost>
      )
    })

    const [overlay] = tree.root.findAll(node => node.props.testID === 'rv-image-preview-overlay')
    await act(async () => {
      await overlay.props.onPress?.({})
    })

    expect(handleClose).toHaveBeenCalledWith({ index: 0, image: 'https://a.png' })

    act(() => {
      tree.unmount()
    })
  })

  it('updates active index on swipe and notifies onChange', async () => {
    const handleChange = jest.fn()
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <ImagePreview visible images={['https://a.png', 'https://b.png']} onChange={handleChange} />
        </PortalHost>
      )
    })

    const [scroll] = tree.root.findAllByType(ScrollView)
    await act(async () => {
      await scroll.props.onMomentumScrollEnd?.({
        nativeEvent: {
          contentOffset: { x: 375 },
          layoutMeasurement: { width: 375 },
        },
      })
    })

    expect(handleChange).toHaveBeenLastCalledWith(1)

    act(() => {
      tree.unmount()
    })
  })
})
