import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ScrollView } from 'react-native'

import List from '..'

const createDeferred = () => {
  let resolve!: () => void
  let reject!: (error: any) => void
  const promise = new Promise<void>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('List', () => {
  it('triggers onLoad when scrolled to bottom', async () => {
    const onLoad = jest.fn(() => Promise.resolve())
    const tree = renderer.create(
      <List onLoad={onLoad}>
        <></>
      </List>
    )

    const scroll = tree.root.findByType(ScrollView)

    await act(async () => {
      scroll.props.onContentSizeChange?.(0, 1200)
      scroll.props.onLayout?.({ nativeEvent: { layout: { height: 300 } } })
      scroll.props.onScroll?.({ nativeEvent: { layoutMeasurement: { height: 300 }, contentOffset: { y: 920 }, contentSize: { height: 1200 } } })
    })

    expect(onLoad).toHaveBeenCalled()
  })

  it('prevents concurrent onLoad calls', async () => {
    const deferred = createDeferred()
    const onLoad = jest.fn(() => deferred.promise)

    const tree = renderer.create(
      <List onLoad={onLoad}>
        <></>
      </List>
    )
    const scroll = tree.root.findByType(ScrollView)

    await act(async () => {
      scroll.props.onContentSizeChange?.(0, 1200)
      scroll.props.onLayout?.({ nativeEvent: { layout: { height: 300 } } })
      scroll.props.onScroll?.({
        nativeEvent: {
          layoutMeasurement: { height: 300 },
          contentOffset: { y: 920 },
          contentSize: { height: 1200 },
        },
      })
      scroll.props.onScroll?.({
        nativeEvent: {
          layoutMeasurement: { height: 300 },
          contentOffset: { y: 920 },
          contentSize: { height: 1200 },
        },
      })
    })

    expect(onLoad).toHaveBeenCalledTimes(1)

    await act(async () => {
      deferred.resolve()
      await deferred.promise
    })
  })

  it('stops auto loading after error until retry', async () => {
    const deferred = createDeferred()
    const onLoad = jest
      .fn()
      .mockImplementationOnce(() => deferred.promise)
      .mockResolvedValueOnce(undefined)

    const tree = renderer.create(
      <List onLoad={onLoad} errorText="请求失败，点击重新加载">
        <></>
      </List>
    )

    const scroll = tree.root.findByType(ScrollView)

    await act(async () => {
      scroll.props.onContentSizeChange?.(0, 1200)
      scroll.props.onLayout?.({ nativeEvent: { layout: { height: 300 } } })
      scroll.props.onScroll?.({
        nativeEvent: {
          layoutMeasurement: { height: 300 },
          contentOffset: { y: 920 },
          contentSize: { height: 1200 },
        },
      })
    })

    expect(onLoad).toHaveBeenCalledTimes(1)
    expect(onLoad).toHaveBeenCalledWith(false)

    await act(async () => {
      deferred.reject(new Error('fail'))
      await deferred.promise.catch(() => {})
    })

    await act(async () => {
      scroll.props.onScroll?.({
        nativeEvent: {
          layoutMeasurement: { height: 300 },
          contentOffset: { y: 920 },
          contentSize: { height: 1200 },
        },
      })
    })
    expect(onLoad).toHaveBeenCalledTimes(1)

    const retry = tree.root.findByProps({ testID: 'rv-list-error' })
    await act(async () => {
      retry.props.onPress?.()
      await Promise.resolve()
    })

    expect(onLoad).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenLastCalledWith(true)
  })
})
