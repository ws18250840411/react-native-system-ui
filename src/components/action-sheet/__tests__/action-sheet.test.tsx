import React from 'react'
import renderer, { act } from 'react-test-renderer'

import ActionSheet from '..'
import { PortalHost } from '../../portal'

const mountedTrees: renderer.ReactTestRenderer[] = []

const renderInHost = (node: React.ReactElement) => {
  const tree = renderer.create(<PortalHost>{node}</PortalHost>)
  mountedTrees.push(tree)
  return tree
}

afterEach(() => {
  act(() => {
    while (mountedTrees.length) {
      mountedTrees.pop()?.unmount()
    }
  })
})

describe('ActionSheet', () => {
  it('calls onSelect when pressing an action', () => {
    const onSelect = jest.fn()
    const onClose = jest.fn()

    const tree = renderInHost(
      <ActionSheet
        visible
        actions={[{ name: 'Edit' }]}
        closeOnClickAction
        onSelect={onSelect}
        onClose={onClose}
      />
    )

    const action = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })

    return act(async () => {
      action.props.onPress?.({})
      await Promise.resolve()
    }).then(() => {
      expect(onSelect).toHaveBeenCalledWith({ name: 'Edit' }, 0)
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('does not close by default when selecting action', () => {
    const onSelect = jest.fn()
    const onClose = jest.fn()

    const tree = renderInHost(
      <ActionSheet
        visible
        actions={[{ name: 'Edit' }]}
        onSelect={onSelect}
        onClose={onClose}
      />
    )

    const action = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })

    act(() => {
      action.props.onPress?.({})
    })

    expect(onSelect).toHaveBeenCalledWith({ name: 'Edit' }, 0)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('triggers onCancel when cancel button pressed', () => {
    const onCancel = jest.fn()
    const tree = renderInHost(<ActionSheet visible cancelText="取消" onCancel={onCancel} />)

    const cancel = tree.root.findByProps({ testID: 'rv-action-sheet-cancel' })
    act(() => {
      cancel.props.onPress?.({})
    })

    expect(onCancel).toHaveBeenCalled()
  })
})
