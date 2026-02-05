import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Pressable, Text, BackHandler } from 'react-native'

import Dialog from '..'
import { ConfigProvider } from '../../config-provider'
import { PortalHost } from '../../portal'
import { DialogImperative } from '../imperative'

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
  const getActionButtons = (tree: renderer.ReactTestRenderer) =>
    tree.root.findAll(
      node =>
        node.type === Pressable &&
        node.props.accessibilityRole === 'button' &&
        node.props.testID !== 'dialog-overlay'
    )

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

    const buttons = getActionButtons(tree)
    const confirmButton = buttons[buttons.length - 1]

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

    const buttons = getActionButtons(tree)

    expect(buttons).toHaveLength(2)

    act(() => {
      buttons[0].props.onPress?.()
    })

    expect(onCancel).toHaveBeenCalled()
  })

  it('closes via overlay when enabled', async () => {
    const onClose = jest.fn()
    const tree = renderInHost(
      <Dialog visible closeOnOverlayPress onClose={onClose} title="标题" />
    )

    const overlay = tree.root.find(node => node.props?.testID === 'dialog-overlay')

    await act(async () => {
      overlay.props.onPress?.()
      await Promise.resolve()
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

  it('applies messageAlign prop', () => {
    const tree = renderInHost(<Dialog visible message="msg" messageAlign="left" />)
    const texts = tree.root.findAllByType(Text)
    const msg = texts.find(t => t.props.children === 'msg')
    expect(msg).toBeTruthy()
    const style = msg?.props.style
    const hasLeft = Array.isArray(style)
      ? style.some((s: any) => s?.textAlign === 'left')
      : (style as any)?.textAlign === 'left'

    expect(hasLeft).toBe(true)
  })

  it('renders close icon when closeable is true', () => {
    const onClose = jest.fn()
    const tree = renderInHost(<Dialog visible closeable onClose={onClose} />)

    const pressables = tree.root.findAllByType(Pressable)
    
    const closeBtn = pressables.find(p => p.props.hitSlop && p.props.hitSlop.top === 8)

    expect(closeBtn).toBeTruthy()
    act(() => {
      closeBtn?.props.onPress?.()
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('supports beforeClose returning false', () => {
    const onClose = jest.fn()
    const beforeClose = jest.fn().mockReturnValue(false)
    const tree = renderInHost(<Dialog visible closeable onClose={onClose} beforeClose={beforeClose} />)

    const closeBtn = tree.root.findAllByType(Pressable).find(p => p.props.hitSlop && p.props.hitSlop.top === 8)

    act(() => {
      closeBtn?.props.onPress?.()
    })

    expect(beforeClose).toHaveBeenCalledWith('close')
    expect(onClose).not.toHaveBeenCalled()
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

    it('shows and closes via static show', async () => {
      jest.useFakeTimers()
      let close: () => void = () => { }
      act(() => {
        close = DialogImperative.show({ title: '静态', message: '内容', showCancelButton: true })
      })

    expect(typeof close).toBe('function')

      await act(async () => {
        close()
        jest.runAllTimers()
      })
    })

    it('resolves confirm promise on confirm button', async () => {
      jest.useFakeTimers()

      let promise: Promise<boolean> = Promise.resolve(false)
      act(() => {
        promise = Dialog.confirm({ title: '确认操作' })
      })

      const buttons = getActionButtons(hostTree!)
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

      const [cancelButton] = getActionButtons(hostTree!)

      const expectation = expect(promise).rejects.toBe(false)

      await act(async () => {
        cancelButton.props.onPress?.()
        jest.runAllTimers()
      })

      await expectation
    })
  })
})
