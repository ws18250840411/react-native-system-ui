import React from 'react'
import renderer, { act } from 'react-test-renderer'

import ActionSheet from '..'
import { PortalHost } from '../../portal'

describe('ActionSheet', () => {
  it('calls onSelect when pressing an action', () => {
    const onSelect = jest.fn()
    const onClose = jest.fn()

    const tree = renderer.create(
      <PortalHost>
        <ActionSheet
          visible
          actions={[{ name: 'Edit' }]}
          onSelect={onSelect}
          onClose={onClose}
        />
      </PortalHost>
    )

    const action = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })

    act(() => {
      action.props.onPress?.({})
    })

    expect(onSelect).toHaveBeenCalledWith({ name: 'Edit' }, 0)
    expect(onClose).toHaveBeenCalled()
  })

  it('triggers onCancel when cancel button pressed', () => {
    const onCancel = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <ActionSheet visible cancelText="取消" onCancel={onCancel} />
      </PortalHost>
    )

    const cancel = tree.root.findByProps({ testID: 'rv-action-sheet-cancel' })
    act(() => {
      cancel.props.onPress?.({})
    })

    expect(onCancel).toHaveBeenCalled()
  })
})
