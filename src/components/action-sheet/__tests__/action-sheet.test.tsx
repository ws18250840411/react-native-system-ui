import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View } from 'react-native'

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

  it('does not trigger onCancel when closing via action/overlay', async () => {
    const onClose = jest.fn()
    const onCancel = jest.fn()
    const tree = renderInHost(
      <ActionSheet
        visible
        title="标题"
        actions={[{ name: 'Edit' }]}
        closeOnClickAction
        onClose={onClose}
        onCancel={onCancel}
      />
    )

    const action = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })
    await act(async () => {
      action.props.onPress?.({})
      await Promise.resolve()
    })
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onCancel).not.toHaveBeenCalled()

    const overlay = tree.root.findByProps({ testID: 'popup-overlay' })
    await act(async () => {
      overlay.props.onPress?.({})
      await Promise.resolve()
    })
    expect(onClose).toHaveBeenCalledTimes(2)
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('respects closeOnClickOverlay={false}', async () => {
    const onClose = jest.fn()
    const tree = renderInHost(
      <ActionSheet visible closeOnClickOverlay={false} onClose={onClose} />
    )

    const overlay = tree.root.findByProps({ testID: 'popup-overlay' })
    await act(async () => {
      overlay.props.onPress?.({})
      await Promise.resolve()
    })

    expect(onClose).not.toHaveBeenCalled()
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

  it('triggers onCancel when cancel button pressed', async () => {
    const onCancel = jest.fn()
    const tree = renderInHost(<ActionSheet visible cancelText="取消" onCancel={onCancel} />)

    const cancel = tree.root.findByProps({ testID: 'rv-action-sheet-cancel' })
    await act(async () => {
      cancel.props.onPress?.({})
      await Promise.resolve()
    })

    expect(onCancel).toHaveBeenCalled()
  })

  it('accepts non-text ReactNode content', () => {
    let tree: renderer.ReactTestRenderer | undefined

    expect(() => {
      tree = renderInHost(
        <ActionSheet
          visible
          title={<View testID="as-title" />}
          description={<View testID="as-description" />}
          cancelText={<View testID="as-cancel" />}
          actions={[
            { name: <View testID="as-action-name" />, subname: <View testID="as-action-subname" /> },
          ]}
        />
      )
    }).not.toThrow()

    expect(tree?.root.findByProps({ testID: 'as-title' })).toBeTruthy()
    expect(tree?.root.findByProps({ testID: 'as-description' })).toBeTruthy()
    expect(tree?.root.findByProps({ testID: 'as-cancel' })).toBeTruthy()
    expect(tree?.root.findByProps({ testID: 'as-action-name' })).toBeTruthy()
    expect(tree?.root.findByProps({ testID: 'as-action-subname' })).toBeTruthy()
  })

  it('does not trigger onSelect when action is disabled or loading', () => {
    const onSelect = jest.fn()
    const tree = renderInHost(
      <ActionSheet
        visible
        actions={[
          { name: 'Disabled', disabled: true },
          { name: 'Loading', loading: true },
        ]}
        onSelect={onSelect}
      />
    )

    const disabledAction = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })
    const loadingAction = tree.root.findByProps({ testID: 'rv-action-sheet-item-1' })

    act(() => {
      disabledAction.props.onPress?.({})
      loadingAction.props.onPress?.({})
    })

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('supports beforeClose returning false to prevent close', async () => {
    const onClose = jest.fn()
    const beforeClose = jest.fn().mockReturnValue(false)

    const tree = renderInHost(
      <ActionSheet
        visible
        cancelText="Cancel"
        onClose={onClose}
        beforeClose={beforeClose}
      />
    )

    const cancel = tree.root.findByProps({ testID: 'rv-action-sheet-cancel' })

    await act(async () => {
      cancel.props.onPress?.({})
    })

    expect(beforeClose).toHaveBeenCalledWith('cancel')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not crash when action icon is a string', () => {
    expect(() => {
      renderInHost(
        <ActionSheet
          visible
          actions={[{ name: 'Edit', icon: 'star' }]}
        />
      )
    }).not.toThrow()
  })

  it('does not crash when closeIcon is a string', () => {
    expect(() => {
      renderInHost(
        <ActionSheet visible title="Title" closeable closeIcon="X" />
      )
    }).not.toThrow()
  })

  it('closes via onCancel when onClose is not provided', async () => {
    const onCancel = jest.fn()
    const tree = renderInHost(
      <ActionSheet
        visible
        actions={[{ name: 'Edit' }]}
        closeOnClickAction
        onCancel={onCancel}
      />
    )

    const overlay = tree.root.findByProps({ testID: 'popup-overlay' })
    await act(async () => {
      overlay.props.onPress?.({})
      await Promise.resolve()
    })
    expect(onCancel).toHaveBeenCalledTimes(1)

    const action = tree.root.findByProps({ testID: 'rv-action-sheet-item-0' })
    await act(async () => {
      action.props.onPress?.({})
      await Promise.resolve()
    })
    expect(onCancel).toHaveBeenCalledTimes(2)
  })
})
