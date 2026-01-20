import renderer, { act } from 'react-test-renderer'

import { DialogImperative, __DIALOG_STORE__ } from '../imperative'
import { Portal } from '../../portal/Portal'

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native')
  return {
    ...actual,
    BackHandler: {
      addEventListener: jest.fn(() => ({ remove: jest.fn() })),
      removeEventListener: jest.fn(),
    },
  }
})

jest.mock('../../portal/Portal', () => {
  const React = require('react')
  const renderer = require('react-test-renderer')

  const mounted = new Map<number, any>()
  let keySeed = 0

  const PortalComponent = ({ children }: { children?: React.ReactNode }) => children ?? null

  const add = (children: React.ReactNode) => {
    const key = ++keySeed
    const tree = renderer.create(children)
    mounted.set(key, tree)
    return key
  }

  const remove = (key: number) => {
    const tree = mounted.get(key)
    if (tree) {
      tree.unmount()
      mounted.delete(key)
    }
  }

  const update = (key: number, children: React.ReactNode) => {
    const tree = mounted.get(key)
    if (tree) {
      tree.update(children)
    }
  }

  const PortalWithStatics = Object.assign(PortalComponent, {
    add,
    remove,
    update,
    Host: () => null,
    __mountedTrees: mounted,
  })

  return {
    __esModule: true,
    Portal: PortalWithStatics,
    default: PortalWithStatics,
  }
})

jest.mock('../Dialog', () => {
  const React = require('react')
  let currentProps: any = null

  const MockDialog = (props: any) => {
    currentProps = props
    const prevVisibleRef = React.useRef(props.visible)
    React.useEffect(() => {
      if (prevVisibleRef.current && !props.visible) {
        props.onClosed?.()
      }
      prevVisibleRef.current = props.visible
    }, [props.visible, props.onClosed])
    React.useEffect(() => {
      return () => {
        if (currentProps === props) {
          currentProps = null
        }
      }
    }, [props])
    return null
  }

  MockDialog.__getCurrentProps = () => currentProps

  return {
    __esModule: true,
    default: MockDialog,
  }
})

const getMockDialogProps = () => {
  const module = require('../Dialog') as any
  return module.default?.__getCurrentProps?.() ?? null
}

describe('DialogImperative', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      DialogImperative.clear()
    })
    DialogImperative.resetDefaultOptions()
    act(() => {
      jest.runAllTimers()
    })
    jest.useRealTimers()
  })

  it('registers dialogs and closes via disposer', () => {
    const disposer = DialogImperative.show({ title: 'test', message: 'hello' })

    expect(__DIALOG_STORE__.getItems()).toHaveLength(1)

    act(() => {
      disposer()
    })
    act(() => {
      jest.runAllTimers()
    })

    expect(__DIALOG_STORE__.getItems()).toHaveLength(0)
    const mounted = (Portal as any).__mountedTrees as Map<number, renderer.ReactTestRenderer>
    expect(mounted.size).toBe(0)
  })

  it('applies global default options', () => {
    DialogImperative.setDefaultOptions({ cancelButtonText: '关闭' })

    let disposer!: () => void
    act(() => {
      disposer = DialogImperative.show({ title: 'test', message: 'demo' })
    })

    const entry = __DIALOG_STORE__.getItems()[0]
    expect(entry.options.cancelButtonText).toBe('关闭')

    act(() => {
      disposer()
    })
  })

  it('supports mode specific default options', async () => {
    DialogImperative.setDefaultOptions('confirm', { confirmButtonText: '继续' })

    let promise!: Promise<boolean>
    act(() => {
      promise = DialogImperative.confirm({ message: '确认？' })
    })
    promise.catch(() => undefined)

    const entry = __DIALOG_STORE__.getItems()[0]
    expect(entry.options.confirmButtonText).toBe('继续')

    await act(async () => {
      const props = getMockDialogProps()
      if (!props) {
        throw new Error('Dialog not mounted')
      }
      await props.onCancel?.()
    })

    await expect(promise).resolves.toBe(false)
  })

  it('resolves confirm promise on confirm', async () => {
    let promise!: Promise<boolean>
    act(() => {
      promise = DialogImperative.confirm({
        message: 'confirm?',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      })
    })

    await act(async () => {
      const props = getMockDialogProps()
      if (!props) {
        throw new Error('Dialog not mounted')
      }
      await props.onConfirm?.()
    })

    await expect(promise).resolves.toBe(true)
  })

  it('resolves confirm promise on cancel', async () => {
    let promise!: Promise<boolean>
    act(() => {
      promise = DialogImperative.confirm({
        message: 'cancel?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      })
    })

    await act(async () => {
      const props = getMockDialogProps()
      if (!props) {
        throw new Error('Dialog not mounted')
      }
      await props.onCancel?.()
    })

    await expect(promise).resolves.toBe(false)
  })
})
