import React from 'react'
import renderer, { act } from 'react-test-renderer'

import Uploader from '..'
import { PortalHost } from '../../portal'
import ImagePreview from '../../image-preview'

beforeAll(() => {
  ; (global as any).window = (global as any).window ?? {}
    ; (global as any).window.Image = (global as any).window.Image ?? function () { }
})

describe('Uploader', () => {
  it('appends items from onUpload and triggers change', async () => {
    const handleChange = jest.fn()
    const onUpload = jest.fn().mockResolvedValue({ url: 'https://img.com/a.png' })

    let tree!: renderer.ReactTestRenderer
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

    let tree!: renderer.ReactTestRenderer
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

  it('does not delete when onDelete rejects', async () => {
    const handleChange = jest.fn()
    const onDelete = jest.fn().mockRejectedValue(new Error('cancel'))

    let tree!: renderer.ReactTestRenderer
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
    expect(handleChange).not.toHaveBeenCalled()

    await act(() => {
      tree.unmount()
    })
  })

  it('does not call onClickUpload/onUpload when disabled', async () => {
    const handleClickUpload = jest.fn()
    const onUpload = jest.fn().mockResolvedValue({ url: 'https://img.com/a.png' })

    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader
            disabled
            onClickUpload={handleClickUpload}
            onUpload={onUpload}
            uploadText="上传"
          />
        </PortalHost>
      )
    })

    const uploadButton = tree.root.findByProps({ testID: 'rv-uploader-upload' })
    await act(async () => {
      await uploadButton.props.onPress?.({} as any)
    })

    expect(uploadButton.props.disabled).toBe(true)
    expect(handleClickUpload).not.toHaveBeenCalled()
    expect(onUpload).not.toHaveBeenCalled()

    await act(() => {
      tree.unmount()
    })
  })

  it('does not call onClickUpload/onUpload when readOnly', async () => {
    const handleClickUpload = jest.fn()
    const onUpload = jest.fn().mockResolvedValue({ url: 'https://img.com/a.png' })

    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader
            readOnly
            onClickUpload={handleClickUpload}
            onUpload={onUpload}
            uploadText="上传"
          />
        </PortalHost>
      )
    })

    const uploadButton = tree.root.findByProps({ testID: 'rv-uploader-upload' })
    await act(async () => {
      await uploadButton.props.onPress?.({} as any)
    })

    expect(uploadButton.props.disabled).toBe(true)
    expect(handleClickUpload).not.toHaveBeenCalled()
    expect(onUpload).not.toHaveBeenCalled()

    await act(() => {
      tree.unmount()
    })
  })

  it('allows deleting when disabled (disabled only affects upload)', async () => {
    const handleChange = jest.fn()

    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader
            disabled
            defaultValue={[{ url: 'https://img.com/a.png' }]}
            onChange={handleChange}
          />
        </PortalHost>
      )
    })

    const deleteBtn = tree.root.findByProps({ testID: 'rv-uploader-delete-0' })
    await act(async () => {
      await deleteBtn.props.onPress?.({} as any)
    })

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

  it('respects isImageUrl=false (does not open preview)', () => {
    const tree = renderer.create(
      <PortalHost>
        <Uploader
          defaultValue={[{ url: 'https://img.com/a.png', filename: 'a.png' }]}
          isImageUrl={() => false}
        />
      </PortalHost>
    )

    const previewPressable = tree.root.findByProps({ testID: 'rv-uploader-preview-0' })
    act(() => {
      previewPressable.props.onPress?.({})
    })

    const preview = tree.root.findByType(ImagePreview)
    expect(preview.props.visible).toBe(false)

    act(() => {
      tree.unmount()
    })
  })

  it('merges previewOptions callbacks with internal close', () => {
    const handleClosePreview = jest.fn()
    const previewOnClose = jest.fn()
    const previewOnClosed = jest.fn()

    const tree = renderer.create(
      <PortalHost>
        <Uploader
          defaultValue={[{ url: 'https://img.com/a.png' }]}
          onClosePreview={handleClosePreview}
          previewOptions={{
            onClose: previewOnClose,
            onClosed: previewOnClosed,
          }}
        />
      </PortalHost>
    )

    const previewPressable = tree.root.findByProps({ testID: 'rv-uploader-preview-0' })
    act(() => {
      previewPressable.props.onPress?.({})
    })

    let preview = tree.root.findByType(ImagePreview)
    expect(preview.props.visible).toBe(true)

    act(() => {
      preview.props.onClose?.({ index: 0, image: 'https://img.com/a.png' })
    })

    preview = tree.root.findByType(ImagePreview)
    expect(preview.props.visible).toBe(false)
    expect(previewOnClose).toHaveBeenCalled()
    expect(handleClosePreview).toHaveBeenCalled()

    act(() => {
      preview.props.onClosed?.()
    })

    expect(previewOnClosed).toHaveBeenCalled()

    act(() => {
      tree.unmount()
    })
  })

  it('respects maxCount', async () => {
    const onUpload = jest.fn().mockResolvedValue([
      { url: '1.png' },
      { url: '2.png' },
      { url: '3.png' },
    ])

    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader maxCount={2} onUpload={onUpload} />
        </PortalHost>
      )
    })

    const uploadButton = tree.root.findByProps({ testID: 'rv-uploader-upload' })
    await act(async () => {
      await uploadButton.props.onPress?.({})
    })

    // Should only add 2 items
    expect(tree.root.findAllByProps({ testID: 'rv-uploader-item-0' }).length).toBe(1)
    expect(tree.root.findAllByProps({ testID: 'rv-uploader-item-1' }).length).toBe(1)
    // Item 2 should not exist (only 2 items, indices 0 and 1)
    expect(tree.root.findAllByProps({ testID: 'rv-uploader-item-2' }).length).toBe(0)

    // Upload button should be hidden
    expect(tree.root.findAllByProps({ testID: 'rv-uploader-upload' }).length).toBe(0)

    await act(() => {
      tree.unmount()
    })
  })

  it('hides delete button when deletable is false', async () => {
    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader defaultValue={[{ url: '1.png' }]} deletable={false} />
        </PortalHost>
      )
    })

    expect(tree.root.findAllByProps({ testID: 'rv-uploader-delete-0' }).length).toBe(0)

    await act(() => {
      tree.unmount()
    })
  })

  it('hides upload button when showUpload is false', async () => {
    let tree!: renderer.ReactTestRenderer
    await act(async () => {
      tree = renderer.create(
        <PortalHost>
          <Uploader showUpload={false} />
        </PortalHost>
      )
    })

    expect(tree.root.findAllByProps({ testID: 'rv-uploader-upload' }).length).toBe(0)

    await act(() => {
      tree.unmount()
    })
  })
})
