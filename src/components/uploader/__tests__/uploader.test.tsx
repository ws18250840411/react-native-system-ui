import React from 'react'
import renderer, { act } from 'react-test-renderer'

import Uploader from '..'
import { PortalHost } from '../../portal'
import ImagePreview from '../../image-preview'

beforeAll(() => {
  ;(global as any).window = (global as any).window ?? {}
  ;(global as any).window.Image = (global as any).window.Image ?? function () {}
})

describe('Uploader', () => {
  it('appends items from onUpload and triggers change', async () => {
    const handleChange = jest.fn()
    const onUpload = jest.fn().mockResolvedValue({ url: 'https://img.com/a.png' })

    let tree: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader onUpload={onUpload} onChange={handleChange} uploadText="上传" />
        </PortalHost>
      )
    })

    const uploadButton = tree.root.findByProps({ testID: 'rv-uploader-upload' })
    await act(async () => {
      await uploadButton.props.onPress?.({})
    })

    expect(onUpload).toHaveBeenCalled()
    expect(handleChange).toHaveBeenLastCalledWith([{ url: 'https://img.com/a.png', key: expect.any(String) }])
    expect(tree.root.findAllByProps({ testID: 'rv-uploader-item-0' }).length).toBe(1)

    await act(() => {
      tree.unmount()
    })
  })

  it('deletes item after onDelete resolves', async () => {
    const handleChange = jest.fn()
    const onDelete = jest.fn().mockResolvedValue(true)

    let tree: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader
            defaultValue={[{ url: 'https://img.com/a.png' }]}
            onDelete={onDelete}
            onChange={handleChange}
          />
        </PortalHost>
      )
    })

    const deleteBtn = tree.root.findByProps({ testID: 'rv-uploader-delete-0' })
    await act(async () => {
      await deleteBtn.props.onPress?.({})
    })

    expect(onDelete).toHaveBeenCalled()
    expect(handleChange).toHaveBeenLastCalledWith([])

    await act(() => {
      tree.unmount()
    })
  })

  it('opens preview when pressing an item', () => {
    const handleClosePreview = jest.fn()

    const tree = renderer.create(
      <PortalHost>
        <Uploader
          defaultValue={[{ url: 'https://img.com/a.png' }]}
          onClosePreview={handleClosePreview}
        />
      </PortalHost>
    )

    const previewPressable = tree.root.findByProps({ testID: 'rv-uploader-preview-0' })
    act(() => {
      previewPressable.props.onPress?.({})
    })

    const preview = tree.root.findByType(ImagePreview)
    expect(preview.props.visible).toBe(true)

    act(() => {
      preview.props.onClose?.()
    })

    expect(handleClosePreview).toHaveBeenCalled()

    act(() => {
      tree.unmount()
    })
  })
})
