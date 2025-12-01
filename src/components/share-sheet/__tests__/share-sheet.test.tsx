import React from 'react'
import renderer, { act } from 'react-test-renderer'

import ShareSheet from '..'
import { PortalHost } from '../../portal'

describe('ShareSheet', () => {
  it('fires onSelect when option pressed', () => {
    const onSelect = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <ShareSheet
          visible
          options={[[{ name: '微信', icon: <></> }]]}
          onSelect={onSelect}
          onClose={() => {}}
        />
      </PortalHost>
    )

    const option = tree.root.findByProps({ testID: 'rv-share-sheet-item-0' })
    act(() => {
      option.props.onPress?.({})
    })

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect.mock.calls[0][0].name).toBe('微信')
  })

  it('calls onCancel when cancel tapped', () => {
    const onCancel = jest.fn()
    const onClose = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <ShareSheet visible cancelText="返回" onCancel={onCancel} onClose={onClose} />
      </PortalHost>
    )

    const cancels = tree.root.findAllByProps({ testID: 'rv-share-sheet-cancel' })
    expect(cancels.length).toBeGreaterThan(0)
    act(() => {
      cancels.forEach(node => node.props.onPress?.({}))
    })

    expect(onClose).toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalled()
  })
})
