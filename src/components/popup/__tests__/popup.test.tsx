import React from 'react'
import { Animated, BackHandler, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import renderer, { act } from 'react-test-renderer'

import Popup from '..'
import { PortalHost } from '../../portal'

const getStyleValue = (style: any, key: string): any => {
  if (!style) return undefined
  if (Array.isArray(style)) {
    for (let i = style.length - 1; i >= 0; i -= 1) {
      const value: any = getStyleValue(style[i], key)
      if (typeof value !== 'undefined') return value
    }
    return undefined
  }
  if (typeof style === 'object') {
    return style[key]
  }
  return undefined
}

describe('Popup', () => {
  it('calls onClose when overlay is pressed', () => {
    const handleClose = jest.fn()
    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible overlay closeOnOverlayPress onClose={handleClose} overlayTestID="test-overlay">
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    const [overlay] = tree.root.findAll(
      node => node.type === Pressable && node.props.testID === 'test-overlay'
    )
    act(() => {
      overlay.props.onPress?.({} as any)
    })

    expect(handleClose).toHaveBeenCalled()
    act(() => {
      tree.unmount()
    })
  })

  it('respects beforeClose returning false', async () => {
    const handleClose = jest.fn()
    const beforeClose = jest.fn(() => false)

    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup
            visible
            overlay
            closeOnOverlayPress
            beforeClose={beforeClose}
            onClose={handleClose}
            overlayTestID="test-overlay-before-close"
          >
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    const [overlay] = tree.root.findAll(
      node => node.type === Pressable && node.props.testID === 'test-overlay-before-close'
    )

    await act(async () => {
      overlay.props.onPress?.({} as any)
      await Promise.resolve()
    })

    expect(beforeClose).toHaveBeenCalledWith('overlay')
    expect(handleClose).not.toHaveBeenCalled()
    act(() => {
      tree.unmount()
    })
  })

  it('awaits async beforeClose before calling onClose', async () => {
    jest.useFakeTimers()
    const handleClose = jest.fn()
    const beforeClose = jest.fn(
      () =>
        new Promise<boolean>(resolve => {
          setTimeout(() => resolve(true), 300)
        })
    )

    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup
            visible
            overlay
            closeOnOverlayPress
            beforeClose={beforeClose}
            onClose={handleClose}
            overlayTestID="test-overlay-before-close-async"
          >
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    const [overlay] = tree.root.findAll(
      node => node.type === Pressable && node.props.testID === 'test-overlay-before-close-async'
    )

    await act(async () => {
      overlay.props.onPress?.({} as any)
      await Promise.resolve()
    })

    expect(handleClose).not.toHaveBeenCalled()

    await act(async () => {
      jest.advanceTimersByTime(300)
      await Promise.resolve()
    })

    expect(beforeClose).toHaveBeenCalledWith('overlay')
    expect(handleClose).toHaveBeenCalled()

    act(() => {
      tree.unmount()
    })
    jest.useRealTimers()
  })

  it('closes on hardware back press when enabled', () => {
    const originalOS = Platform.OS
    Platform.OS = 'android'
    const remove = jest.fn()
    const addSpy = jest.spyOn(BackHandler, 'addEventListener').mockReturnValue({ remove } as any)
    const handleClose = jest.fn()

    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible closeOnBackPress onClose={handleClose}>
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    const handler = addSpy.mock.calls[0][1]
    act(() => {
      handler()
    })

    expect(handleClose).toHaveBeenCalled()
    addSpy.mockRestore()
    Platform.OS = originalOS
    act(() => {
      tree.unmount()
    })
  })

  it('closes on popstate when enabled', () => {
    if (typeof window === 'undefined') {
      expect(true).toBe(true)
      return
    }
    const handleClose = jest.fn()
    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible closeOnPopstate onClose={handleClose}>
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(handleClose).toHaveBeenCalled()
    act(() => {
      tree.unmount()
    })
  })

  it('only renders bottom safe area when explicitly enabled', () => {
    let treeWithoutInset: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      treeWithoutInset = renderer.create(
        <PortalHost>
          <Popup visible placement="bottom">
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    expect(treeWithoutInset.root.findAllByType(SafeAreaView).length).toBe(0)
    act(() => {
      treeWithoutInset.unmount()
    })

    let treeWithInset: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      treeWithInset = renderer.create(
        <PortalHost>
          <Popup visible placement="bottom" safeAreaInsetBottom>
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    expect(treeWithInset.root.findAllByType(SafeAreaView).length).toBe(1)
    act(() => {
      treeWithInset.unmount()
    })
  })

  it('does not leave offscreen shadow after closing (web)', () => {
    jest.useFakeTimers()

    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible placement="left" duration={0} destroyOnClose={false}>
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    act(() => {
      tree.update(
        <PortalHost>
          <Popup visible={false} placement="left" duration={0} destroyOnClose={false}>
            <></>
          </Popup>
        </PortalHost>,
      )
      jest.runAllTimers()
    })

    const popupContent = tree.root.findAll(
      node =>
        Array.isArray(node.props.style) &&
        node.props.style.some((s: any) => s?.padding === 16) &&
        node.props.style.some((s: any) => s?.width === '80%') &&
        node.props.style.some((s: any) => s?.height === '100%'),
    )[0]

    expect(getStyleValue(popupContent.props.style, 'opacity')).toBe(0)
    expect(getStyleValue(popupContent.props.style, 'boxShadow')).toBe('none')

    act(() => {
      tree.unmount()
    })
    jest.useRealTimers()
  })

  it('renders title and description when provided', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popup visible placement="bottom" title="标题" description="描述">
          <View />
        </Popup>
      </PortalHost>,
    )

    const texts = tree.root.findAllByType(Text)
    expect(texts.some(node => node.props.children === '标题')).toBe(true)
    expect(texts.some(node => node.props.children === '描述')).toBe(true)

    act(() => {
      tree.unmount()
    })
  })

  it('renders different placements', () => {
    const placements: any[] = ['top', 'bottom', 'left', 'right', 'center']
    placements.forEach(placement => {
      const tree = renderer.create(
        <Popup visible placement={placement}>
          <Text>Content</Text>
        </Popup>
      )
      // Verify no crash
      expect(tree.toJSON()).toBeDefined()
    })
  })

  it('renders close icon when closeable is true', () => {
    const onClose = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <Popup visible closeable onClose={onClose}>
          <Text>Content</Text>
        </Popup>
      </PortalHost>
    )
    // Find Pressable that is likely the close icon
    // It usually has hitSlop prop
    const pressables = tree.root.findAllByType(Pressable)
    // The close icon Pressable has hitSlop={8}
    const closeBtn = pressables.find(p => p.props.hitSlop === 8)

    expect(closeBtn).toBeDefined()
    // In test environment, the close button might not be found if visible is false or not mounted
    // Ensure visible is true
    if (closeBtn) {
      act(() => {
        closeBtn.props.onPress()
      })
      expect(onClose).toHaveBeenCalled()
    }
  })

  it('renders round corners', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popup visible round placement="bottom">
          <Text>Content</Text>
        </Popup>
      </PortalHost>
    )
    // The content wrapper should have border radius
    // We need to find the Animated.View that wraps content
    // Animated.View might be rendered as View in tests depending on mocks
    const views = tree.root.findAllByType(View)
    // The popup content view has style.borderTopLeftRadius when round + bottom
    const content = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s && s.borderTopLeftRadius > 0
    })
    expect(content).toBeDefined()
  })
})
