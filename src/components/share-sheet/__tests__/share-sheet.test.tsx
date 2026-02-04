import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text, View } from 'react-native'

import ShareSheet from '..'
import { Portal, PortalHost } from '../../portal'
import Popup from '../../popup'

describe('ShareSheet', () => {
  const roots: renderer.ReactTestRenderer[] = []
  const render = (node: React.ReactElement) => {
    const root = renderer.create(node)
    roots.push(root)
    return root
  }

  afterEach(() => {
    act(() => {
      roots.splice(0).forEach(root => root.unmount())
      Portal.clear()
    })
  })

  it('fires onSelect when option pressed', () => {
    const onSelect = jest.fn()
    const tree = render(
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

  it('calls option.onPress when option selected', () => {
    const optionOnPress = jest.fn()
    const tree = render(
      <PortalHost>
        <ShareSheet
          visible
          closeOnSelect={false}
          options={[[{ name: '微信', icon: <></>, onPress: optionOnPress }]]}
          onClose={() => {}}
        />
      </PortalHost>
    )

    const option = tree.root.findByProps({ testID: 'rv-share-sheet-item-0' })
    act(() => {
      option.props.onPress?.({})
    })

    expect(optionOnPress).toHaveBeenCalled()
    expect(optionOnPress.mock.calls[0][0].name).toBe('微信')
  })

  it('renders custom title node without nesting in Text', () => {
    const tree = render(
      <PortalHost>
        <ShareSheet visible title={<View testID="custom-title" />} onClose={() => {}} />
      </PortalHost>
    )

    const title = tree.root.findByProps({ testID: 'custom-title' })
    expect(title.parent?.type).not.toBe(Text)
  })

  it('calls onCancel when cancel tapped', () => {
    const onCancel = jest.fn()
    const onClose = jest.fn()
    const tree = render(
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

  it('renders description', () => {
    const tree = render(
      <PortalHost>
        <ShareSheet visible description="desc" />
      </PortalHost>
    )
    const texts = tree.root.findAllByType(Text)
    expect(texts.some(t => t.props.children === 'desc')).toBe(true)
  })

  it('renders multi-row options', () => {
    const tree = render(
      <PortalHost>
        <ShareSheet
          visible
          options={[
            [{ name: 'A', icon: <></> }],
            [{ name: 'B', icon: <></> }],
          ]}
        />
      </PortalHost>
    )
    
    
    
    const item0 = tree.root.findAllByProps({ testID: 'rv-share-sheet-item-0' })
    const item1 = tree.root.findAllByProps({ testID: 'rv-share-sheet-item-1' })
    
    expect(item0.length).toBeGreaterThan(0)
    expect(item1.length).toBeGreaterThan(0)
  })

  it('forces popup placement and merges popup style', () => {
    const tree = render(
      <PortalHost>
        <ShareSheet visible placement="top" style={{ padding: 123 }} />
      </PortalHost>,
    )

    const popup = tree.root.findByType(Popup)
    expect(popup.props.placement).toBe('bottom')
    expect(Array.isArray(popup.props.style)).toBe(true)
  })
})
