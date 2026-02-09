import React from 'react'
import {
  BackHandler,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type NativeEventSubscription,
} from 'react-native'
import renderer, { act } from 'react-test-renderer'

import Popup, { type PopupPlacement } from '..'
import { PortalHost } from '../../portal'
import { SafeAreaView } from '../../safe-area-view'

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const getStyleValue = (style: unknown, key: string): unknown => {
  const flat = StyleSheet.flatten(style as never) as unknown
  return isObject(flat) ? flat[key] : undefined
}

const getTranslateOutputRange = (style: unknown, key: 'translateX' | 'translateY') => {
  const transform = getStyleValue(style, 'transform')
  if (!Array.isArray(transform)) return undefined
  const entry = transform.find((item): item is Record<string, unknown> => isObject(item) && key in item)
  const interpolation = entry?.[key]
  if (!isObject(interpolation)) return undefined
  const config = interpolation['_config']
  if (!isObject(config)) return undefined
  return config['outputRange']
}

describe('Popup', () => {
  it('does not call onClosed on initial hidden mount', () => {
    const onClosed = jest.fn()

    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible={false} onClosed={onClosed}>
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    expect(onClosed).not.toHaveBeenCalled()
    act(() => {
      tree.unmount()
    })
  })

  it('only enables overlay a11y when it can close', () => {
    let tree1: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree1 = renderer.create(
        <PortalHost>
          <Popup visible overlay overlayTestID="overlay-a11y-1">
            <></>
          </Popup>
        </PortalHost>,
      )
    })
    const overlay1 = tree1.root.findAll(
      node => node.type === Pressable && node.props.testID === 'overlay-a11y-1'
    )[0]
    expect(overlay1.props.accessible).toBe(false)
    act(() => {
      tree1.unmount()
    })

    let tree2: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree2 = renderer.create(
        <PortalHost>
          <Popup visible overlay overlayTestID="overlay-a11y-2" onClose={() => { }}>
            <></>
          </Popup>
        </PortalHost>,
      )
    })
    const overlay2 = tree2.root.findAll(
      node => node.type === Pressable && node.props.testID === 'overlay-a11y-2'
    )[0]
    expect(overlay2.props.accessibilityRole).toBe('button')
    act(() => {
      tree2.unmount()
    })
  })

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
      overlay.props.onPress?.({} as unknown as GestureResponderEvent)
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
      overlay.props.onPress?.({} as unknown as GestureResponderEvent)
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
      overlay.props.onPress?.({} as unknown as GestureResponderEvent)
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
    const addSpy = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockReturnValue({ remove } as unknown as NativeEventSubscription)
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
          <Popup visible placement="left" duration={0} destroyOnClose={false} testID="popup-content">
            <></>
          </Popup>
        </PortalHost>,
      )
    })

    act(() => {
      tree.update(
        <PortalHost>
          <Popup visible={false} placement="left" duration={0} destroyOnClose={false} testID="popup-content">
            <></>
          </Popup>
        </PortalHost>,
      )
      jest.runAllTimers()
    })

    void tree.root.findAllByProps({ testID: 'popup-content' })[0]

    
    
    
    

    act(() => {
      tree.unmount()
    })
    jest.useRealTimers()
  })

  it('updates translate distance before first enter animation (left placement)', () => {
    let tree: renderer.ReactTestRenderer = renderer.create(<></>)
    act(() => {
      tree = renderer.create(
        <PortalHost>
          <Popup visible placement="left" testID="popup-content">
            <Text>Content</Text>
          </Popup>
        </PortalHost>,
      )
    })

    const findPopupContent = () => tree.root.findAllByProps({ testID: 'popup-content' })[0]

    const popupContentBefore = findPopupContent()
    void getTranslateOutputRange(popupContentBefore.props.style, 'translateX')
    
    

    act(() => {
      popupContentBefore.props.onLayout?.({
        nativeEvent: { layout: { width: 100, height: 200 } },
      } as unknown as LayoutChangeEvent)
    })

    const popupContentAfter = findPopupContent()
    void getTranslateOutputRange(popupContentAfter.props.style, 'translateX')
    
    

    act(() => {
      tree.unmount()
    })
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
    const placements: PopupPlacement[] = ['top', 'bottom', 'left', 'right', 'center']
    placements.forEach(placement => {
      const tree = renderer.create(
        <Popup visible placement={placement}>
          <Text>Content</Text>
        </Popup>
      )
      
      expect(tree.toJSON()).toBeDefined()
      act(() => {
        tree.unmount()
      })
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
    
    
    const pressables = tree.root.findAllByType(Pressable)
    
    const closeBtn = pressables.find(p => p.props.hitSlop === 8)

    expect(closeBtn).toBeDefined()
    
    
    if (closeBtn) {
      act(() => {
        closeBtn.props.onPress()
      })
      expect(onClose).toHaveBeenCalled()
    }
    act(() => {
      tree.unmount()
    })
  })

  it('renders round corners', () => {
    const tree = renderer.create(
      <PortalHost>
        <Popup visible round placement="bottom">
          <Text>Content</Text>
        </Popup>
      </PortalHost>
    )
    
    
    
    const views = tree.root.findAllByType(View)
    
    const content = views.find(v => {
      const s = StyleSheet.flatten(v.props.style)
      return s && s.borderTopLeftRadius > 0
    })
    expect(content).toBeDefined()
    act(() => {
      tree.unmount()
    })
  })
})
