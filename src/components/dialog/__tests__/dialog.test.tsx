import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, BackHandler } from 'react-native'

import Dialog from '..'
import { ConfigProvider } from '../../config-provider'
import { PortalHost } from '../../portal'

const mountedTrees: renderer.ReactTestRenderer[] = []

const renderInHost = (node: React.ReactElement) => {
  const tree = renderer.create(<PortalHost>{node}</PortalHost>)
  mountedTrees.push(tree)
  return tree
}

beforeEach(() => {
  jest.spyOn(BackHandler, 'addEventListener').mockImplementation(() => ({
    remove: jest.fn(),
  }) as any)
})

afterEach(() => {
  act(() => {
    while (mountedTrees.length) {
      mountedTrees.pop()?.unmount()
    }
  })
  jest.restoreAllMocks()
})

describe('Dialog', () => {
  it('renders title and message', () => {
    const tree = renderInHost(<Dialog visible title="提示" message="内容" />)

    const texts = tree.root.findAllByType(Text).map(node => node.props.children)
    expect(texts).toContain('提示')
    expect(texts).toContain('内容')
  })

  it('renders numeric title and message', () => {
    const tree = renderInHost(<Dialog visible title={0} message={0} />)

    const hasZero = tree.root.findAllByType(Text).some(node => node.props.children === 0)
    expect(hasZero).toBe(true)
  })

  it('fires confirm handler', () => {
    const onConfirm = jest.fn()
    const tree = renderInHost(<Dialog visible onConfirm={onConfirm} />)

    const [confirmButton] = tree.root.findAll(
      node => node.type === Pressable && node.props.accessibilityRole === 'button'
    )

    act(() => {
      confirmButton.props.onPress?.()
    })

    expect(onConfirm).toHaveBeenCalled()
  })

  it('fires cancel handler when shown', () => {
    const onCancel = jest.fn()
    const tree = renderInHost(
      <Dialog visible showCancelButton onCancel={onCancel} cancelButtonText="取消" />
    )

    const buttons = tree.root.findAll(
      node => node.type === Pressable && node.props.accessibilityRole === 'button'
    )

    expect(buttons).toHaveLength(2)

    act(() => {
      buttons[0].props.onPress?.()
    })

    expect(onCancel).toHaveBeenCalled()
  })

  it('closes via overlay when enabled', () => {
    const onClose = jest.fn()
    const tree = renderInHost(
      <Dialog visible closeOnOverlayPress onClose={onClose} title="标题" />
    )

    const overlay = tree.root.find(node => node.props?.testID === 'dialog-overlay')

    act(() => {
      overlay.props.onPress?.()
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClosed after exit animation', () => {
    jest.useFakeTimers()
    const onClosed = jest.fn()
    const tree = renderInHost(<Dialog visible title="t" onClosed={onClosed} />)

    act(() => {
      tree.update(
        <PortalHost>
          <Dialog visible={false} title="t" onClosed={onClosed} />
        </PortalHost>
      )
      jest.runAllTimers()
    })

    expect(onClosed).toHaveBeenCalled()
    jest.useRealTimers()
  })

  describe('imperative api', () => {
    let hostTree: renderer.ReactTestRenderer | null = null

    beforeEach(() => {
      act(() => {
        Dialog.clear()
      })
      hostTree = renderer.create(
        <ConfigProvider>
          <></>
        </ConfigProvider>
      )
    })

    afterEach(() => {
      act(() => {
        hostTree?.unmount()
      })
      hostTree = null
      act(() => {
        Dialog.clear()
      })
      jest.useRealTimers()
    })

    const getDialogCount = () =>
      hostTree ? hostTree.root.findAll(node => node.type === Dialog).length : 0

    it('shows and closes via static show', async () => {
      jest.useFakeTimers()
      let close: () => void = () => {}
      act(() => {
        close = Dialog.show({ title: '静态', message: '内容', showCancelButton: true })
      })

      expect(getDialogCount()).toBe(1)

      await act(async () => {
        close()
        jest.runAllTimers()
      })

      expect(getDialogCount()).toBe(0)
    })

    it('resolves confirm promise on confirm button', async () => {
      jest.useFakeTimers()

      let promise: Promise<boolean> = Promise.resolve(false)
      act(() => {
        promise = Dialog.confirm({ title: '确认操作' })
      })

      const buttons = hostTree!.root.findAll(
        node => node.type === Pressable && node.props.accessibilityRole === 'button'
      )
      const confirmButton = buttons[buttons.length - 1]

      const expectation = expect(promise).resolves.toBe(true)

      await act(async () => {
        confirmButton?.props.onPress?.()
        jest.runAllTimers()
      })

      await expectation
    })

    it('rejects confirm promise on cancel', async () => {
      jest.useFakeTimers()

      let promise: Promise<boolean> = Promise.resolve(true)
      act(() => {
        promise = Dialog.confirm({ title: '确认操作' })
      })

      const buttons = hostTree!.root.findAll(
        node => node.type === Pressable && node.props.accessibilityRole === 'button'
      )
      const cancelButton = buttons[0]

      const expectation = expect(promise).rejects.toBe(false)

      await act(async () => {
        cancelButton.props.onPress?.()
        jest.runAllTimers()
      })

      await expectation
    })
  })
})
