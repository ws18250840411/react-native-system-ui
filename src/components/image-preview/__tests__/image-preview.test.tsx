import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

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

    const indicators = tree.root.findByProps({ testID: 'rv-image-preview-indicators' })
    expect(indicators).toBeTruthy()

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

  it('does not close on overlay when closeOnlyClickCloseIcon is true', async () => {
    const handleClose = jest.fn()
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <ImagePreview visible images={['https://a.png']} closeOnlyClickCloseIcon onClose={handleClose} />
        </PortalHost>
      )
    })

    const [overlay] = tree.root.findAll(node => node.props.testID === 'rv-image-preview-overlay')
    await act(async () => {
      await overlay.props.onPress?.({})
    })

    expect(handleClose).not.toHaveBeenCalled()

    act(() => {
      tree.unmount()
    })
  })

  it('passes correct reason to beforeClose when overlay pressed', async () => {
    const beforeClose = jest.fn(() => true)
    let tree: renderer.ReactTestRenderer
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <ImagePreview visible images={['https://a.png']} beforeClose={beforeClose} />
        </PortalHost>
      )
    })

    const [overlay] = tree.root.findAll(node => node.props.testID === 'rv-image-preview-overlay')
    await act(async () => {
      await overlay.props.onPress?.({})
    })

    expect(beforeClose).toHaveBeenCalledWith({ reason: 'overlay', index: 0, image: 'https://a.png' })

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

    await act(async () => {
      const swiper = tree.root.findByProps({ testID: 'rv-image-preview-swiper' })
      swiper.props.onChange?.(1)
    })

    expect(handleChange).toHaveBeenLastCalledWith(1)

    act(() => {
      tree.unmount()
    })
  })
})
